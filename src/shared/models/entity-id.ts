import { ValidationChainModel } from "./validation-chain.model";
import { Failed, Success } from "../functions/result-builder.functions";
import { Result } from "../result/result";

export class EntityId {
  private readonly idValue;

  protected constructor(idValue?: number) {
    this.idValue = idValue;
  }

  static generate(): EntityId {
    return new EntityId();
  }

  static create(idValue: number, propertyName: string = "id"): Result<EntityId> {
    const validation = ValidationChainModel.validate<any>().isIdNumber(idValue, propertyName).getResult();

    if (validation.isFailed) {
      return Failed(...validation.errors);
    }
    return Success(new EntityId(idValue));
  }

  getIdValue(): number {
    return this.idValue;
  }

  equals(to: EntityId): boolean {
    return this.idValue === to.getIdValue();
  }
}