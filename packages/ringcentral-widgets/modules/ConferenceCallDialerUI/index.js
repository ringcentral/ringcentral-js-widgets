import { Module } from 'ringcentral-integration/lib/di';
import DialerUI from '../DialerUI';

@Module()
export default class ConferenceCallDialerUI extends DialerUI {
  constructor({
    prefix,
    ...options
  }) {
    super({
      ...options,
      prefix: `${prefix}-alt`,
    });
  }
}
