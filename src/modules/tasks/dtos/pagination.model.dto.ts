import { Pagination, Task } from 'src/types';
import { PaginationQueryParamstDto } from './pagination-query-params.model.dto';

export class TasksPaginationResponseDto
  extends PaginationQueryParamstDto
  implements Pagination<Task>
{
  total!: number;
  data!: Task[];
}
