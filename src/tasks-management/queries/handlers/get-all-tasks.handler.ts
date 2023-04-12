import { QueryHandler } from '@nestjs/cqrs';
import { GetAllTasksQuery } from '../impl/get-all-tasks.query';
import { BaseQueryHandler } from '../../../shared/generics/base-query-handler';
import { Task } from '../../models/task.model';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskStatusEnum } from '../../enums/task-status.enum';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler extends BaseQueryHandler<GetAllTasksQuery, Task[]> {

  constructor(private readonly repository: TaskRepository) {
    super();
  }

  execute(query: GetAllTasksQuery): Promise<Task[]> {
    const criteria: TaskStatusEnum = query.params.status;
    return this.repository.findAllTasks(criteria);
  }
}