
import EinsteinSDK from 'einstein-sdk';

const BASE_URL = 'http://einstein.int.ringcentral.com';

export default class FetchData {
  constructor(
    {
      servicesUrl = BASE_URL,
      userName, passWord
    }
  ) {
    this.einsteinSDK = new EinsteinSDK(servicesUrl);
    this.itemId = null;
    this.userName = userName;
    this.passWord = passWord;
  }

  // TODO: use dom to get text instead of regex
  async getCaseByExternalId(externalId) {
    try {
      console.log(externalId, '=', this.userName, '=', this.passWord);
      await this.getItemIdByExternalId(externalId);
      const { item } = await this.einsteinSDK.getTestCase(this.itemId);
      item.children.forEach((element) => {
        element.expectedResult = element.expectedResult.replace(/<[^>]*>|&nbsp;/g, '');
        element.name = element.name.replace(/<[^>]*>|&nbsp;/g, '');
      });
      item.preconditions = item.preconditions.replace(/<[^>]*>|&nbsp;/g, '');
      item.summary = item.summary.replace(/<[^>]*>|&nbsp;/g, '');
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getItemIdByExternalId(externalId) {
    try {
      await this.einsteinSDK.login(this.userName, this.passWord);
      const query = { type: 'eq', property: 'project_id', value: 1309 };
      const allDates = await this.einsteinSDK.searchTestCases(1309, query);
      const projects = allDates.children[0].children;
      await this.chooseItemIdFromAllItems(projects, externalId);
    } catch (error) {
      console.log(error);
    }
  }

  async chooseItemIdFromAllItems(projects, externalId) {
    const projectsLength = projects.length;
    for (let i = 0; i < projectsLength; i++) {
      if (projects[i].children) {
        const items = projects[i].children;
        this.chooseItemIdFromAllItems(items, externalId);
      } else if (projects[i].externalId === externalId) {
        this.itemId = projects[i].itemId;
      }
    }
  }
}
