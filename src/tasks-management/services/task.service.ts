import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllTasksQuery } from '../queries/impl/get-all-tasks.query';
import { GetAllTasksParamsDto } from '../dtos/get-all-tasks-params.dto';
import { TaskDto } from '../dtos/task.dto';
import { CreateTaskCommand } from '../commands/impl/create-task.command';
import { MarkTaskCompletedCommand } from '../commands/impl/mark-task-completed.command';

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

  async createTask(taskDto: TaskDto) {
    const command = new CreateTaskCommand(taskDto);
    return await this.commandBus.execute(command);
  }

  async markTaskAsDone(taskId: number) {
    const command = new MarkTaskCompletedCommand({ taskId: taskId });
    return await this.commandBus.execute(command);
  }
}