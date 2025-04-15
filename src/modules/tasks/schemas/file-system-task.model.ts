import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { Task } from '../types/entities/task';
import { CreateTaskRequest } from '../types/events/create-task.request';
import { TaskModel } from '../types/providers/task.model';
import { JsonDB, Config } from 'node-json-db';
import { TaskNotFoundException } from '../exceptions/task-not-found.exception.filter';

@Injectable()
export class FileSystemTaskModel implements TaskModel, OnModuleInit {
  private logger = new Logger(FileSystemTaskModel.name);
  private db: JsonDB;

  onModuleInit() {
    this.db = new JsonDB(new Config('tasks.json', true, false, '/'));
    this.logger.log(FileSystemTaskModel.name + ' initialized');
  }

  async create(request: CreateTaskRequest): Promise<Task> {
    const task: Task = {
      ...request,
      completed: false,
      createdDate: new Date(),
      id: uuidv1(),
    };
    const existingTasks = await this.db.getObjectDefault<Task[]>(
      `/${request.creator}`,
      [],
    );
    await this.db.push(`/${request.creator}`, [...existingTasks, task], true);
    return task;
  }

  async delete(creator: string, id: string): Promise<void> {
    const index = await this.db.getIndex(`/${creator}`, id);
    if (index === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    await this.db.delete(`/${creator}[${index}]`);
  }

  async findByCreatorAndId(creator: string, id: string): Promise<Task | null> {
    const tasks = await this.db.getObjectDefault<Task[]>(`/${creator}`, []);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundException(creator, id);
    }
    return tasks[taskIndex];
  }
  async update(task: Task): Promise<Task> {
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

  public async findByCreator(creator: string): Promise<Task[]> {
    const tasks = await this.db.getObjectDefault<Task[]>(`/${creator}`, []);
    return Promise.resolve(tasks.filter((task) => task.creator === creator));
  }
}
