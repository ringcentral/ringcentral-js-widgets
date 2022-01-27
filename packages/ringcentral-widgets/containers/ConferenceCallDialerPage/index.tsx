import React, { Component } from 'react';

import BackButton from '../../components/BackButton';
import BackHeader from '../../components/BackHeader';
import DialerPanel from '../../components/DialerPanel';
import { connectModule } from '../../lib/phoneContext';
import i18n from './i18n';

type ConferenceCallDialerPanelProps = {
  onBack: (...args: any[]) => any;
  setLastSessionId: (...args: any[]) => any;
};
class ConferenceCallDialerPanel extends Component<
  ConferenceCallDialerPanelProps,
  {}
> {
  componentWillMount() {
    this.props.setLastSessionId();
  }
  render() {
    const { onBack, ...baseProps } = this.props;
    return [
      <BackHeader
        key="header"
        onBackClick={onBack}
        backButton={<BackButton label={i18n.getString('activeCall')} />}
      />,
      <DialerPanel key="dialer" {...baseProps} />,
    ];
  }
}
ConferenceCallDialerPanel.defaultProps = {
  ...DialerPanel.defaultProps,
};
export default connectModule((phone) => phone.conferenceDialerUI)(
  ConferenceCallDialerPanel,
);