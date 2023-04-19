import { Task } from "../models/task.model";
import { DisplayTaskDto } from "../dtos/display-task-dto";

export const modelsToTasksDtoList = (models: Task[]): DisplayTaskDto[] => models.map(modelToTaskDto);

export const modelToTaskDto = (model: Task): DisplayTaskDto => (
  {
    id: model.id,
    taskName: model.taskName,
    taskDescription: model.taskDescription,
    taskType: model.taskType,
    taskDeadline: model.taskDeadline

  }
);