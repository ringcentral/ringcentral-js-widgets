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
  onBackClick,
  ...baseProps
}) {
  return [
    <BackHeader
      key="header"
      onBackClick={onBackClick}>
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
  onBackClick: PropTypes.func.isRequired,
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
  phone,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    phone,
    ...props,
  });
  return {
    ...baseProps,
    onBackClick() {
      phone.routerInteraction.goBack();
    },
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
