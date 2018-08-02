import React from 'react';
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

function ConferenceCallDialerPanel({
  onBack,
  ...baseProps
}) {
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

ConferenceCallDialerPanel.propTypes = {
  ...DialerPanel.propTypes,
  onBack: PropTypes.func.isRequired,
};

ConferenceCallDialerPanel.defaultProps = {
  ...DialerPanel.defaultProps,
};

function mapToProps(_, {
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    ...props,
  });
  return {
    ...baseProps,
    showFromField: false,
  };
}

function mapToFunctions(_, {
  params,
  phone,
  onBack,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    params,
    phone,
    ...props,
  });
  return {
    ...baseProps,
    onBack,
    onCallButtonClick() {
      phone.dialerUI.onCallButtonClick({
        fromNumber: params.fromNumber,
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
