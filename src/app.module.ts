import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // FIXME: add config module to resolve runtime error coming fron main.ts
  imports: [ConfigModule.forRoot(), TasksModule],
})
export class AppModule {}
