import { IDomainCommand } from "../../../shared/interfaces/generics/domain-command.interface";
import { ITask } from "../../interfaces/task.interface";
import { MarkTaskCompletedIdDto } from "../../dtos/mark-task-completed-id.dto";

export class MarkTaskCompletedCommand implements IDomainCommand<MarkTaskCompletedIdDto> {
  readonly name: string;
  readonly payload: MarkTaskCompletedIdDto;
  task?: ITask;

  constructor(payload: MarkTaskCompletedIdDto, task = null) {
    this.payload = payload;
    this.name = MarkTaskCompletedCommand.name;
    this.task = task;
  }

  setTask(task: ITask) {
    this.task = task;
  }
}