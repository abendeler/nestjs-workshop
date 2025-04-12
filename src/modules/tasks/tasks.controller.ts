import { Get, Post, Put, Patch, Controller, UseFilters } from '@nestjs/common';
import { Task } from './types/entities/task';
import { ApiTags } from '@nestjs/swagger';
import { TaskNotFoundExceptionFilter } from './exceptions/task-not-found.exception.filter';
import { PaginationQueryParamstDto } from './dtos/pagination-query-params.model.dto';
import { TasksPaginationResponseDto } from './dtos/pagination.model.dto';
import { CreatorDto } from './dtos/creator.model.dto';
import { TaskRequestBodyDto } from './dtos/task-request-body.model.dto';
import { IdParamsDto } from './dtos/id.model.dto';
import { UserNotFoundExceptionFilter } from './exceptions/user-not-found.exception.filter';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(UserNotFoundExceptionFilter, TaskNotFoundExceptionFilter)
export class TasksController {
  // step 1: inject the tasks service
  constructor() {}

  // step 2: declare the  proper decorator (CreatorHeader) in the function body and extract the value.
  // step 3: declare the proper decorator (PaginationQueryParamsDto) to extract the query params
  @Get()
  public async getTasksBycreator(
    { creator }: CreatorDto,
    queryParams: PaginationQueryParamstDto,
  ): Promise<TasksPaginationResponseDto> {
    // step 3: call the appropriate method from the service.
    // step 4: pass in the arguments needed.
    throw new Error('Not implemented');
  }

  // step 5: implement the other features in the same way

  @Get(':id')
  public async getTaskById(
    { creator }: CreatorDto,
    { id }: IdParamsDto,
  ): Promise<Task> {
    throw new Error('Not implemented');
  }

  @Post()
  public async createTask(
    { creator }: CreatorDto,
    body: TaskRequestBodyDto,
  ): Promise<Task> {
    throw new Error('Not implemented');
  }

  @Put(':id')
  public async updateTask(
    { creator }: CreatorDto,
    { id }: IdParamsDto,
    body: TaskRequestBodyDto,
  ): Promise<Task> {
    throw new Error('Not implemented');
  }

  @Patch(':id/complete')
  public async markAsComplete(
    { creator }: CreatorDto,
    { id }: IdParamsDto,
  ): Promise<Task> {
    throw new Error('Not implemented');
  }
}
