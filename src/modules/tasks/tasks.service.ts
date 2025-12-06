import { Injectable } from '@nestjs/common';
import {
  CreateTaskRequest,
  PaginationQueryParams,
  Task,
  TaskPaginationResponse,
  TasksRepository,
  UpdateTaskRequest,
  WithCreator,
} from 'src/types';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  public async getTasksByCreator({
    creator,
    offset,
    limit,
  }: PaginationQueryParams & WithCreator): Promise<TaskPaginationResponse> {
    return this.tasksRepository.getTasksByCreator(creator, offset, limit);
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(creator, id);
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    return this.tasksRepository.createTask(request);
  }

  public async deleteTask(creator: string, id: string): Promise<void> {
    return this.tasksRepository.deleteTask(creator, id);
  }

  public async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return this.tasksRepository.updateTask(request);
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    return this.tasksRepository.markAsComplete(creator, id);
  }
}
