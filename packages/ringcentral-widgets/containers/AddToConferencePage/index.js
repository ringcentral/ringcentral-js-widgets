import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withPhone from '../../lib/withPhone';
import BackHeader from '../../components/BackHeader';
import DialerPanel from '../../components/DialerPanel';

import {
  mapToProps as mapToBaseProps,
  mapToFunctions as mapToBaseFunctions,
} from '../DialerPage';
import i18n from './i18n';

function AddToConferencePanel({
  onBack,
  ...baseProps
}) {
  return [
    <BackHeader
      key="header"
      onBackClick={onBack}>
      {i18n.getString('addToConference')}
    </BackHeader>,
    <DialerPanel
      key="dialer"
      {...baseProps}
    />
  ];
}

AddToConferencePanel.propTypes = {
  ...DialerPanel.propTypes,
  onBack: PropTypes.func.isRequired,
};

AddToConferencePanel.defaultProps = {
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
  onBack,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    ...props,
  });
  return {
    ...baseProps,
    onBack,
  };
}

const AddToConferencePage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(AddToConferencePanel));

export {
  mapToProps,
  mapToFunctions,
  AddToConferencePage as default,
};
