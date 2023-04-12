import { Module } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTaskHandler } from './commands/handler/create-task.handler';
import { TaskRepository } from './repositories/task.repository';
import { GetAllTasksHandler } from './queries/handlers/get-all-tasks.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    CqrsModule
  ],
  controllers: [TaskController],
  providers: [TaskService, CreateTaskHandler, TaskRepository, GetAllTasksHandler],
  exports:[
    TaskRepository
  ]
})
export class TaskManagementModule {
}
