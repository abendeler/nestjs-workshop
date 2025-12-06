import {
  TaskPaginationResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from 'src/types/tasks';
import { Task } from '../entities/task';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TasksRepository {
  public abstract getTasksByCreator(
    creator: string,
    offset: number,
    limit: number,
  ): Promise<TaskPaginationResponse>;
  public abstract getTaskById(creator: string, id: string): Promise<Task>;
  public abstract deleteTask(creator: string, id: string): Promise<void>;
  public abstract createTask(request: CreateTaskRequest): Promise<Task>;
  public abstract updateTask(request: UpdateTaskRequest): Promise<Task>;
  public abstract markAsComplete(creator: string, id: string): Promise<Task>;
}
