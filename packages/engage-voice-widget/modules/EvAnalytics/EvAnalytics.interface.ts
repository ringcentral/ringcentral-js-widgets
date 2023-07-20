import type { Deps as BaseDeps } from '@ringcentral-integration/commons/modules/AnalyticsV2';

import type { EvAgentSession } from '../EvAgentSession';

export interface Deps extends BaseDeps {
  evAgentSession: EvAgentSession;
}
