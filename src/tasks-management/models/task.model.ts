import { TaskStatusEnum } from '../enums/task-status.enum';
import { ITask } from '../interfaces/task.interface';
import { CreateTaskCommand } from '../commands/impl/create-task.command';
import { TaskEntity } from '../entities/task.entity';
import { entityFactory } from '../../shared/generics/entity-factory.function';

export class Task {
  id: number;
  taskName: string;
  taskDescription: string;
  taskType!: TaskStatusEnum;
  taskDeadline: string;

  // taskCreatedAt: Date;

  constructor(taskData: ITask) {
    this.id = taskData.id;
    this.taskName = taskData.taskName;
    this.taskDescription = taskData.taskDescription;
    this.taskType = taskData.taskType;
    this.taskDeadline = taskData.taskDeadline;
    // this.taskCreatedAt = new Date();
  }

  static create(command: CreateTaskCommand): Task {
    return new Task(command.payload);
  }

  static fromEntity(entity: TaskEntity): Task {
    return new Task(entity);
  }

  toEntity(): TaskEntity {
    return entityFactory(TaskEntity, {
      id: this.id,
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskType: this.taskType,
      taskDeadline: this.taskDeadline
      // taskCreatedAt: this.taskCreatedAt
    });
  }
}