export class LoggerLogger<T> {
  readonly _location: T;
  readonly _message: string;
  readonly _value: any;

  private constructor(message: string, value: any) {
    this._message = message;
    this._value = value;
  }

  static initLogger(message: string, value: any) {
    return new LoggerLogger(message, value);
  }

  getLoggedMessage() {
    console.log(this._message);
    console.log(this._value + " typeof:-> " + typeof this._value);
    console.log(String(this._message));
    console.log();
  }

  getLoggedMessageWithLocation() {
    console.log("This log is from: " + this._location);
    console.log(this._message);
    console.log(this._value + " typeof:-> " + typeof this._value);
    console.log(String(this._message));
    console.log();
  }
}