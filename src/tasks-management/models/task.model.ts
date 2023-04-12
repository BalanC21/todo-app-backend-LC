import { TaskStatusEnum } from '../enums/task-status.enum';
import { ITask } from '../interfaces/task.interface';

export class Task {
  id: number;
  taskName: string;
  taskDescription: string;
  taskType!: TaskStatusEnum;
  taskDeadline: Date;

  constructor(taskData: ITask) {
    this.id = taskData.id;
    this.taskName = taskData.taskName;
    this.taskDescription = taskData.taskDescription;
    this.taskType = taskData.taskType;
    this.taskDeadline = taskData.taskDeadline;
  }
}