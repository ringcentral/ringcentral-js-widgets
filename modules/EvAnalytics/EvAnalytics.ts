import { Module } from 'ringcentral-integration/lib/di';
import { Analytics as BaseAnalytics } from 'ringcentral-integration/modules/AnalyticsV2';
import { Deps } from './EvAnalytics.interface';

@Module({
  name: 'EvAnalytics',
  deps: ['EvAgentSession'],
})
export class EvAnalytics extends BaseAnalytics<Deps> {
  get loginType() {
    return this._deps.evAgentSession.loginType;
  }
}
