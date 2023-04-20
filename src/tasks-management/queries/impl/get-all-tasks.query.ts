import { IDomainQuery } from '../../../shared/interfaces/generics/domain-query.interface';
import { GetAllTasksParamsDto } from '../../dtos/get-all-tasks-params.dto';

export class GetAllTasksQuery implements IDomainQuery<GetAllTasksParamsDto> {
  readonly name: string;
  readonly params: GetAllTasksParamsDto;

  constructor(params: GetAllTasksParamsDto) {
    this.name = GetAllTasksQuery.name;
    this.params = params;
  }
}