import { IDomainCommand } from '../../../shared/generics/domain-command.interface';
import { MarkTaskCompletedDto } from '../../dtos/mark-task-completed.dto';

export class MarkTaskCompletedCommand implements IDomainCommand<MarkTaskCompletedDto> {
  readonly name: string;
  readonly payload: MarkTaskCompletedDto;

  constructor(payload: MarkTaskCompletedDto) {
    this.payload = payload;
    this.name = MarkTaskCompletedCommand.name;
  }
}