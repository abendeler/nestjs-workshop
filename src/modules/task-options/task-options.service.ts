import { Inject, Injectable } from '@nestjs/common';
import { TASK_OPTIONS_TOKEN } from './constants';

@Injectable()
export class TaskOptionsService {
  constructor(
    @Inject(TASK_OPTIONS_TOKEN) private readonly taskOptions: string[],
  ) {}

  public getTaskOptions(): string[] {
    return this.taskOptions;
  }
}
