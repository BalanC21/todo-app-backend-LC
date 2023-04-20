import { BadRequestException, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllTasksQuery } from "../queries/impl/get-all-tasks.query";
import { GetAllTasksParamsDto } from "../dtos/get-all-tasks-params.dto";
import { TaskDto } from "../dtos/task.dto";
import { CreateTaskCommand } from "../commands/impl/create-task.command";
import { MarkTaskCompletedCommand } from "../commands/impl/mark-task-completed.command";
import { Result } from "../../shared/result/result";
import { Task } from "../models/task.model";
import { modelsToTasksDtoList } from "../mappers/task.mappers";
import { DisplayTaskDto } from "../dtos/display-task-dto";

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getAllTasks(params: GetAllTasksParamsDto): Promise<DisplayTaskDto[]> {
    const query: GetAllTasksQuery = new GetAllTasksQuery(params);
    const result: Result<Task[]> = await this.queryBus.execute(query);

    if (result.isFailed) {
      throw new BadRequestException(result.errors);
    }

    return modelsToTasksDtoList(result.value!);
  }

  async createTask(taskDto: TaskDto): Promise<TaskDto> {
    const command: CreateTaskCommand = new CreateTaskCommand(taskDto);
    return await this.commandBus.execute(command);
  }

  async markTaskAsDone(taskId: number): Promise<TaskDto> {
    const command: MarkTaskCompletedCommand = new MarkTaskCompletedCommand({ taskId: taskId });
    return await this.commandBus.execute(command);
  }
}