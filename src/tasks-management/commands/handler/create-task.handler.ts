import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../impl/create-task.command';
import { BaseCommandHandler } from '../../../shared/generics/base-command-handler';
import { Task } from '../../models/task.model';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskEntity } from '../../entities/task.entity';

@CommandHandler( CreateTaskCommand )
export class CreateTaskHandler extends BaseCommandHandler<CreateTaskCommand, Task>{

  constructor(
    private readonly eventBus: EventBus,
    private readonly taskRepository: TaskRepository,
  ) {
    super();
  }

  execute(command: CreateTaskCommand): Promise<TaskEntity> {
    const task = Task.create(command);
    return this.saveTaskToDb(task)
  }

  private async saveTaskToDb(task: Task): Promise<TaskEntity> {
    return await this.taskRepository.saveOne(task);
  }

}