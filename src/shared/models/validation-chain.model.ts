import { Result } from "../result/result";
import { Failed, Success } from "../functions/result-builder.functions";
import { valueIsEmpty } from "../functions/value-is-empty.function";
import { isNil, isNumber } from "lodash";
import { IException } from "../interfaces/generics/exception.interface";
import { LoggerLogger } from "../logger/logger.logger";

export class ValidationChainModel<T> {
  private _result: Result<any>;

  private constructor() {
    this._result = Success();
  }

  static validate<T>() {
    return new ValidationChainModel<T>();
  }

  isIdNumber(value: number, propertyName: string, isOptional = false, customErr?: IException) {
    const isEmpty: boolean = valueIsEmpty(value);

    if (isEmpty && isOptional) {
      return this.ok();
    }

    if (isEmpty || !isNumber(value)) {
      return this.fail(propertyName, customErr || `${String(propertyName)} is not an number value`);
    }

    return this.ok();
  }

  isNumberAltamira(value: number, propertyName: string, isOptional = false, customErr?: IException) {
    if (isNil(value) && isOptional) {
      return this.ok();
    }

    const isEmpty: boolean = isNil(value);

    if (isEmpty || !isNumber(Number(value))) {
      return this.fail(propertyName, customErr || `${String(propertyName)} is not an number value`);
    }

    return this.ok();
  }

  getResult(): Result<any> {
    return this._result;
  }

  private ok(): ValidationChainModel<T> {
    this._result = Result.aggregateResults(this._result, Success());
    return this;
  }

  private fail(propertyName: string, error: string | IException | IException[]) {
    let errors: IException[] = [{
      name: "Number Validation",
      message: "Is Not A Number",
      field: propertyName as string
    }];

    this._result = Result.aggregateResults(this._result, Failed(...errors));

    return this;
  }
}