import LPN from 'google-libphonenumber';

const phoneUtil = LPN.PhoneNumberUtil.getInstance();

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

function getNationalPhone(raw, country = 'US') {
  if (!raw) return '';
  return phoneUtil.format(
    phoneUtil.parse(
      raw,
      country
    ),
    LPN.PhoneNumberFormat.NATIONAL
  );
}

export default (state, props, phone) => (
  {
    accept: () => phone.webphone.accept(),
    bye: () => phone.webphone.bye(),
    // phoneNumber could be (temp) toNumber from dial pad or
    // actuall info from sip
    callingNumber: getNationalPhone(
                    state.common.webphone.remoteIdentity ?
                    clean(state.common.webphone.remoteIdentity.friendlyName) :
                    state.common.webphone.toNumber
                  ),
  }
);
