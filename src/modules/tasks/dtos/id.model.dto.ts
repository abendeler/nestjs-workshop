import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { WithId } from 'src/types';

export class IdParamsDto implements WithId {
  @IsString()
  @ApiProperty()
  id!: string;
}
