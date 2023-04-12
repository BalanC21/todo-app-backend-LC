import { IDomainCommand } from '../../../shared/generics/domain-command.interface';
import { TaskDto } from '../../dtos/task.dto';

export class CreateTaskCommand implements IDomainCommand<TaskDto>{

  readonly name: string;
  readonly payload: TaskDto;

  constructor(payload: TaskDto) {
    this.name = CreateTaskCommand.name;
    this.payload = payload;
  }
}