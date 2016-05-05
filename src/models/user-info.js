export default class BasicUserInfo {
  constructor(rawInfo) {
    const generalInfo = rawInfo.general;
    const mainCompanyNumberObject = rawInfo.phoneNumbers.find(
      number => number.usageType === 'MainCompanyNumber'
    );
    this.id = generalInfo.id;
    this.mainCompanyNumber = mainCompanyNumberObject.phoneNumber;
    this.extension = generalInfo.extensionNumber;
    this.firstName = generalInfo.contact.firstName;
    this.lastName = generalInfo.contact.lastName;
    this.email = generalInfo.contact.email;
    this.displayName = generalInfo.name;
    this.avatar = generalInfo.profileImage.uri;
  }
}
