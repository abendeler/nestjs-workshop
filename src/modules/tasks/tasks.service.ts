import {
  CreateTaskRequest,
  PaginationQueryParams,
  Task,
  TaskPaginationResponse,
  UpdateTaskRequest,
  WithCreator,
} from 'src/types';
import { TasksRepository } from './tasks.repository';

// FIXME: declare this class to be a provider (Injectable)

export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  public async getTasksByCreator({
    creator,
    offset,
    limit,
  }: PaginationQueryParams & WithCreator): Promise<TaskPaginationResponse> {
    throw new Error('Method not implemented.');
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  public async deleteTask(creator: string, id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async updateTask(request: UpdateTaskRequest): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
}
