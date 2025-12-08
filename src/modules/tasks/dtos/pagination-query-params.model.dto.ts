import { PaginationQueryParams } from 'src/types';

export class PaginationQueryParamstDto implements PaginationQueryParams {
  offset!: number;
  limit!: number;
}
