import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { addWeeks } from 'date-fns';
import { TaskRequestBody } from 'src/types';

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
    example: addWeeks(new Date(), 1),
  })
  @Expose()
  @IsOptional()
  @IsDate()
  @Transform(({ value }: { value: string }) => (value ? new Date(value) : null))
  dueDate!: Date | null;
}
