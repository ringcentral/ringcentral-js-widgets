import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

import DialerPanel from '../../components/DialerPanel';
import styles from './styles.scss';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    call,
    dialerUI,
    callMonitor,
    callingSettings,
    contactSearch,
    connectivityMonitor,
    locale,
    rateLimiter,
    webphone,
    audioSettings,
    conferenceCall,
  },
  dialButtonMuted = false,
}) {
  const isWebphoneMode = (callingSettings.callingMode === callingModes.webphone);
  const waitingWebphoneConnected = (isWebphoneMode && webphone && webphone.connecting);
  const webphoneDisconnected = (isWebphoneMode && webphone && !webphone.connected);
  const audioNotEnabled = isWebphoneMode && audioSettings && !audioSettings.userMedia;
  const conferenceCallEquipped = !!conferenceCall;
  const withTab = !!(
    conferenceCallEquipped
    && isWebphoneMode
    && callMonitor.calls.length
    && webphone.sessions.length
  );

  return {
    currentLocale: locale.currentLocale,
    callingMode: callingSettings.callingMode,
    isWebphoneMode,
    callButtonDisabled: (
      !call.isIdle
      || !connectivityMonitor.connectivity
      || rateLimiter.throttling
      || webphoneDisconnected
      || audioNotEnabled
    ),
    toNumber: dialerUI.toNumberField,
    recipient: dialerUI.recipient,
    searchContactList: contactSearch ? contactSearch.sortedResult : [],
    fromNumbers: callingSettings.fromNumbers,
    fromNumber: callingSettings.fromNumber,
    showSpinner: !(
      call.ready &&
      callingSettings.ready &&
      locale.ready &&
      connectivityMonitor.ready &&
      (!audioSettings || audioSettings.ready) &&
      (!isWebphoneMode || !webphone || !waitingWebphoneConnected)
    ),
    dialButtonVolume: audioSettings ? audioSettings.dialButtonVolume : 1,
    // If audioSettings is used, then use values from audioSettings module
    dialButtonMuted: audioSettings ? audioSettings.dialButtonMuted : dialButtonMuted,
    callBtnClassName: withTab ? null : styles.callBtn,
  };
}
function mapToFunctions(_, {
  phone: {
    callingSettings,
    regionSettings,
    contactSearch,
    dialerUI,
    conferenceCall,
  },
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
}) {
  return {
    onToNumberChange: value => (
      dialerUI.setToNumberField(value)
    ),
    clearToNumber: () => dialerUI.clearToNumberField(),
    onCallButtonClick() {
      /**
       * Clear the mergingPair if any (RCINT-7716)
       */
      if (conferenceCall) {
        conferenceCall.closeMergingPair();
      }
      dialerUI.onCallButtonClick();
    },
    changeFromNumber: (...args) => callingSettings.updateFromNumber(...args),
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings && regionSettings.areaCode,
      countryCode: regionSettings && regionSettings.countryCode,
    }),
    setRecipient: recipient => dialerUI.setRecipient(recipient),
    clearRecipient: () => dialerUI.clearRecipient(),
    searchContact(searchString) {
      if (!contactSearch) {
        return;
      }
      contactSearch.debouncedSearch({ searchString });
    },
    phoneTypeRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  };
}

const DialerPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(DialerPanel));

export {
  mapToFunctions,
  mapToProps,
  DialerPage as default,
};
