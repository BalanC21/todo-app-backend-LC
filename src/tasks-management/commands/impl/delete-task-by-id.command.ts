import { IDomainCommand } from "../../../shared/interfaces/generics/domain-command.interface";
import { DeleteTaskByIdDto } from "../../dtos/delete-task-by-id.dto";

export class DeleteTaskByIdCommand implements IDomainCommand<any> {
  readonly name: string;
  readonly payload: DeleteTaskByIdDto;


  constructor(
    payload: DeleteTaskByIdDto
  ) {
    this.payload = payload;
    this.name = DeleteTaskByIdCommand.name;
  }
}
