import { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { Result } from "../result/result";

export abstract class BaseQueryHandler<Query extends IQuery, ReturnType> implements IQueryHandler<Query> {
  abstract execute(query: Query): Promise<Result<ReturnType>>;
}