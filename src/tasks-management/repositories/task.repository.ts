import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { Task } from '../models/task.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity) protected readonly repository: Repository<TaskEntity>
  ) {
  }

  findAllTasks(status?: TaskStatusEnum): Promise<Task[]> {
    if (status) {
      return this.getByTaskStatus(status);
    }
    return this.getAllTasks();
  }

  async saveOne(task: Task): Promise<TaskEntity> {
    return await this.repository.save(task.toEntity());
  }

  async findTaskByTaskId(taskId: number) {
    return await this.repository.findOneBy({ id: taskId });
  }

  private async getByTaskStatus(status: TaskStatusEnum): Promise<Task[]> {
    const taskEntities = await this.repository.findBy({ taskType: status });
    return this.convertToModel(taskEntities);
  }

  private convertToModel(taskEntities: TaskEntity[]) {
    let tasks: Task[] = [];
    for (let taskEntity of taskEntities) {
      tasks.push(Task.fromEntity(taskEntity));
    }
    return tasks;
  }

  private async getAllTasks() {
    const taskEntities = await this.repository.find();
    return this.convertToModel(taskEntities);

  }
}