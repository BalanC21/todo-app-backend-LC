import { IDomainCommand } from '../interfaces/generics/domain-command.interface';
import { ICommandHandler } from '@nestjs/cqrs';

export abstract class BaseCommandHandler<Command extends IDomainCommand<any>, ReturnType> implements ICommandHandler<Command>{

  abstract execute(command: Command): Promise<any>;

}