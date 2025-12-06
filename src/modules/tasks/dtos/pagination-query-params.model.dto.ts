import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { PaginationQueryParams } from 'src/types';

export class PaginationQueryParamstDto implements PaginationQueryParams {
  @IsNumber()
  @Transform(({ value }: { value?: string }) => Number(value || 0))
  @Expose() //gotcha
  offset!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }: { value?: string }) => Number(value || 5))
  @Expose() //gotcha
  limit!: number;
}
