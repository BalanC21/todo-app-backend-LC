import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { TaskStatusEnum } from '../enums/task-status.enum';
import { Task } from '../models/task.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity) protected readonly repository: Repository<TaskEntity>,
  ) {
  }

  findAllTasks(criteria: TaskStatusEnum): Promise<Task[]> {
    if (criteria) {
      return this.getByTaskStatus(criteria);
    } else {
      return this.repository.find();
    }
  }

  private async getByTaskStatus(criteria: TaskStatusEnum): Promise<Task[]> {
    const taskEntities = await this.repository.findBy({ taskType: criteria });
    let tasks:Task[] = [];
    for (let taskEntity of taskEntities) {
      tasks.save(Task.fromEntity(taskEntity))
    }
    return tasks;
  }

  async saveOne(task: Task): Promise<TaskEntity>{
    return await this.repository.save(task.toEntity())
  }
}