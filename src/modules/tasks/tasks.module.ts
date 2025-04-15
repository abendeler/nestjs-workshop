import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './types/providers/tasks.service';
import { TasksServiceImplementation } from './tasks.service';
import { TasksRepository } from './types/providers/tasks.repository';
import { ConfigService } from '@nestjs/config';
import { TasksRepositoryImplementation } from './tasks.repository';
import { TaskModel } from './types/providers/task.model';
import { TaskModelConfigProvider } from './config/task-model-config.provider';

@Module({
  providers: [
    { provide: TasksService, useClass: TasksServiceImplementation },
    {
      provide: TasksRepository,
      useClass: TasksRepositoryImplementation,
    },
    {
      provide: TaskModel,
      useFactory: TaskModelConfigProvider,
      inject: [ConfigService],
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}
