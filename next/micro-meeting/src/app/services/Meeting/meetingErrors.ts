import {
  meetingOperationMessageSource,
  type MeetingOperationMessage,
  type MeetingOperationMessageKey,
  type MeetingOperationMessageParams,
} from './meetingOperationResult';

export class MeetingErrors {
  private _errors: MeetingOperationMessage[];

  constructor(type?: string) {
    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  push(type: string) {
    if (type) this._errors.push({ message: type });
  }

  pushLocalized(
    messageKey: MeetingOperationMessageKey,
    messageParams?: MeetingOperationMessageParams,
  ) {
    this._errors.push({
      messageKey,
      ...(messageParams ? { messageParams } : {}),
      messageSource: meetingOperationMessageSource.meeting,
    });
  }

  get all() {
    return this._errors;
  }

  get length() {
    return this._errors.length;
  }
}
