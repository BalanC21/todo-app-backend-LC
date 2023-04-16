import { BaseCommandHandler } from '../../../shared/generics/base-command-handler';
import { Task } from '../../models/task.model';
import { MarkTaskCompletedCommand } from '../impl/mark-task-completed.command';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { TaskIdModel } from '../../models/task-id.model';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskStatusEnum } from '../../enums/task-status.enum';
import { TaskEntity } from '../../entities/task.entity';
import { UpdateTaskStatusEvent } from '../../events/impl/update-task-status.event';

@CommandHandler(MarkTaskCompletedCommand)
export class MarkTaskCompletedHandler extends BaseCommandHandler<MarkTaskCompletedCommand, Task> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly taskRepository: TaskRepository
  ) {
    super();
  }

  async execute(command: MarkTaskCompletedCommand): Promise<TaskEntity> {
    const taskId = TaskIdModel.create(command.payload.taskId);

    const toUpdateTask = await this.selectOneById(taskId);

    const updatedTask = this.changeTaskStatus(toUpdateTask);

    this.eventBus.publish(UpdateTaskStatusEvent);

    return this.saveTaskToDb(updatedTask);
  }

  async saveTaskToDb(task: Task) {
    return await this.taskRepository.saveOne(task);
  }

  private async selectOneById(id: TaskIdModel) {
    return await this.taskRepository.findTaskByTaskId(id.getIdValue());
  }

  private changeTaskStatus(task: TaskEntity) {
    task.taskType = TaskStatusEnum.completed;
    return new Task(task);
  }
}