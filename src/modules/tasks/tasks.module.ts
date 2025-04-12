import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  // FIXME: what is missing here for NestJs to be able to inject the service and repository?
  providers: [],
  controllers: [TasksController],
})
export class TasksModule {}
