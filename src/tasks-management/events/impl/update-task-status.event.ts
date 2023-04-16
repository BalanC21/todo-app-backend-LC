import { Task } from '../../models/task.model';
import { MarkTaskCompletedCommand } from '../../commands/impl/mark-task-completed.command';

type EventDataPayload = { task: Task; command: MarkTaskCompletedCommand }

export class UpdateTaskStatusEvent {
  readonly data: EventDataPayload;
  readonly name: string;

  constructor(data: EventDataPayload) {
    this.data = data;
    this.name = UpdateTaskStatusEvent.name;
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