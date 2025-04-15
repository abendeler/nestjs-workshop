import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './types/events/create-task.request';
import { Task } from './types/entities/task';
import { TaskPaginationResponse } from './types/api/task-pagination.response.type';
import { UpdateTaskRequest } from './types/events/update-task.request';
import { PaginationQueryParams } from './types/api/pagination-query-params.type';
import { WithCreator } from './types/partials/with-creator.type';
import { TasksRepository } from './types/providers/tasks.repository';
import { TasksService } from './types/providers/tasks.service';

@Injectable()
export class TasksServiceImplementation implements TasksService {
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
