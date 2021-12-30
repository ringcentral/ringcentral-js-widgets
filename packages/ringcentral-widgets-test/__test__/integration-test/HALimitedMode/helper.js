import actionTypes from '@ringcentral-integration/commons/modules/AvailabilityMonitor/actionTypes';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import prefix from '@ringcentral-integration/widgets-demo/dev-server/prefix';

import LimitedRes from './data/Limi./data/LimitedResponse';
import deviceBody from './data/device';
import { mockGenerateHAPresenceApi } from '../../support/callHelper';
import { timeout } from '../shared';

export function mockHAFromPresence() {
  mockGenerateHAPresenceApi();
}
