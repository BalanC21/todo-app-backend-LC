import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./tasks-management/entities/task.entity";
import { TaskManagementModule } from "./tasks-management/task-management.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env"
  }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_NAME"],
      entities: [TaskEntity],
      synchronize: true,
      dropSchema: false
    }),
    TaskManagementModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
