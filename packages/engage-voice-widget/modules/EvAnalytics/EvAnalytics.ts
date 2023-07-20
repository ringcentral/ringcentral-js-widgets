import { Module } from '@ringcentral-integration/commons/lib/di';
import { Analytics as BaseAnalytics } from '@ringcentral-integration/commons/modules/AnalyticsV2';

import type { Deps } from './EvAnalytics.interface';

@Module({
  name: 'EvAnalytics',
  deps: ['EvAgentSession'],
})
export class EvAnalytics extends BaseAnalytics<Deps> {
  get loginType() {
    return this._deps.evAgentSession.loginType;
  }
}
