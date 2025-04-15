import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { TaskNotFoundException } from '../exceptions/task-not-found.exception.filter';
import { CreateTaskRequest } from '../types/events/create-task.request';
import { Task } from '../types/entities/task';
import { TaskModel } from '../types/providers/task.model';

@Injectable()
export class InMemoryTaskModel implements TaskModel, OnModuleInit {
  private logger = new Logger(InMemoryTaskModel.name);
  private tasks: Task[] = [];

  onModuleInit() {
    this.logger.log(InMemoryTaskModel.name + ' initialized');
  }

  public async findByCreator(creator: string): Promise<Task[]> {
    return Promise.resolve(
      this.tasks.filter((task) => task.creator === creator),
    );
  }

  public async findByCreatorAndId(
    creator: string,
    id: string,
  ): Promise<Task | null> {
    const task = this.tasks.find((t) => t.creator === creator && t.id === id);
    return task ? Promise.resolve(task) : Promise.resolve(null);
  }

  public async create(request: CreateTaskRequest): Promise<Task> {
    const task: Task = {
      ...request,
      completed: false,
      createdDate: new Date(),
      id: uuidv1(),
    };
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  public async update(task: Task): Promise<Task> {
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

  public async delete(creator: string, id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return Promise.resolve();
    }
    throw new TaskNotFoundException(creator, id);
  }
}
