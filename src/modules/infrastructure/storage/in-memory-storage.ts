import { v1 as uuidv1 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { TaskNotFoundException } from 'src/modules/tasks/exceptions';
import {
  TasksRepository,
  Task,
  TaskPaginationResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from 'src/types';

@Injectable()
export class InMemoryStorage implements TasksRepository {
  private logger = new Logger(InMemoryStorage.name);
  private tasks: Task[] = [];

  onModuleInit() {
    this.logger.log(InMemoryStorage.name + ' initialized');
  }

  public async getTasksByCreator(
    creator: string,
    offset: number,
    limit: number,
  ): Promise<TaskPaginationResponse> {
    const creatorTasks = this.tasks.filter((task) => task.creator === creator);
    const paginatedTasks = creatorTasks.slice(offset, offset + limit);
    return Promise.resolve({
      total: creatorTasks.length,
      offset,
      limit,
      data: paginatedTasks,
    });
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    const task = this.tasks.find((t) => t.creator === creator && t.id === id);
    if (!task) {
      throw new TaskNotFoundException(creator, id);
    }
    return Promise.resolve(task);
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    const task: Task = {
      ...request,
      completed: false,
      createdDate: new Date(),
      id: uuidv1(),
    };
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  public async updateTask(task: UpdateTaskRequest): Promise<Task> {
    const { creator, id, description, dueDate, title } = task;
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex !== -1) {
      const updatedTask = {
        ...this.tasks[taskIndex],
        completed: true,
        description,
        dueDate,
        title,
      };
      this.tasks[taskIndex] = updatedTask;
      return Promise.resolve(updatedTask);
    }
    throw new TaskNotFoundException(creator, id);
  }

  public async deleteTask(creator: string, id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return Promise.resolve();
    }
    throw new TaskNotFoundException(creator, id);
  }

  public markAsComplete(creator: string, id: string): Promise<Task> {
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    const updatedTask = {
      ...this.tasks[taskIndex],
      completed: true,
    };
    this.tasks[taskIndex] = updatedTask;
    return Promise.resolve(updatedTask);
  }
}
