
import FetchData from './fetchData';

export default class EinsteinServices {
  constructor({ username, password }) {
    this._fetchData = new FetchData({ username, password });
  }

  async createCaseTemplate(externalId) {
    const caseContent = await this._fetchData.getCaseByExternalId(externalId);
    console.log('caseContent', caseContent);
  }
}
