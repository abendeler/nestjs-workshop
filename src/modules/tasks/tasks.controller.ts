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
  Delete,
} from '@nestjs/common';
import { Task } from '../../types/entities/task';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import {
  CreatorHeader,
  CreatorDto,
  PaginationQueryParamstDto,
  TasksPaginationResponseDto,
  IdParamsDto,
  TaskRequestBodyDto,
} from './dtos';
import {
  UserNotFoundExceptionFilter,
  TaskNotFoundExceptionFilter,
} from './exceptions';

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

  @Delete(':id')
  public async deleteTask(
    @CreatorHeader() { creator }: CreatorDto,
    @Param() { id }: IdParamsDto,
  ): Promise<void> {
    return this.tasksService.deleteTask(creator, id);
  }
}
