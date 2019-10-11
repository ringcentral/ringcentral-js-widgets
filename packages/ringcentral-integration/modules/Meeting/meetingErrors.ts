export class MeetingErrors {
  private _errors;
  constructor(type?) {
    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  push(type) {
    if (type) this._errors.push({ message: type });
  }

  get all() {
    return this._errors;
  }

  get length() {
    return this._errors.length;
  }
}
