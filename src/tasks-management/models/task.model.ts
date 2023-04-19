import { TaskStatusEnum } from "../enums/task-status.enum";
import { ITask } from "../interfaces/task.interface";
import { CreateTaskCommand } from "../commands/impl/create-task.command";
import { TaskEntity } from "../entities/task.entity";
import { entityFactory } from "../../shared/generics/entity-factory.function";
import { Result } from "../../shared/result/result";
import { Success } from "../../shared/functions/result-builder.functions";

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

  static markAsCompleted(command: CreateTaskCommand): Task {
    command.payload.taskType = TaskStatusEnum.completed;
    return new Task(command.payload);
  }

  static fromEntity(entity: TaskEntity): Result<Task> {
    return Success(new Task(entity));
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