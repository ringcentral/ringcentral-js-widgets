
import FetchData from './fetchData';

export default class EinsteinServices {
  constructor(params) {
    this._fetchData = new FetchData(params);
  }

  async createCaseTemplate(externalId) {
    const caseContent = await this._fetchData.getCaseByExternalId(externalId);
    console.log('caseContent', caseContent);
  }
}
