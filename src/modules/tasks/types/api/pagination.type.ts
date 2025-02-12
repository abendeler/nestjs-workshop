export type Pagination<T> = {
  total: number;
  offset: number;
  limit: number;
  data: T[];
};
