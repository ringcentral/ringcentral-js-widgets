import {
  RcModuleV2,
  state,
  action,
  storage,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { Deps } from './Feedback.interface';

@Module({
  name: 'Feedback',
  deps: ['Storage'],
})
export class Feedback extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'Feedback',
    });
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

  @proxify
  async updateEmail(email: string) {
    this._updateEmail(email);
  }

  @proxify
  async updateTopic(topic: string) {
    this._updateTopic(topic);
  }

  @proxify
  async updateSubject(subject: string) {
    this._updateSubject(subject);
  }

  @proxify
  async updateDescription(description: string) {
    this._updateDescription(description);
  }

  @proxify
  async clean() {
    this._clean();
  }

  @proxify
  async sendFeedback(mailToUrl: string) {
    window.location.href = mailToUrl;
  }
}
