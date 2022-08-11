export type NumberValidErrorInfo = {
  phoneNumber: string;
  type: any;
};

/**
 * Validate phone numbers format Error
 *
 * you can use `err.errors` to get all errors
 *
 * TODO: temporary solution, will be removed in the future
 */
export class NumberValidError extends Error {
  constructor(public errors: NumberValidErrorInfo[]) {
    super('validate phone numbers fail');
    this.name = this.constructor.name;
  }
}
