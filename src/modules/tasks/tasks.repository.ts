import { v1 as uuidv1 } from 'uuid';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { TaskNotFoundException } from 'src/modules/tasks/exceptions';
import {
  CreateTaskRequest,
  Task,
  TaskPaginationResponse,
  UpdateTaskRequest,
} from 'src/types';
import * as path from 'path';

export class TasksRepository implements OnModuleInit {
  private logger = new Logger(TasksRepository.name);
  private db: JsonDB;

  onModuleInit() {
    const dbFilePath = 'tasks.json';
    const saveOnPush = true;
    const humanReadable = false;
    const pathToFile = path.resolve(__dirname, dbFilePath);

    const config = new Config(pathToFile, saveOnPush, humanReadable, '/');
    this.db = new JsonDB(config);
    this.logger.log(TasksRepository.name + ' initialized');
  }

  async createTask(request: CreateTaskRequest): Promise<Task> {
    const task: Task = {
      ...request,
      completed: false,
      createdDate: new Date(),
      id: uuidv1(),
    };
    const path = `/${request.creator}`;
    const existingTasks = await this.db.getObjectDefault<Task[]>(path, []);
    await this.db.push(path, [...existingTasks, task], true);
    return task;
  }

  async deleteTask(creator: string, id: string): Promise<void> {
    const index = await this.db.getIndex(`/${creator}`, id);
    if (index === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    await this.db.delete(`/${creator}[${index}]`);
  }

  async getTaskById(creator: string, id: string): Promise<Task> {
    const tasks = await this.db.getObjectDefault<Task[]>(`/${creator}`, []);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    return tasks[taskIndex];
  }
  async updateTask(task: UpdateTaskRequest): Promise<Task> {
    const { creator, id, description, dueDate, title } = task;
    const tasks = await this.db.getObjectDefault<Task[]>(`/${creator}`, []);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    const updatedTask = {
      ...tasks[taskIndex],
      description,
      dueDate,
      title,
    };
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? updatedTask : task,
    );
    await this.db.push(`/${creator}`, updatedTasks, true);
    return updatedTask;
  }

  public async getTasksByCreator(
    creator: string,
    offset: number,
    limit: number,
  ): Promise<TaskPaginationResponse> {
    const tasks = await this.db.getObjectDefault<Task[]>(`/${creator}`, []);
    const creatorTasks = tasks.filter((task) => task.creator === creator);
    const paginatedTasks = creatorTasks.slice(offset, offset + limit);
    return {
      total: creatorTasks.length,
      offset,
      limit,
      data: paginatedTasks,
    };
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    const tasks = await this.db.getObjectDefault<Task[]>(`/${creator}`, []);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    const updatedTask = {
      ...tasks[taskIndex],
      completed: true,
    };
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? updatedTask : task,
    );
    await this.db.push(`/${creator}`, updatedTasks, true);
    return updatedTask;
  }
}
