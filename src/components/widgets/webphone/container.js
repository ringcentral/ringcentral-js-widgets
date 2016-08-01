import { connect } from '../../../utils/integration/';

import WebPhone from './presentation/WebPhone.react';
import { getString } from '../../../utils/locale/';
import { formatPhone } from '../../../utils/format/phone';

import countryData from 'country-data';

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

const statusMapping = {
  REGISTER_SUCCESSED: 'IDLE',
  PRE_REGISTER: 'IDLE',
  CALL_INCOMING: 'ON_INCOMING_CALL',
  CALL_CONNECTING: 'ON_CALL',
  CALL_CONNECTED: 'ON_CALL',
};

const numberTypeMapping = {
  CompanyFaxNumber: 0,
  CompanyNumber: 1,
  MainCompanyNumber: 2,
  DirectNumber: 3,
};

function countryMapping(name) {
  return countryData.lookup.countries({ name })[0].alpha2;
}

const withRedux = connect((state, props, phone) => {
  return {
    accept: () => phone.webphone.accept(),
    call: (...args) => phone.webphone.call(...args),
    bye: () => phone.webphone.bye(),
    flip: (...args) => phone.webphone.flip(...args),
    transfer: (...args) => phone.webphone.transfer(...args),
    park: (...args) => phone.webphone.park(...args),
    record: (...args) => phone.webphone.record(...args),
    hold: (...args) => phone.webphone.hold(...args),
    mute: (...args) => phone.webphone.mute(...args),
    dtmf: (...args) => phone.webphone.dtmf(...args),
    // <WebPhone />
    status: statusMapping[state.common.webphone.status],

    // <ActiveCall />
    operationStatus: state.common.webphone.operation.status,
    disabledOperation: state.common.webphone.operation.disabled,
    webphoneStatus: state.common.webphone.status,
    // phoneNumber could be (temp) toNumber from dial pad or
    // actuall info from sip
    callingNumber: state.common.webphone.remoteIdentity ?
                  clean(state.common.webphone.remoteIdentity.friendlyName) :
                  state.common.webphone.toNumber,

    // <Flip />
    flipNumbers: state.common.user.forwardingNumbers
                  .filter(number => number.features.indexOf('CallFlip') > -1),

    // <DialPad />

    // <Transfer />

    // <CallerBar />
    userNumbers: state.common.user.phoneNumbers
      .sort((a, b) => numberTypeMapping[b.usageType] - numberTypeMapping[a.usageType])
      .map(number => Object.assign({}, number, {
        left: countryMapping(number.country.name),
        mid: formatPhone(number.phoneNumber),
        right: number.usageType.slice(0, number.usageType.indexOf('Number')),
      })),

    // locale
    getString: getString.bind(null, state.locale.lang),
  };
})(WebPhone);

export default withRedux;
