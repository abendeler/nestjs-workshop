import { WithId, WithCreator } from 'src/types/partials';
import { TaskRequestBody } from './task-request-body';

export type UpdateTaskRequest = TaskRequestBody & WithId & WithCreator;
