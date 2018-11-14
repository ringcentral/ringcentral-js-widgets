import React from 'react';
import PropTypes from 'prop-types';

function Call({ onLog }) {

}

Call.propTypes = {
  onLog: PropTypes.func,
};

Call.defaultProps = {
  onLog() {},
};

export default Call;
