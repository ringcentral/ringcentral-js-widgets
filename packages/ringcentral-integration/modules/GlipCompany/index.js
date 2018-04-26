import { createSelector } from 'reselect';
import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import getter from '../../lib/getter';

/**
 * @class
 * @description Glip Company managing module.
 */
@Module({
  deps: ['Client', { dep: 'GLipCompanyOptions', optional: true }]
})
export default class GlipCompany extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({
    client,
    ...options
  }) {
    super({
      name: 'glipCompany',
      client,
      fetchFunction: async () => {
        const response = await client.glip().companies('~').get();
        return response;
      },
      ...options,
    });
  }

  @getter
  info = createSelector(
    () => this.data,
    data => data || {},
  )

  get name() {
    return this.info.name;
  }

  get domain() {
    return this.info.domain;
  }

  get id() {
    return this.info.id;
  }
}
