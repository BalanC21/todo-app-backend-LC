import { IQuery, IQueryHandler } from '@nestjs/cqrs';

export abstract class BaseQueryHandler<Query extends IQuery, ReturnType> implements IQueryHandler<Query> {
  abstract execute(query: Query): Promise<ReturnType>;
}