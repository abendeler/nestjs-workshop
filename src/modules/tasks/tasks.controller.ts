import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Controller,
  UseFilters,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './types/entities/task';
import { ApiTags } from '@nestjs/swagger';
import { TaskNotFoundExceptionFilter } from './exceptions/task-not-found.exception.filter';
import { PaginationQueryParamstDto } from './dtos/pagination-query-params.model.dto';
import { TasksPaginationResponseDto } from './dtos/pagination.model.dto';
import { CreatorDto, CreatorHeader } from './dtos/creator.model.dto';
import { TaskRequestBodyDto } from './dtos/task-request-body.model.dto';
import { IdParamsDto } from './dtos/id.model.dto';
import { UserNotFoundExceptionFilter } from './exceptions/user-not-found.exception.filter';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(UserNotFoundExceptionFilter, TaskNotFoundExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public async getTasksBycreator(
    @CreatorHeader() { creator }: CreatorDto,
    @Query() queryParams: PaginationQueryParamstDto,
  ): Promise<TasksPaginationResponseDto> {
    return this.tasksService.getTasksByCreator({ creator, ...queryParams });
  }

  @Get(':id')
  public async getTaskById(
    @CreatorHeader() { creator }: CreatorDto,
    @Param() { id }: IdParamsDto,
  ): Promise<Task> {
    return this.tasksService.getTaskById(creator, id);
  }

  @Post()
  public async createTask(
    @CreatorHeader() { creator }: CreatorDto,
    @Body() body: TaskRequestBodyDto,
  ): Promise<Task> {
    return this.tasksService.createTask({ ...body, creator });
  }

  @Put(':id')
  public async updateTask(
    @CreatorHeader() { creator }: CreatorDto,
    @Param() { id }: IdParamsDto,
    @Body() body: TaskRequestBodyDto,
  ): Promise<Task> {
    return this.tasksService.updateTask({ creator, id, ...body });
  }

  @Patch(':id/complete')
  public async markAsComplete(
    @CreatorHeader() { creator }: CreatorDto,
    @Param() { id }: IdParamsDto,
  ): Promise<Task> {
    return this.tasksService.markAsComplete(creator, id);
  }
}
