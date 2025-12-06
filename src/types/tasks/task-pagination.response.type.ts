import { Task } from '../entities/task';
import { Pagination } from './pagination.type';

export type TaskPaginationResponse = Pagination<Task>;
