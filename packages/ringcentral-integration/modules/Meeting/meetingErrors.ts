export class MeetingErrors {
  private _errors;
  constructor(type?: any) {
    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  push(type: any) {
    if (type) this._errors.push({ message: type });
  }

  get all() {
    return this._errors;
  }

  get length() {
    return this._errors.length;
  }
}
