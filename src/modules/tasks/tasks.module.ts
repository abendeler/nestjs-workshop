import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { StorageModule } from '../infrastructure/storage/storage.module';

@Module({
  imports: [StorageModule.registerAsync()],
  providers: [{ provide: TasksService, useClass: TasksService }],
  controllers: [TasksController],
})
export class TasksModule {}
