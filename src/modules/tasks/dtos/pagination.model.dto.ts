import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { TaskDto } from '../dtos/task.model.dto';
import { Pagination, Task } from 'src/types';

export class TasksPaginationResponseDto implements Pagination<Task> {
  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }: { value?: string }) => Number(value || 0))
  offset!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }: { value?: string }) => Number(value || 5))
  limit!: number;

  @ApiProperty()
  @IsNumber()
  total!: number;

  @ApiProperty({ type: [TaskDto] })
  @IsArray()
  @Type(() => TaskDto)
  @ValidateNested({ each: true })
  data!: Task[];
}
