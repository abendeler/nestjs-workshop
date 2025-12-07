import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  imports: [],
  // add needed providers
  providers: [],
  controllers: [TasksController],
})
export class TasksModule {}
