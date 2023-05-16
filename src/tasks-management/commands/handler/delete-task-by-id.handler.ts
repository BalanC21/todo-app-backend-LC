import { CommandHandler } from "@nestjs/cqrs";
import { DeleteTaskByIdCommand } from "../impl/delete-task-by-id.command";
import { BaseCommandHandler } from "../../../shared/generics/base-command-handler";
import { TaskRepository } from "../../repositories/task.repository";
import { DeleteResult } from "typeorm";
import { EntityId } from "../../../shared/models/entity-id";
import { TaskIdModel } from "../../models/task-id.model";

@CommandHandler( DeleteTaskByIdCommand )
export class DeleteTaskByIdHandler extends BaseCommandHandler<DeleteTaskByIdCommand, DeleteResult>{


  constructor(
    private readonly taskRepository: TaskRepository
  ) {
    super();
  }

  execute(command: DeleteTaskByIdCommand): Promise<DeleteResult> {
    const taskId: EntityId = TaskIdModel.create(command.payload.taskId);

    return this.taskRepository.deleteTaskById(taskId)
  }

}
