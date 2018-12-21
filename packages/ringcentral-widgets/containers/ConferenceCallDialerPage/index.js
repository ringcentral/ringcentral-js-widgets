import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connectModule } from '../../lib/phoneContext';
import BackButton from '../../components/BackButton';
import BackHeader from '../../components/BackHeader';
import DialerPanel from '../../components/DialerPanel';

import i18n from './i18n';

class ConferenceCallDialerPanel extends Component {
  componentWillMount() {
    this.props.setLastSessionId();
  }

  render() {
    const {
      onBack,
      ...baseProps
    } = this.props;
    return [
      <BackHeader
        key="header"
        onBackClick={onBack}
        backButton={<BackButton label={i18n.getString('activeCall')} />}
      />,
      <DialerPanel
        key="dialer"
        {...baseProps}
      />
    ];
  }
}

ConferenceCallDialerPanel.propTypes = {
  ...DialerPanel.propTypes,
  onBack: PropTypes.func.isRequired,
  setLastSessionId: PropTypes.func.isRequired,
};

ConferenceCallDialerPanel.defaultProps = {
  ...DialerPanel.defaultProps,
};

export default connectModule(phone => phone.conferenceDialerUI)(ConferenceCallDialerPanel);
