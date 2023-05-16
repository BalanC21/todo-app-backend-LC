import { TaskStatusEnum } from '../enums/task-status.enum';

export interface TaskDto {
  taskName: string,
  taskDescription: string,
  taskType: TaskStatusEnum,
  taskDeadline: string
}
