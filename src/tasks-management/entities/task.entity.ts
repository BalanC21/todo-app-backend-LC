import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskStatusEnum } from '../enums/task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  taskName: string;
  @Column()
  taskDescription: string;
  @Column(() => { return TaskStatusEnum; })
  taskType: TaskStatusEnum;
  @Column()
  taskDeadline: Date;
}