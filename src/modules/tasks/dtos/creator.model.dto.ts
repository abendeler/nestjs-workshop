import { ApiHeader, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, validateSync } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { WithCreator } from 'src/types';
import { flattenValidationErrors } from 'src/utils/flatten-validation-errors';

export class CreatorDto implements WithCreator {
  @IsString()
  @ApiPropertyOptional({ example: 'anthony.bendeler.ext@luminus.be' })
  @Expose({ name: 'x-creator' })
  creator!: string;
}

export const HeaderClaims = (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const instance = plainToClass(CreatorDto, request.headers, {
    excludeExtraneousValues: true,
  });
  const errors = flattenValidationErrors(validateSync(instance));
  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }
  return instance;
};

export function CreatorHeader(): ParameterDecorator {
  const extractHeaders = createParamDecorator(HeaderClaims)();
  return (target, propertyKey, parameterIndex) => {
    extractHeaders(target, propertyKey, parameterIndex);
    if (!propertyKey)
      throw new TypeError('@CreatorHeader() must be applied to a method');
    applyMethodDecorator(
      ApiHeader({
        required: false,
        name: 'x-creator',
        description: `The 'x-bp-claim' header forces the BP claim on the user session. Only for testing purposes, disabled in production.`,
        schema: { type: 'string' },
        examples: {
          anthony: { summary: 'Anthony', value: 'anthony.bendeler' },
        },
      }),
      target,
      propertyKey,
    );
  };
}

export function applyMethodDecorator(
  decorator: MethodDecorator,
  target: object,
  methodKey: string | symbol,
): void {
  const descriptor = Reflect.getOwnPropertyDescriptor(target, methodKey);
  if (!descriptor) {
    throw new TypeError(
      `Attempt to apply method decorator, but the property '${methodKey.toString()}' has no descriptor`,
    );
  }
  const result = decorator(target, methodKey, descriptor) ?? descriptor;
  Reflect.defineProperty(target, methodKey, result);
}
