import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class TaskNotFoundException extends Error {
  constructor(
    public readonly creator: string,
    public readonly taskId: string,
  ) {
    super('task.not.found');
  }
}

@Catch(TaskNotFoundException)
export class TaskNotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TaskNotFoundExceptionFilter.name);

  catch(exception: TaskNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponsePayload = {
      statusCode: HttpStatus.NOT_FOUND,
      message: `Task not found`,
      user: exception.creator,
      taskId: exception.taskId,
      timestamp: new Date().toISOString(),
    };

    this.logger.warn(errorResponsePayload);
    response.status(HttpStatus.NOT_FOUND).json(errorResponsePayload);
  }
}
