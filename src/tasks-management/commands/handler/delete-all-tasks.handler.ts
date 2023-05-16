import { CommandHandler } from "@nestjs/cqrs";
import { DeleteAllTasksCommand } from "../impl/delete-all-tasks.command";
import { BaseCommandHandler } from "../../../shared/generics/base-command-handler";
import { Task } from "../../models/task.model";
import { TaskRepository } from "../../repositories/task.repository";
import { DeleteResult } from "typeorm";

@CommandHandler( DeleteAllTasksCommand )
export class DeleteAllTasksHandler extends BaseCommandHandler<DeleteAllTasksCommand, Task[]> {

  constructor(
    private readonly taskRepository: TaskRepository
  ) {
    super();
  }

  execute(command: DeleteAllTasksCommand): Promise<DeleteResult> {
    return this.taskRepository.deleteAllTasks()
  }

}
