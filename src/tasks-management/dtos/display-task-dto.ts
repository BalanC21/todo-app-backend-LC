import { TaskStatusEnum } from "../enums/task-status.enum";

export interface DisplayTaskDto {
  id: number,
  taskName: string,
  taskDescription: string,
  taskType: TaskStatusEnum,
  taskDeadline: string
}