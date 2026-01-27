export class MeetingErrors {
  private _errors: {
    message: string;
  }[];

  constructor(type?: string) {
    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  push(type: string) {
    if (type) this._errors.push({ message: type });
  }

  get all() {
    return this._errors;
  }

  get length() {
    return this._errors.length;
  }
}
