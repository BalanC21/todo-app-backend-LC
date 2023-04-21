export class CustomLogger<T, F extends Function> {
  private readonly _class: T;
  private readonly _method: F;
  private _value: any;
  private _valueIdentifierName: string;

  private constructor(objectClass: T, method: F) {
    this._class = objectClass;
    this._method = method;
  }

  static createLogger<T, F extends Function>(objectClass: T, method: F): CustomLogger<T, F> {
    console.log("CustomLogger log: ");
    return new CustomLogger(objectClass, method);
  }

  logValueAndMessage(value: any, valueIdentifierName: string) {
    console.log("valueIdentifierName: " + valueIdentifierName);
    console.log("value is: " + value + " and is typeof:-> " + typeof value);
    console.log();
  }

  logValue(value: any) {
    console.log("value is: " + value + " and is typeof:-> " + typeof value);
    console.log();
  }

  public logValueWithLocation() {
    console.log("This log is from class: " + this._class.constructor.name + ", in method: " + this._method.name);
    console.log("valueIdentifierName: " + this._valueIdentifierName);
    console.log("value is: " + this._value + " and is typeof:-> " + typeof this._value);
    console.log();
  }

  public setPrimitiveValueAndMessage(value: string | number | boolean, valueIdentifierName: string): CustomLogger<T, F> {
    this._value = value;
    this._valueIdentifierName = valueIdentifierName;
    return this;
  }
}