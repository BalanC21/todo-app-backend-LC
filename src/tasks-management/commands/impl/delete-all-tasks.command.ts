import { IDomainCommand } from "../../../shared/interfaces/generics/domain-command.interface";

export class DeleteAllTasksCommand implements IDomainCommand<any>{
  readonly name: string;
  readonly payload: any;


  constructor() {
    this.name = DeleteAllTasksCommand.name;
  }
}
