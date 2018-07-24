import RcModule from 'ringcentral-integration/lib/RcModule';
import Enum from 'ringcentral-integration/lib/Enum';
import { Module } from 'ringcentral-integration/lib/di';
import { combineReducers } from 'redux';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import getModuleStatusReducer from 'ringcentral-integration/lib/getModuleStatusReducer';
import moduleActionTypes from 'ringcentral-integration/enums/moduleActionTypes';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';

function getToNumberFieldReducer(types) {
  return (state = '', { type, phoneNumber }) => {
    switch (type) {
      case types.setToNumberField:
      case types.loadLastCallState:
      case types.call:
        return phoneNumber;
      case types.setRecipient:
      case types.clearToNumberField:
      case types.resetSuccess:
      case types.callSuccess:
        return '';
      default:
        return state;
    }
  };
}

function getRecipientReducer(types) {
  return (state = null, { type, recipient }) => {
    switch (type) {
      case types.setRecipient:
      case types.loadLastCallState:
      case types.call:
        return recipient;
      case types.clearRecipient:
      case types.resetSuccess:
      case types.callSuccess:
        return null;
      default:
        return state;
    }
  };
}

@Module({
  name: 'DialerUI',
  deps: [
    'Call',
    'Alert',
    { dep: 'DialerUIOptions', optional: true },
  ],
})
export default class DialerUI extends RcModule {
  constructor({
    call,
    alert,
    ...options
  }) {
    super({
      ...options,
    });
    this._call = this:: ensureExist(call, 'call');
    this._alert = this::ensureExist(alert, 'alert');
    this._storageKey = 'dialerUIData';
    this._callHooks = [];
  }

  get _actionTypes() {
    return new Enum([
      ...Object.keys(moduleActionTypes),
      'setToNumberField',
      'clearToNumberField',
      'setRecipient',
      'clearRecipient',
      'loadLastCallState',
      'call',
      'callError',
      'callSuccess',
    ], 'dialerUI');
  }


  get reducer() {
    return combineReducers({
      status: getModuleStatusReducer(this.actionTypes),
      toNumberField: getToNumberFieldReducer(this.actionTypes),
      recipient: getRecipientReducer(this.actionTypes),
    });
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

  @proxify
  async onCallButtonClick({ fromNumber } = {}) {
    if (
      `${this.toNumberField}`.trim().length === 0 &&
      !this.recipient
    ) {
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
    } else {
      await this.call({
        phoneNumber: this.toNumberField,
        recipient: this.recipient,
        fromNumber,
      });
    }
  }

  get lastDialedState() {
    return this._storage.getItem(this._storageKey);
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
