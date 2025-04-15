export function environmentConfiguration() {
  return {
    PORT: Number(process.env.PORT) || 3000,
    DB_TYPE: process.env['filesystem-db'],
    TASK_OPTIONS: 'task1FromEnv,task2FromEnv',
  };
}
