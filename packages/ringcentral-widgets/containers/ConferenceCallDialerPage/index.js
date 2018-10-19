import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withPhone from '../../lib/withPhone';
import BackButton from '../../components/BackButton';
import BackHeader from '../../components/BackHeader';
import DialerPanel from '../../components/DialerPanel';

import {
  mapToProps as mapToBaseProps,
  mapToFunctions as mapToBaseFunctions,
} from '../DialerPage';
import i18n from './i18n';
import styles from './styles.scss';

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

function mapToProps(_, {
  phone: {
    conferenceDialerUI,
    ...components
  },
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    ...props,
    phone: {
      ...components,
      dialerUI: conferenceDialerUI, // override
    },
  });
  return {
    ...baseProps,
    showFromField: false,
  };
}

function mapToFunctions(_, {
  params,
  phone: {
    conferenceCall,
    conferenceDialerUI,
    ...components
  },
  onBack,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    params,
    ...props,
    phone: {
      ...components,
      conferenceCall,
      dialerUI: conferenceDialerUI, // override
    },
  });
  return {
    ...baseProps,
    onBack,
    setLastSessionId() {
      const { fromSessionId } = params;
      conferenceDialerUI.setLastSessionId(fromSessionId);
    },
    onCallButtonClick() {
      conferenceDialerUI.onCallButtonClick({
        fromNumber: params.fromNumber,
        fromSessionId: params.fromSessionId,
      });
    },
    callBtnClassName: styles.callBtn,
  };
}

const ConferenceCallDialerPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ConferenceCallDialerPanel));

export {
  mapToProps,
  mapToFunctions,
  ConferenceCallDialerPage as default,
};
