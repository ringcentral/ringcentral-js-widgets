import BasicUserInfo from '../models/user-info';
import { requestAllPagesTogether } from './utils';

/**
 * This is the service class which manages logged-in user related informaiton.
 */
export default class User {
  constructor(client) {
    this.client = client;
    this.rawInfo = {};
    this.basicInfo = null;
  }

  /**
   * Load user info from server. Notice that this method will load user info
   * from server no matter it was loaded or not. The newly loaded info will
   * overwrite the old one by default.
   */
  async loadUserInfo() {
    const extension = this.client.extension();
    const general = await extension.loadExtensionInfo();
    const phoneNumbers = await requestAllPagesTogether(
      extension,
      extension.listExtensionPhoneNumbers,
      { usageType: ['MainCompanyNumber', 'DirectNumber', 'CompanyNumber'] }
    );
    this.rawInfo.general = general;
    this.rawInfo.phoneNumbers = phoneNumbers;
    this.createBasicUserInfo();
  }

  createBasicUserInfo() {
    if (!this.rawInfo) {
      // throw Error
    }
    this.basicInfo = new BasicUserInfo(this.rawInfo);
  }

  getPhoneNumbersByType(usageType) {
    if (!this.rawInfo) {
      // TODO: throw error;
    }
    return this.rawInfo.phoneNumbers
      .filter(
        number => number.usageType === usageType
      );
  }

  getPhoneNumbersByFeatures(features) {
    if (!this.rawInfo) {
      // TODO: throw error;
    }
    return this.rawInfo.phoneNumbers
      .filter(
        number => features.filter(f => number.features.indexOf(f) > -1).length > 0
      );
  }

  hasFeature(featureName) {
    if (!this.rawInfo) {
      // TODO: throw error
    }
    return this.rawInfo.general.serviceFeatures
      .filter(feature => feature.featureName.toLowerCase() === featureName.toLowerCase())
      .length > 0;
  }

}
