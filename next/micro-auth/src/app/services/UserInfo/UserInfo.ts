import {
  computed,
  injectable,
  RcModule,
} from '@ringcentral-integration/next-core';

import { AccountInfo } from '../AccountInfo';
import { Auth, loginStatus } from '../Auth';
import { ExtensionInfo } from '../ExtensionInfo';
import { NumberFormatter } from '../NumberFormatter';

/**
 * service for group several services to get user info
 */
@injectable({
  name: 'UserInfo',
})
export class UserInfo extends RcModule {
  /**
   * the login number of current user
   *
   * that is the main company number if no extension number
   * or the main company number with extension number
   *
   * like 1234567890 or 1234567890*101
   *
   * without formatting
   */
  @computed
  get loginNumber() {
    const loggedIn = this._auth.loginStatus === loginStatus.loggedIn;
    const mainCompanyNumber = this._accountInfo.mainCompanyNumber;

    if (
      loggedIn &&
      this._accountInfo.ready &&
      this._extensionInfo.ready &&
      mainCompanyNumber
    ) {
      const _extensionNumber = this._extensionInfo.extensionNumber;
      // If no extensionNumber, extensionNumber field needs to be omitted
      const extensionNumber =
        _extensionNumber && _extensionNumber !== '0' ? _extensionNumber : null;

      if (!extensionNumber) return mainCompanyNumber;

      return `${mainCompanyNumber}*${extensionNumber}`;
    }

    return undefined;
  }

  @computed
  get formattedLoginNumber() {
    return this.loginNumber
      ? this._numberFormatter.formatNumber(this.loginNumber)
      : undefined;
  }

  constructor(
    protected _auth: Auth,
    protected _numberFormatter: NumberFormatter,
    protected _accountInfo: AccountInfo,
    protected _extensionInfo: ExtensionInfo,
  ) {
    super();
  }
}
