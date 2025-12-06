import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Task } from '../../../types/entities/task';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskDto implements Task {
  @ApiProperty({
    example:
      Math.random().toString(36).substring(7) +
      'anthony.bendeler.ext@luminus.be',
  })
  @IsString()
  id!: string;

  @ApiProperty({ example: 'anthony.bendeler.ext@luminus.be' })
  @IsString()
  creator!: string;

  @ApiPropertyOptional({ example: 'fix bugs' })
  @IsString()
  @IsOptional()
  description!: string;

  @ApiPropertyOptional({ type: Date, example: new Date().toISOString() })
  @Expose()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate!: Date | null;

  @ApiProperty()
  @IsBoolean()
  completed!: boolean;

  @ApiProperty({ type: Date, example: new Date().toISOString() })
  @IsDate()
  @Type(() => Date)
  createdDate!: Date;

  @ApiProperty()
  @IsString()
  title!: string;
}
