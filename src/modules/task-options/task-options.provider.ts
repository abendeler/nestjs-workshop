import { taskOptions } from './constants';

export const TaskOptionsProvider = (): string[] => {
  // FIXME: use the configService to get the task options from the environment variable instead. It is a string so map it to a proper array of strings
  return taskOptions;
};
