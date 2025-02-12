import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { TaskRequestBody } from '../types/api/task-request-body';

export class TaskRequestBodyDto implements TaskRequestBody {
  @ApiPropertyOptional({
    description: 'Title of the task',
    example: 'fix bugs',
  })
  @Expose()
  @IsString()
  @Transform(({ value }: { value?: string }) => value || '')
  title!: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
    example: 'fix all the bugs',
  })
  @IsString()
  @Expose()
  @Transform(({ value }: { value?: string }) => value || '')
  description: string;

  @ApiPropertyOptional({
    description: 'Due date of the task',
    example: '2021-12-31T23:59:59.999Z',
  })
  @Expose()
  @IsOptional()
  @IsDate()
  @Transform(({ value }: { value: string }) => (value ? new Date(value) : null))
  dueDate!: Date | null;
}
