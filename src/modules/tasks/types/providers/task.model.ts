import { Task } from '../entities/task';
import { CreateTaskRequest } from '../events/create-task.request';

export abstract class TaskModel {
  abstract create(task: CreateTaskRequest): Promise<Task>;
  abstract delete(creator: string, id: string): Promise<void>;
  abstract findByCreator(creator: string): Promise<Task[]>;
  abstract findByCreatorAndId(
    creator: string,
    id: string,
  ): Promise<Task | null>;
  abstract update(task: Task): Promise<Task>;
}
