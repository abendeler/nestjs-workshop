import { ValidationError } from 'class-validator';
import { iterate } from 'iterare';

// https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts#L212
export function flattenValidationErrors(
  validationErrors: ValidationError[],
): string[] {
  return (
    iterate(validationErrors)
      .map((error) => mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .map((item) => Object.values(item.constraints))
      .flatten()
      .toArray()
  );
}

function mapChildrenToValidationErrors(
  error: ValidationError,
  parentPath?: string,
): ValidationError[] {
  if (!(error.children && error.children.length)) {
    return [error];
  }
  const validationErrors: ValidationError[] = [];
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }

  return validationErrors;
}

function prependConstraintsWithParentProp(
  parentPath: string,
  error: ValidationError,
): ValidationError {
  const constraints = {};
  for (const key in error.constraints) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constraints[key] = `${parentPath}.${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints,
  };
}
