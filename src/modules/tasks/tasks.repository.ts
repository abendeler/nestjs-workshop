import { Injectable } from '@nestjs/common';
import { TasksRepository } from './types/providers/tasks.repository';
import { TaskPaginationResponse } from './types/api/task-pagination.response.type';
import { Task } from './types/entities/task';
import { CreateTaskRequest } from './types/events/create-task.request';
import { TaskModel } from './types/providers/task.model';
import { TaskNotFoundException } from './exceptions/task-not-found.exception.filter';

@Injectable()
export class TasksRepositoryImplementation implements TasksRepository {
  constructor(private readonly model: TaskModel) {}

  public async getTasksByCreator(
    creator: string,
    offset: number,
    limit: number,
  ): Promise<TaskPaginationResponse> {
    const ownerTasks = await this.model.findByCreator(creator);
    const tasksToBeReturned = ownerTasks.slice(offset, offset + limit);
    return {
      offset,
      limit,
      total: ownerTasks.length,
      data: tasksToBeReturned,
    };
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    const task = await this.model.findByCreatorAndId(creator, id);
    if (!task) {
      throw new TaskNotFoundException(creator, id);
    }
    return task;
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    return this.model.create(request);
  }

  public async deleteTask(creator: string, id: string): Promise<void> {
    return this.model.delete(creator, id);
  }

  public async updateTask(task: Task): Promise<Task> {
    return this.model.update(task);
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    const task = await this.model.findByCreatorAndId(creator, id);
    if (!task) {
      throw new TaskNotFoundException(creator, id);
    }
    return this.model.update({ ...task, completed: true });
  }
}
