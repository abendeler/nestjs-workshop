import { Controller, Get } from '@nestjs/common';
import { TaskOptionsService } from './task-options.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task-options')
@Controller('task-options')
export class TaskOptionsController {
  constructor(private readonly service: TaskOptionsService) {}

  @Get()
  getTaskOptions(): string[] {
    return this.service.getTaskOptions();
  }
}
