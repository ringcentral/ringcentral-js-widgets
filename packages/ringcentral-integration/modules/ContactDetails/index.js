import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import actionTypes from './actionTypes';
import getContactDetailsReducer from './getContactDetailsReducer';
import proxify from '../../lib/proxy/proxify';
import background from '../../lib/background';

@Module({
  deps: [
    'Contacts',
    { dep: 'ContactDetailsOptions', optional: true }
  ]
})
export default class ContactDetails extends RcModule {
  constructor({ contacts, ...options }) {
    super({ ...options, actionTypes });

    this._contacts = contacts;
    this._reducer = getContactDetailsReducer(this.actionTypes);

    this.addSelector(
      'currentContact',
      () => this.condition,
      () => this._contacts.allContacts,
      (condition) => {
        if (condition) { return this._contacts.find(condition); }
        return null;
      }
    );
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return (
      this._contacts.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      !this._contacts.ready &&
      this.ready
    );
  }

  /**
   * Find contact from all contacts by given conditions.
   * Stores search conditions to reducers.
   */
  @background
  find({ id, type }) {
    this.store.dispatch({
      type: this.actionTypes.updateCondition,
      condition: {
        id,
        type
      }
    });
  }

  @background
  clear() {
    this.store.dispatch({
      type: this.actionTypes.resetCondition
    });
  }

  @background
  getProfileImage(contact) {
    return this._contacts.getProfileImage(contact, false);
  }

  @background
  getPresence(contact) {
    return this._contacts.getPresence(contact, false);
  }

  // for track click to sms in contact detail
  @proxify
  onClickToSMS() {
    this.store.dispatch({
      type: this.actionTypes.clickToSMS,
    });
  }

  // for track click to call in contact detail
  @proxify
  onClickToCall() {
    this.store.dispatch({
      type: this.actionTypes.clickToCall,
    });
  }

  get contact() {
    return this._selectors.currentContact();
  }

  get condition() {
    return this.state.condition;
  }

  get status() {
    return this.state.status;
  }
}
