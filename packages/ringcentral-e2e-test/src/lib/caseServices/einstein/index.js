
import FetchData from './fetchData';

export default class EinsteinServices {
  constructor({ userName, passWord }) {
    this._fetchData = new FetchData({ userName, passWord });
  }

  async createCaseTemplate(externalId) {
    const caseContent = await this._fetchData.getCaseByExternalId(externalId);
    console.log('caseContent', caseContent);
  }
}
