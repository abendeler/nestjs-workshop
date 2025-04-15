import { Module } from '@nestjs/common';
import { TaskOptionsService } from './task-options.service';
import { TaskOptionsController } from './task-options.controller';
// import { TASK_OPTIONS_TOKEN, taskOptions } from './constants';

@Module({
  controllers: [TaskOptionsController],
  providers: [
    { provide: TaskOptionsService, useClass: TaskOptionsService },
    // {
    //   provide:
    //   useValue:
    // },
  ],
})
export class TaskOptionsModule {}
