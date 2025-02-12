import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class UserNotFoundException extends Error {
  constructor(
    public readonly creator: string,
    public readonly message: string,
  ) {
    super(message);
  }
}

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UserNotFoundExceptionFilter.name);

  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponsePayload = {
      statusCode: HttpStatus.NOT_FOUND,
      message: `No such user ${exception.creator}`,
      timestamp: new Date().toISOString(),
    };

    this.logger.warn(errorResponsePayload);
    response.status(HttpStatus.NOT_FOUND).json(errorResponsePayload);
  }
}
