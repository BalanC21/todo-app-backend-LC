
import { Task } from '../../models/task.model';
import { CreateTaskCommand } from '../../commands/impl/create-task.command';

type EventDataPayload = { task: Task; command: CreateTaskCommand }

export class CreateTaskEvent {
  readonly data: EventDataPayload;
  readonly name: string;

  constructor(data: EventDataPayload) {
    this.data = data;
    this.name = CreateTaskEvent.name;
  }

  toJson() {
    const { task, command } = this.data;
    return {
      name: this.name,
      payload: task.toEntity(),
      errors: null
    };
  }

}