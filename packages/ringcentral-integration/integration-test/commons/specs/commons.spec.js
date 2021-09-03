import runAccountInfoTests from '../../spec-modules/accountInfo';
import runAvailabilityMonitorTests from '../../spec-modules/availabilityMonitor';
import runBlockedNumberTests from '../../spec-modules/blockedNumber';
import runCallingSettingsTests from '../../spec-modules/callingSettings';
import runComposeTextTests from '../../spec-modules/composeText';
import runConferenceCallTests from '../../spec-modules/conferenceCall';
import runDialingPlanTests from '../../spec-modules/dialingPlan';
import runExtensionInfoTests from '../../spec-modules/extensionInfo';
import runExtensionPhoneNumberTests from '../../spec-modules/extensionPhoneNumber';
import runForwardingNumberTests from '../../spec-modules/forwardingNumber';
import runNumValidInCallTests from '../../spec-modules/numValidInCall';
import runPresenceTests from '../../spec-modules/presence';
import runRateLimiterTests from '../../spec-modules/rateLimiter';
// import runCallLogTests from '../../spec-modules/callLog';
import runRegionSettingTests from '../../spec-modules/regionSetting';
import {
  defaultAccount,
  multiDialingPlanIncludingUSCAAccount,
  smsAccount,
} from '../config/testAccount';
import getTestPhone from '../TestPhoneFactory';

let phone = getTestPhone();
runNumValidInCallTests(
  phone.auth,
  phone.alert,
  phone.client,
  phone.regionSettings,
  phone.call,
  multiDialingPlanIncludingUSCAAccount,
);

// phone = getTestPhone();
// runCallLogTests(phone.auth, phone.client, phone.callLog, callLogAccount);

phone = getTestPhone();
runRegionSettingTests(
  phone.auth,
  phone.client,
  phone.regionSettings,
  multiDialingPlanIncludingUSCAAccount,
);

phone = getTestPhone();
runCallingSettingsTests(
  phone.auth,
  phone.client,
  phone.alert,
  defaultAccount,
  phone.callingSettings,
  phone.extensionPhoneNumber,
  phone.extensionInfo,
);

phone = getTestPhone();
runComposeTextTests(
  phone.auth,
  phone.client,
  smsAccount,
  phone.alert,
  phone.regionSettings,
  phone.composeText,
  phone.messageSender,
);

phone = getTestPhone();
runRateLimiterTests(
  phone.auth,
  phone.alert,
  defaultAccount,
  phone.client,
  phone.rateLimiter,
);

phone = getTestPhone();
runBlockedNumberTests(
  phone.auth,
  phone.client,
  phone.blockedNumber,
  defaultAccount,
);

phone = getTestPhone();
runForwardingNumberTests(
  phone.auth,
  phone.client,
  phone.forwardingNumber,
  defaultAccount,
);

phone = getTestPhone();
runExtensionInfoTests(
  phone.auth,
  phone.client,
  phone.extensionInfo,
  defaultAccount,
  phone.alert,
);

phone = getTestPhone();
runAccountInfoTests(
  phone.auth,
  phone.client,
  phone.accountInfo,
  defaultAccount,
  phone.alert,
);

phone = getTestPhone();
runDialingPlanTests(
  phone.auth,
  phone.client,
  phone.dialingPlan,
  defaultAccount,
);

phone = getTestPhone();
runExtensionPhoneNumberTests(
  phone.auth,
  phone.client,
  phone.extensionPhoneNumber,
  defaultAccount,
);

phone = getTestPhone();
runPresenceTests(phone.auth, phone.client, phone.presence, defaultAccount);

phone = getTestPhone();
runConferenceCallTests(
  phone.auth,
  phone.client,
  phone.conferenceCall,
  phone.alert,
  defaultAccount,
);

phone = getTestPhone();
runAvailabilityMonitorTests({
  ...phone,
  account: defaultAccount,
});
