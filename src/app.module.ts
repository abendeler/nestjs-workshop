import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskOptionsModule } from './modules/task-options/task-options.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TaskOptionsModule],
})
export class AppModule {}
