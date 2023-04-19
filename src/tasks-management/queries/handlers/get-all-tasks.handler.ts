import { QueryHandler } from "@nestjs/cqrs";
import { GetAllTasksQuery } from "../impl/get-all-tasks.query";
import { BaseQueryHandler } from "../../../shared/generics/base-query-handler";
import { Task } from "../../models/task.model";
import { TaskRepository } from "../../repositories/task.repository";
import { TaskStatusEnum } from "../../enums/task-status.enum";
import { Result } from "../../../shared/result/result";
import { Exception } from "../../../shared/exceptions/exception";
import { Success } from "../../../shared/functions/result-builder.functions";

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler extends BaseQueryHandler<GetAllTasksQuery, Task[]> {

  constructor(private readonly repository: TaskRepository) {
    super();
  }

  async execute(query: GetAllTasksQuery): Promise<Result<Task[]>> {
    const status: TaskStatusEnum = query.params.status;
    const tasks: Result<Task[]> = await this.repository.findAllTasks(status);

    if (tasks.isFailed){
      throw new Exception(tasks.isFailed)
    }

    if( tasks.isNotFound ) {
      return Success( [] );
    }

    return tasks;
  }
}