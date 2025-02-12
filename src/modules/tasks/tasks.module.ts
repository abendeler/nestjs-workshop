import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
})
export class TasksModule {}
