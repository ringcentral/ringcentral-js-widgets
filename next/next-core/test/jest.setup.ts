import { mockBroadcastChannel } from '@ringcentral-integration/test-utils';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

mockBroadcastChannel();
