import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { TaskService } from '../services/task.service';
import { GetAllTasksParamsDto } from '../dtos/get-all-tasks-params.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(readonly taskService: TaskService) {
  }

  @Get()
  getAllTasks(@Body() getAllTasksParamsDto: GetAllTasksParamsDto): Promise<TaskDto[]> {
    return this.taskService.getAllTasks(getAllTasksParamsDto);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskDto> {
    return;
  }

  @Post()
  async addNewTask(@Body() newTask: TaskDto): Promise<TaskDto> {
    return;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<TaskDto> {
    return;
  }

  @Patch(':id')
  async updateTask(@Param('id') id: number): Promise<TaskDto> {
    return;
  }
}