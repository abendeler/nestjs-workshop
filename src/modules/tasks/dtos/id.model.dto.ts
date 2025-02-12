import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { WithId } from '../types/partials/with-id.type';

export class IdParamsDto implements WithId {
  @IsString()
  @ApiProperty()
  id!: string;
}
