import { PaginationQueryParams } from '../api/pagination-query-params.type';
import { TaskPaginationResponse } from '../api/task-pagination.response.type';
import { Task } from '../entities/task';
import { CreateTaskRequest } from '../events/create-task.request';
import { UpdateTaskRequest } from '../events/update-task.request';
import { WithCreator } from '../partials/with-creator.type';

export abstract class ATasksService {
  public abstract getTasksByCreator(
    args: PaginationQueryParams & WithCreator,
  ): Promise<TaskPaginationResponse>;
  public abstract getTaskById(creator: string, id: string): Promise<Task>;
  public abstract createTask(request: CreateTaskRequest): Promise<Task>;
  public abstract updateTask(request: UpdateTaskRequest): Promise<Task>;
  public abstract markAsComplete(creator: string, id: string): Promise<Task>;
}
