import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks-management/entities/task.entity';
import { TaskManagementModule } from './tasks-management/task-management.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'MinaDeCreion-2002',
      database: 'todo_team',
      entities: [TaskEntity],
      synchronize: true,
      dropSchema: true,
    }),
    TaskManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
