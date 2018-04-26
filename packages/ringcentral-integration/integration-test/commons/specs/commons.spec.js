import getTestPhone from '../TestPhoneFactory';
import {
  defaultAccount,
  callLogAccount,
  multiNoneUSCADialingPlanAccount,
  onlyOneNoneUSCADialingPlanAccount,
  onlyOneUSCADialingPlanAccount,
  multiDialingPlanIncludingUSCAAccount,
  smsAccount,
} from '../config/testAccount';

// import runCallLogTests from '../../spec-modules/callLog';
import runRegionSettingTests from '../../spec-modules/regionSetting';
import runNumValidInCallTests from '../../spec-modules/numValidInCall';
import runCallingSettingsTests from '../../spec-modules/callingSettings';
import runComposeTextTests from '../../spec-modules/composeText';
import runRateLimiterTests from '../../spec-modules/rateLimiter';
import runBlockedNumberTests from '../../spec-modules/blockedNumber';
import runForwardingNumberTests from '../../spec-modules/forwardingNumber';
import runAccountExtensionTests from '../../spec-modules/accountExtension';
import runAccountPhoneNumberTests from '../../spec-modules/accountPhoneNumber';
import runExtensionInfoTests from '../../spec-modules/extensionInfo';
import runAccountInfoTests from '../../spec-modules/accountInfo';
import runDialingPlanTests from '../../spec-modules/dialingPlan';
import runRolesAndPermissionsTests from '../../spec-modules/rolesAndPermissions';
import runExtensionPhoneNumberTests from '../../spec-modules/extensionPhoneNumber';
import runPresenceTests from '../../spec-modules/presence';

let phone = getTestPhone();
runNumValidInCallTests(phone.auth, phone.alert, phone.client, phone.regionSettings, phone.call,
  multiDialingPlanIncludingUSCAAccount);

// phone = getTestPhone();
// runCallLogTests(phone.auth, phone.client, phone.callLog, callLogAccount);

phone = getTestPhone();
runRegionSettingTests(phone.auth, phone.client, phone.regionSettings,
  multiDialingPlanIncludingUSCAAccount);

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
  phone.rateLimiter
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
runAccountExtensionTests(
  phone.auth,
  phone.client,
  phone.accountExtension,
  defaultAccount,
);

phone = getTestPhone();
runAccountPhoneNumberTests(
  phone.auth,
  phone.client,
  phone.accountPhoneNumber,
  defaultAccount,
);

phone = getTestPhone();
runExtensionInfoTests(
  phone.auth,
  phone.client,
  phone.extensionInfo,
  defaultAccount,
  phone.alert
);

phone = getTestPhone();
runAccountInfoTests(
  phone.auth,
  phone.client,
  phone.accountInfo,
  defaultAccount,
  phone.alert
);

phone = getTestPhone();
runDialingPlanTests(
  phone.auth,
  phone.client,
  phone.dialingPlan,
  defaultAccount,
);

phone = getTestPhone();
runRolesAndPermissionsTests(
  phone.auth,
  phone.client,
  phone.rolesAndPermissions,
  defaultAccount,
  phone.alert
);

phone = getTestPhone();
runExtensionPhoneNumberTests(
  phone.auth,
  phone.client,
  phone.extensionPhoneNumber,
  defaultAccount,
);

phone = getTestPhone();
runPresenceTests(
  phone.auth,
  phone.client,
  phone.presence,
  defaultAccount,
);
