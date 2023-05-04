export class MeetingErrors {
  private _errors;
  // @ts-expect-error
  constructor(type?) {
    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  // @ts-expect-error
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
