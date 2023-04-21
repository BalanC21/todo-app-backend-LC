import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdateTaskStatusEvent } from "../impl/update-task-status.event";
import { CustomLogger } from "../../../shared/logger/custom-logger";

@EventsHandler(UpdateTaskStatusEvent)
export class TaskStatusUpdatedHandler implements IEventHandler<UpdateTaskStatusEvent> {
  async handle(event: UpdateTaskStatusEvent) {
    const { task, command } = event.data;
    console.log(event.toJson());
    await CustomLogger.createLogger(this, this.handle).setPrimitiveValueAndMessage(task, "This is The Task").logValueWithLocation();
    await CustomLogger.createLogger(this, this.handle).setPrimitiveValueAndMessage(command, "This is The Command").logValueWithLocation();
  }
}