import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from 'src/types';

describe('TasksController', () => {
  let controller: TasksController;
  let repository: TasksRepository;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: {
            getTasksByCreator: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<TasksController>(TasksController);
    repository = module.get<TasksRepository>(TasksRepository);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('getTasksByCreator should be defined', async () => {
    const spy = jest.spyOn(repository, 'getTasksByCreator');
    await controller.getTasksBycreator(
      { creator: 'test' },
      { offset: 0, limit: 10 },
    );
    expect(spy).toHaveBeenCalledWith('test', 0, 10);
  });
});
