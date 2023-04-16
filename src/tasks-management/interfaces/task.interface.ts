import { TaskStatusEnum } from '../enums/task-status.enum';

export interface ITask {
  id?: number;
  taskName?: string;
  taskDescription?: string;
  taskType?: TaskStatusEnum;
  taskDeadline?: string;
}