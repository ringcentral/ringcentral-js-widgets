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
  phone: {
    conferenceCallDialerUI,
    ...components
  },
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    ...props,
    phone: {
      ...components,
      dialerUI: conferenceCallDialerUI, // override
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
    conferenceCallDialerUI,
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
      dialerUI: conferenceCallDialerUI, // override
    },
  });
  return {
    ...baseProps,
    onBack,
    onCallButtonClick() {
      conferenceCallDialerUI.onCallButtonClick({
        fromNumber: params.fromNumber,
        beforeCall() {
          const { fromSessionId } = params;
          if (
            fromSessionId &&
            conferenceCall &&
            conferenceCall.mergingPair &&
            !conferenceCall.mergingPair.fromSessionId
          ) {
            // set mergingPair if has
            conferenceCall.setMergeParty({
              fromSessionId
            });
          }
        }
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
