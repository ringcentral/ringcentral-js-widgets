import {
  action,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
  storage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';

import type { FeedbackOptions } from './Feedback.interface';

@injectable({
  name: 'Feedback',
})
export class Feedback extends RcModule {
  constructor(
    protected _storage: StoragePlugin,
    @optional('FeedbackOptions') protected _feedbackOptions?: FeedbackOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  @storage
  @state
  email = '';

  @storage
  @state
  topic = '';

  @storage
  @state
  subject = '';

  @storage
  @state
  description = '';

  @action
  protected _updateEmail(email: string) {
    this.email = email;
  }

  @action
  protected _updateTopic(topic: string) {
    this.topic = topic;
  }

  @action
  protected _updateSubject(subject: string) {
    this.subject = subject;
  }

  @action
  protected _updateDescription(description: string) {
    this.description = description;
  }

  @action
  protected _clean() {
    this.email = '';
    this.topic = '';
    this.subject = '';
    this.description = '';
  }

  @delegate('server')
  async updateEmail(email: string) {
    this._updateEmail(email);
  }

  @delegate('server')
  async updateTopic(topic: string) {
    this._updateTopic(topic);
  }

  @delegate('server')
  async updateSubject(subject: string) {
    this._updateSubject(subject);
  }

  @delegate('server')
  async updateDescription(description: string) {
    this._updateDescription(description);
  }

  @delegate('server')
  async clean() {
    this._clean();
  }

  async sendFeedback(mailToUrl: string) {
    global.location.href = mailToUrl;
  }
}
