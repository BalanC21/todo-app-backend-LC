import { TaskStatusEnum } from '../enums/task-status.enum';

export class GetAllTasksParamsDto {
  status?: TaskStatusEnum;
}