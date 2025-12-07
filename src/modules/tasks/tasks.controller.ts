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
  UserNotFoundExceptionFilter,
  TaskNotFoundExceptionFilter,
} from './exceptions';
import { Pagination, TaskRequestBody } from 'src/types';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(UserNotFoundExceptionFilter, TaskNotFoundExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public async getTasksBycreator(
    @Query('creator') creator: string,
    @Query('offset') offset: string,
    @Query('creator') limit: string,
  ): Promise<Pagination<Task>> {
    return this.tasksService.getTasksByCreator({
      creator,
      offset: Number(offset),
      limit: Number(limit),
    });
  }

  @Get(':id')
  public async getTaskById(
    @Query('creator') creator: string,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.getTaskById(creator, id);
  }

  @Post()
  public async createTask(
    @Query('creator') creator: string,
    @Body() body: TaskRequestBody,
  ): Promise<Task> {
    return this.tasksService.createTask({ ...body, creator });
  }

  @Put(':id')
  public async updateTask(
    @Query('creator') creator: string,
    @Param('id') id: string,
    @Body() body: TaskRequestBody,
  ): Promise<Task> {
    return this.tasksService.updateTask({ creator, id, ...body });
  }

  @Patch(':id/complete')
  public async markAsComplete(
    @Query('creator') creator: string,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.markAsComplete(creator, id);
  }

  @Delete(':id')
  public async deleteTask(
    @Query('creator') creator: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.tasksService.deleteTask(creator, id);
  }
}
