import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from '../enums/task-status.enum';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taskName: string;
  @Column()
  taskDescription: string;
  @Column()
  taskType!: TaskStatusEnum;
  @Column()
  taskDeadline: Date;
}