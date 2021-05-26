import { Deps as BaseDeps } from 'ringcentral-integration/modules/AnalyticsV2';
import { EvAgentSession } from '../EvAgentSession';

export interface Deps extends BaseDeps {
  evAgentSession: EvAgentSession;
}
