import { TaskStatusEnum } from '../enums/task-status.enum';

export class GetAllProjectsParamsDto {
  status?: TaskStatusEnum;
}