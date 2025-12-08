import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { CreateTaskRequest } from 'src/types';

describe('TasksService', () => {
  let service: TasksService;
  let repository: TasksRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: TasksService, useClass: TasksService }],
    }).compile();
    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);

    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  describe('createTask', () => {
    it('should call repository.createTask with correct parameters', async () => {
      const createTaskRequest: CreateTaskRequest = {
        creator: 'Anthony',
        title: 'Test Task',
        description: 'This is a test task',
        dueDate: new Date(),
      };
      const spy0 = jest.spyOn(repository, 'createTask');
      await service.createTask(createTaskRequest);

      expect(spy0).toHaveBeenCalledWith(createTaskRequest);
      expect(spy0).toHaveBeenCalledTimes(1);
    });
  });
});
