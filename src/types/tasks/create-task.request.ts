import { WithCreator } from 'src/types/partials';
import { TaskRequestBody } from './task-request-body';

export type CreateTaskRequest = TaskRequestBody & WithCreator;
