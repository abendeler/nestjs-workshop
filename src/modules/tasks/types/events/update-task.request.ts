import { TaskRequestBody } from '../api/task-request-body';
import { WithCreator } from '../partials/with-creator.type';
import { WithId } from '../partials/with-id.type';

export type UpdateTaskRequest = TaskRequestBody & WithId & WithCreator;
