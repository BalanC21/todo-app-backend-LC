import { BaseCommandHandler } from "../../../shared/generics/base-command-handler";
import { Task } from "../../models/task.model";
import { MarkTaskCompletedCommand } from "../impl/mark-task-completed.command";
import { CommandHandler, EventBus } from "@nestjs/cqrs";
import { TaskIdModel } from "../../models/task-id.model";
import { TaskRepository } from "../../repositories/task.repository";
import { TaskEntity } from "../../entities/task.entity";
import { EntityId } from "../../../shared/models/entity-id";
import { Result } from "../../../shared/result/result";
import { UpdateTaskStatusEvent } from "../../events/impl/update-task-status.event";
import { CustomLogger } from "../../../shared/logger/custom-logger";

@CommandHandler(MarkTaskCompletedCommand)
export class MarkTaskCompletedHandler extends BaseCommandHandler<MarkTaskCompletedCommand, Task> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly taskRepository: TaskRepository
  ) {
    super();
  }

  async execute(command: MarkTaskCompletedCommand): Promise<TaskEntity> {
    const taskId: EntityId = TaskIdModel.create(command.payload.taskId).value;

    const toUpdateTask: TaskEntity = await this.selectOneById(taskId);

    command.setTask(toUpdateTask);

    const updatedTask: Result<Task> = Task.fromEntity(toUpdateTask).value!.markAsCompleted(command);

    const updateEvent: UpdateTaskStatusEvent = new UpdateTaskStatusEvent({ task: updatedTask.value, command: command });

    this.eventBus.publish(updateEvent);

    CustomLogger.createLogger(this, this.execute).setPrimitiveValueAndMessage(toUpdateTask, "This is toUpdateTask").logValueWithLocation();

    return this.saveTaskToDb(updatedTask.value);
  }

  async saveTaskToDb(task: Task): Promise<TaskEntity> {
    return await this.taskRepository.saveOne(task);
  }

  private async selectOneById(id: TaskIdModel): Promise<TaskEntity> {
    return await this.taskRepository.findTaskByTaskId(id.getIdValue());
  }
}