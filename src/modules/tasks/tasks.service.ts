import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskRequest } from './types/events/create-task.request';
import { Task } from './types/entities/task';
import { TaskPaginationResponse } from './types/api/task-pagination.response.type';
import { UpdateTaskRequest } from './types/events/update-task.request';
import { PaginationQueryParams } from './types/api/pagination-query-params.type';
import { WithCreator } from './types/partials/with-creator.type';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  public async getTasksByCreator({
    creator,
    offset,
    limit,
  }: PaginationQueryParams & WithCreator): Promise<TaskPaginationResponse> {
    return this.tasksRepository.getTasksBycreator(creator, offset, limit);
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(creator, id);
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    return this.tasksRepository.createTask(request);
  }

  public async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return this.tasksRepository.updateTask(request);
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    return this.tasksRepository.markAsComplete(creator, id);
  }
}
