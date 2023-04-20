import { IException } from "../interfaces/generics/exception.interface";

export class BaseException implements IException {
  name!: string;
  message!: string;
  field: string | null;

  constructor(field?: string) {
    this.field = field ?? null;
  }
}