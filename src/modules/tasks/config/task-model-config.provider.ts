import { ConfigService } from '@nestjs/config';
import { TaskModel } from '../types/providers/task.model';

export async function TaskModelConfigProvider(
  configService: ConfigService,
): Promise<TaskModel> {
  const dbType = configService.getOrThrow<string>('DB_TYPE');
  if (dbType === 'filesystem-db') {
    const { FileSystemTaskModel } = await import(
      '../schemas/file-system-task.model'
    );
    return new FileSystemTaskModel();
  }
  const { InMemoryTaskModel } = await import('../schemas/in-memory-task.model');
  return new InMemoryTaskModel();
}
