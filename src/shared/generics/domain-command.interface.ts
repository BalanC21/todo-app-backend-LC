export interface IDomainCommand<Payload>{
  readonly payload:Payload;
  readonly name: string;
}