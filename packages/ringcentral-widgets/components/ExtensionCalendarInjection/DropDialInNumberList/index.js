import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import DropAdditionalValues from '../DropAdditionalValues';
import styles from './styles.scss';

function DropDialInNumberList({
  open, dialInNumbers, selected, onChange,
}) {
  if (dialInNumbers.length === 0) {
    return '';
  }
  return (
    <div className={classnames(styles.dropdown, open && styles.open)}>
      <DropAdditionalValues
        dialInNumbers={dialInNumbers}
        selected={selected}
        onChange={onChange}
        withCheckbox
      />
    </div>
  );
}

DropDialInNumberList.propTypes = {
  dialInNumbers: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool
};

DropDialInNumberList.defaultProps = {
  open: false
};

export default DropDialInNumberList;
