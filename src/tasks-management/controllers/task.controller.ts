import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { TaskService } from '../services/task.service';
import { GetAllTasksParamsDto } from '../dtos/get-all-tasks-params.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(readonly taskService: TaskService) {
  }

  @Get()
  getAllTasks(@Query(new ValidationPipe({ transform: true })) params: GetAllTasksParamsDto): Promise<TaskDto[]> {
    console.log("pull");
    return this.taskService.getAllTasks(params);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskDto> {
    return;
  }

  @Post()
  async addNewTask(@Body() newTask: TaskDto): Promise<TaskDto> {
    return this.taskService.createTask(newTask);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<TaskDto> {
    return;
  }

  @Patch(':id')
  async markTaskAsDone(@Param('id') id: number): Promise<TaskDto> {
    return this.taskService.markTaskAsDone(id);
  }
}