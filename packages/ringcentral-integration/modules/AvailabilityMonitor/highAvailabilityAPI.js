import HashMap from '../../lib/HashMap';
import availability from './availabilityStatus';

// TODO: Store as JSON, and can be requested from backend server

export default [
  {
    reg: /\/restapi\/v1.0\/account/,
    POST: availability.LIMITED,
  },
  { reg: /\/restapi\/v1.0\/account\/validate/, POST: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/active-calls/,
    GET: availability.LIMITED,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/answering-rule/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/answering-rule\/[a-z0-9~,]+/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/application-extensions/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/application-extensions\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/assigned-role/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/bots/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/bots\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/business-address/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/business-hours/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-log/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-log-sync/,
    GET: availability.HIGH,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    eg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-log\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-monitoring-groups/,
  },
  {
    DELETE: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-monitoring-groups\/[a-z0-9~,]+/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-monitoring-groups\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-monitoring-groups\/[a-z0-9~,]+\/members/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-queues/,
    GET: availability.HIGH,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-queues\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-queues\/[a-z0-9~,]+\/members/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-recording/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-recording\/bulk-assign/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-recording\/custom-greetings/,
  },
  {
    DELETE: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-recording\/custom-greetings\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/call-recording\/extensions/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/department\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/department\/[a-z0-9~,]+\/members/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/device/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/device\/[a-z0-9~,]+/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/device\/[a-z0-9~,]+\/assign-line/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/device\/[a-z0-9~,]+\/sip-info/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/dialing-plan/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/bulk-assign/,
  },
  {
    GET: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/free-numbers/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/validate/,
    POST: availability.HIGH,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+/,
  },
  {
    GET: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/active-calls/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book-sync/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book\/contact/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book\/contact\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book\/group/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book\/group\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book\/group\/[a-z0-9~,]+\/contact/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/address-book\/group\/[a-z0-9~,]+\/contact\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/administered-sites/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/answering-rule/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/answering-rule\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/assigned-role/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/authz-profile/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/authz-profile\/check/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/blocked-number/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/blocked-number\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/business-hours/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/call-log/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/call-log-sync/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/call-log\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/caller-blocking/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/caller-blocking\/phone-numbers/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/caller-blocking\/phone-numbers\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/caller-id/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/company-pager/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/company-pager\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/company-pager\/[a-z0-9~,]+\/content\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/conferencing/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/credentials/,
  },
  {
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/credentials\/validate/,
  },
  {
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/credentials\/verify/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/delegates/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/delegation-assignments/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/device/,
    GET: availability.HIGH,
  },
  {
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/direct-ring-out/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/email-to-fax/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/favorite/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/fax/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/fax\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/fax\/[a-z0-9~,]+\/content\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/forwarding-number/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/forwarding-number\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/grant/,
    GET: availability.HIGH,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/greeting/,
  },
  {
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/greeting-recording-call/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/greeting-recording-call\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/greeting\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/incoming-call-info/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/intercom/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/intercom\/permissions/,
  },
  {
    GET: availability.HIGH,
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/meeting/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/meeting\/service-info/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/meeting\/[a-z0-9~,]+/,
  },
  {
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/meeting\/[a-z0-9~,]+\/end/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/meetings-configuration/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/message-store/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/message-store\/counters/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/message-store\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/message-store\/[a-z0-9~,]+\/content\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/message-sync/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/notification-settings/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/permissions/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/phone-number/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/presence/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/presence\/line/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/internal\/presence/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/presence/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/presence\/line\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/presence\/permission/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    POST: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/profile-image/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/profile-image\/[a-z0-9~,]+/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    POST: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/reporting\/settings/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/ring-out/,
    POST: availability.HIGH,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/ring-out\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/ringout/,
    POST: availability.HIGH,
  },
  {
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/ringout\/direct/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/ringout\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/sms/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/sms\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/sms\/[a-z0-9~,]+\/content\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/user-groups/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/validate/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/glip-configuration/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/greeting/,
    POST: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/greeting\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/ivr/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/ivr-menus/,
    POST: availability.LIMITED,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/ivr-menus\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/ivr-prompts/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/ivr-prompts\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/ivr-prompts\/[a-z0-9~,]+\/content/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/licenses/,
    GET: availability.HIGH,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/licenses\/bulk-purchase/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/licenses\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/live-reporting\/dashboards/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    PUT: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/live-reporting\/dashboards\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/meetings-configuration/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/order/,
    POST: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/order\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/paging-only-groups\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/paging-only-groups\/[a-z0-9~,]+\/devices/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/paging-only-groups\/[a-z0-9~,]+\/users/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/park-locations\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/park-locations\/[a-z0-9~,]+\/users/,
  },
  {
    GET: availability.LIMITED,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/payment-info/,
  },
  {
    GET: availability.LIMITED,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/phone-number/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/phone-number\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/recording\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/recording\/[a-z0-9~,]+\/content/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/service-info/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/shared-lines-groups\/[a-z0-9~,]+\/lines/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/sites/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/sites\/[a-z0-9~,]+/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/sites\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/sites\/[a-z0-9~,]+\/ivr/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/sites\/[a-z0-9~,]+\/members/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/templates/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/templates\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/templates\/[a-z0-9~,]+\/bulk-apply/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-group/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-group\/bulk-assign/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-group\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-group\/[a-z0-9~,]+\/members/,
  },
  {
    GET: availability.HIGH,
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-role/,
  },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-role\/default/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-role\/[a-z0-9~,]+/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/user-role\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/validate/,
    POST: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    POST: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/voicemail-library/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/voicemail-library\/broadcasts\/[a-z0-9~,]+/,
  },
  {
    DELETE: availability.HIGH,
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/voicemail-library\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/voicemail-library\/[a-z0-9~,]+\/content/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/account\/[a-z0-9~,]+\/voicemail-library\/[a-z0-9~,]+\/send/,
  },
  { reg: /\/restapi\/v1.0\/client-info/, GET: availability.HIGH },
  { reg: /\/restapi\/v1.0\/client-info\/banners/, GET: availability.HIGH },
  {
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/client-info\/banners\/settings/,
  },
  {
    DELETE: availability.LIMITED,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
    reg: /\/restapi\/v1.0\/client-info\/custom-data\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/client-info\/custom-data\/[a-z0-9~,]+\/content/,
  },
  {
    reg: /\/restapi\/v1.0\/client-info\/sip-provision/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/client-info\/special-number-rule/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/dictionary\/brand\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/country/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/country\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/device/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/fax-cover-page/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/dictionary\/forms\/address/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/greeting/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/greeting\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/language/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/language\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/license-types/, GET: availability.HIGH },
  { reg: /\/restapi\/v1.0\/dictionary\/location/, GET: availability.HIGH },
  { reg: /\/restapi\/v1.0\/dictionary\/permission/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/permission-category/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/dictionary\/permission-category\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/dictionary\/permission\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/dictionary\/secret-question/,
    GET: availability.HIGH,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/dictionary\/secret-question\/[a-z0-9~,]+/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/dictionary\/service-plan\/[a-z0-9~,]+/,
  },
  {
    reg: /\/restapi\/v1.0\/dictionary\/shipping-options/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/state/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/state\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/timezone/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/timezone\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/dictionary\/user-role/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/dictionary\/user-role\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/integration-profiles/, GET: availability.HIGH },
  { reg: /\/restapi\/v1.0\/internal\/account\/info/, POST: availability.HIGH },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/internal\/account\/[a-z0-9~,]+\/call-monitoring-groups/,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/internal\/account\/[a-z0-9~,]+\/call-monitoring-groups\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/internal\/account\/[a-z0-9~,]+\/call-monitoring-groups\/[a-z0-9~,]+\/members/,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/account\/[a-z0-9~,]+\/call-queues/,
    GET: availability.HIGH,
  },
  {
    POST: availability.LIMITED,
    reg: /\/restapi\/v1.0\/internal\/account\/[a-z0-9~,]+\/call-queues\/[a-z0-9~,]+\/bulk-assign/,
  },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/internal\/account\/[a-z0-9~,]+\/call-queues\/[a-z0-9~,]+\/members/,
  },
  { reg: /\/restapi\/v1.0\/internal\/address-book/, GET: availability.HIGH },
  {
    GET: availability.HIGH,
    reg: /\/restapi\/v1.0\/internal\/adg\/account\/large-accounts/,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/account\/[a-z0-9~,]+\/business-info/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/account\/[a-z0-9~,]+\/get-all-by-account-id/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/account\/[a-z0-9~,]+\/get-all-by-account-id-lists/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/extension\//,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/extension\/bulk/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/extension\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/internal\/adg\/federation/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/phone-number/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/phone-number\/bulk/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/phone-number\/bulk-by-extension-ids/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/adg\/phone-number\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/billing-events\/process-event/,
    POST: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/call-recording\/account\/[a-z0-9~,]+\/recording\/[a-z0-9~,]+\/stream/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/internal\/delegates/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/internal\/device-order\/update/,
    POST: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/email-to-fax\/send/,
    POST: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/extension-permissions\/check/,
    POST: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/internal\/favorite/, GET: availability.HIGH },
  { reg: /\/restapi\/v1.0\/internal\/legal-data/, POST: availability.LIMITED },
  {
    reg: /\/restapi\/v1.0\/internal\/live-reporting\/dashboards\/permissions/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/message-content-stream\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/message-store\/[a-z0-9~,]+\/content\/[a-z0-9~,]+$/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/order-processor\/process-device-order/,
    POST: availability.LIMITED,
  },
  { reg: /\/restapi\/v1.0\/internal\/presence-line/, GET: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/internal\/presence-permissions/,
    GET: availability.HIGH,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/profile-image\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/stream'/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/profile-image\/account\/[a-z0-9~,]+\/extension\/[a-z0-9~,]+\/stream\/\d+$/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/promotion-code/,
    POST: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/send-confirmation-email/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/send-sms/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/service-parameter\/[a-z0-9~,]+$/,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/subscription\/legacy\/apn\/add/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/subscription\/legacy\/apn\/application/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/subscription\/legacy\/apn\/remove/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/subscription/,
    GET: availability.HIGH,
    POST: availability.HIGH,
    DELETE: availability.HIGH,
  },
  {
    reg: /\/subscriptions\/v1\/remove-device/,
    POST: availability.HIGH,
  },
  {
    reg: /\/subscriptions\/v1\/subscription/,
    GET: availability.HIGH,
    DELETE: availability.HIGH,
  },
  {
    reg: /\/subscriptions\/v1\/subscriptions/,
    GET: availability.HIGH,
  },
  {
    reg: /\/subscriptions\/v1\/blacklist/,
    GET: availability.HIGH,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/tap-settings/,
    GET: availability.HIGH,
    PUT: availability.LIMITED,
  },
  { reg: /\/restapi\/v1.0\/internal\/tester-flag/, PUT: availability.LIMITED },
  {
    reg: /\/restapi\/v1.0\/internal\/token-validation/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/account-info-partner\/[a-z0-9~,]+$/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/account-info\/[a-z0-9~,]+$/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/authenticate/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/authentication/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/brand-info\/[a-z0-9~,]+$/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/contact-email-lookup/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/extension-info\/[a-z0-9~,]+$/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/iovation-device/,
    GET: availability.HIGH,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/login-hash\/[a-z0-9~,]+/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/login-info/,
    GET: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/multifactor\/send-code/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/v1.0\/internal\/user-auth\/session-created/,
    POST: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/notify-admin/, POST: availability.HIGH },
  { reg: /\/restapi\/v1.0\/number-parser\/parse/, POST: availability.HIGH },
  {
    reg: /\/restapi\/v1.0\/number-parser\/phonedata.xml/,
    GET: availability.HIGH,
  },
  { reg: /\/restapi\/v1.0\/number-pool\/lookup/, POST: availability.LIMITED },
  {
    reg: /\/restapi\/v1.0\/number-pool\/lookup-external/,
    POST: availability.LIMITED,
  },
  { reg: /\/restapi\/v1.0\/number-pool\/reserve/, POST: availability.LIMITED },
  { reg: /\/restapi\/v1.0\/status/, GET: availability.LIMITED },
  { reg: /\/restapi\/[a-z0-9~,]+$/, GET: availability.HIGH },
  {
    reg: /\/restapi\/oauth\/revoke/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/oauth\/token/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/oauth\/userinfo/,
    POST: availability.HIGH,
  },
  {
    reg: /\/restapi\/oauth\/restapi\/oauth\/token/,
    POST: availability.HIGH,
  },
];
