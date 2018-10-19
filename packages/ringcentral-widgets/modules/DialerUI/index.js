import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';
import actionTypes from './actionTypes';
import getReducer from './getReducer';
import ConferenceCall from 'ringcentral-integration/modules/ConferenceCall';

@Module({
  name: 'DialerUI',
  deps: [
    'Call',
    'Alert',
    { dep: 'ConferenceCall', optional: true },
    { dep: 'DialerUIOptions', optional: true },
  ],
})
export default class DialerUI extends RcModule {
  constructor({
    call,
    alert,
    conferenceCall,
    actionTypes: subActionTypes,
    ...options
  }) {
    super({
      ...options,
      actionTypes: (subActionTypes || actionTypes),
    });

    this._call = this:: ensureExist(call, 'call');
    this._alert = this:: ensureExist(alert, 'alert');
    this._conferenceCall = conferenceCall;
    this._reducer = getReducer(this.actionTypes);
    this._callHooks = [];
  }

  async _onStateChange() {
    if (
      this.pending &&
      this._call.ready
    ) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (
      this.ready &&
      (
        !this._call.ready
      )
    ) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  @proxify
  async clearToNumberField() {
    this.store.dispatch({
      type: this.actionTypes.clearToNumberField,
    });
  }

  @proxify
  async setToNumberField(phoneNumber) {
    if (this.toNumberField !== phoneNumber) {
      this.store.dispatch({
        type: this.actionTypes.setToNumberField,
        phoneNumber,
      });
    }
  }

  @proxify
  async setRecipient(recipient, shouldClean = true) {
    this.store.dispatch({
      type: this.actionTypes.setRecipient,
      recipient,
    });
    if (shouldClean) {
      await this.clearToNumberField();
    }
  }
  @proxify
  async clearRecipient() {
    this.store.dispatch({
      type: this.actionTypes.clearRecipient,
    });
  }

  @proxify
  async call({
    phoneNumber = '',
    recipient = null,
    fromNumber = null,
  }) {
    if (phoneNumber || recipient) {
      this.store.dispatch({
        type: this.actionTypes.call,
        phoneNumber,
        recipient,
      });
      for (const hook of this._callHooks) {
        await hook({
          phoneNumber,
          recipient,
          fromNumber,
        });
      }
      try {
        await this._call.call({
          phoneNumber: this.toNumberField,
          recipient: this.recipient,
          fromNumber,
        });
        this.store.dispatch({
          type: this.actionTypes.callSuccess,
        });
      } catch (error) {
        this.store.dispatch({
          type: this.actionTypes.callError,
          error,
        });
      }
    }
  }

  _loadLastPhoneNumber() {
    if (!this._call.lastRecipient && !this._call.lastPhoneNumber) {
      this._alert.warning({
        message: callErrors.noToNumber,
      });
    } else {
      this.store.dispatch({
        type: this.actionTypes.loadLastCallState,
        phoneNumber: this._call.lastPhoneNumber,
        recipient: this._call.lastRecipient,
      });
    }
  }

  @proxify
  async onCallButtonClick({ fromNumber } = {}) {
    if (
      `${this.toNumberField}`.trim().length === 0 &&
      !this.recipient
    ) {
      this._loadLastPhoneNumber();
    } else {
      this._onBeforeCall();
      await this.call({
        phoneNumber: this.toNumberField,
        recipient: this.recipient,
        fromNumber,
      });
    }
  }

  _onBeforeCall() {
    if (this._conferenceCall) {
      this._conferenceCall.closeMergingPair();
    }
  }

  get toNumberField() {
    return this.state.toNumberField;
  }

  get recipient() {
    return this.state.recipient;
  }

  get status() {
    return this.state.status;
  }
}
