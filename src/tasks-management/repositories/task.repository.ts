import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { TaskStatusEnum } from '../enums/task-status.enum';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity) protected readonly repository: Repository<TaskEntity>,
  ) {
  }

  findAllTasks(criteria: TaskStatusEnum): Promise<TaskEntity[]> {
    if (criteria) {
      return this.getByTaskStatus(criteria);
    } else {
      return this.repository.find();
    }
  }

  private getByTaskStatus(criteria: TaskStatusEnum): Promise<TaskEntity[]> {
    return this.repository.findBy({ taskType: criteria });
  }
}