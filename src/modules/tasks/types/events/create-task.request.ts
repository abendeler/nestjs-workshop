import { TaskRequestBody } from '../api/task-request-body';
import { WithCreator } from '../partials/with-creator.type';

export type CreateTaskRequest = TaskRequestBody & WithCreator;
