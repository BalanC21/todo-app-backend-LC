import { Injectable } from "@nestjs/common";
import { TaskEntity } from "../entities/task.entity";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { Task } from "../models/task.model";
import { Result } from "../../shared/result/result";
import { valueIsEmpty } from "../../shared/functions/value-is-empty.function";
import { NotFound } from "../../shared/functions/result-builder.functions";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity) protected readonly repository: Repository<TaskEntity>
  ) {
  }

  findAllTasks(status?: TaskStatusEnum): Promise<Result<Task[]>> {
    if (status) {
      return this.getByTaskStatus(status);
    }
    return this.getAllTasks();
  }

  deleteAllTasks(): Promise<DeleteResult> {
    return this.repository.delete({});
  }

  async saveOne(task: Task): Promise<TaskEntity> {
    return await this.repository.save(task.toEntity());
  }

  async findTaskByTaskId(taskId: number) {
    return await this.repository.findOneBy({ id: taskId });
  }

  entityToResult(entity: TaskEntity | null): Result<Task> {
    return valueIsEmpty(entity)
      ? NotFound()
      : Task.fromEntity(entity);
  }

  entitiesToResult(entities: TaskEntity[]): Result<Task[]> {
    return valueIsEmpty(entities)
      ? NotFound()
      : Result.aggregateResults(...entities.map(this.entityToResult));
  }

  private async getByTaskStatus(status: TaskStatusEnum): Promise<Result<Task[]>> {
    const taskEntities: TaskEntity[] = await this.repository.findBy({ taskType: status });
    return this.entitiesToResult(taskEntities);
  }

  private async getAllTasks(): Promise<Result<Task[]>> {
    const taskEntities: TaskEntity[] = await this.repository.find();
    return this.entitiesToResult(taskEntities);
  }

}
