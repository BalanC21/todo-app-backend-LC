import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllTasksQuery } from '../queries/impl/get-all-tasks.query';
import { GetAllTasksParamsDto } from '../dtos/get-all-tasks-params.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getAllTasks(params: GetAllTasksParamsDto) {
    const query = new GetAllTasksQuery(params);
    return await this.queryBus.execute(query);
  }
}