import PropTypes from 'prop-types';
import { RcList } from '@ringcentral-integration/rcui';
import React from 'react';

import { ListViewItem } from './ListViewItem';

export const ListView = ({
  options = [],
  nonShow,
  startAdornment,
  ...props
}) => {
  if (nonShow && options.length === 0) {
    return nonShow;
  }

  return (
    <RcList>
      {options.map((option, i) => (
        <ListViewItem
          key={i}
          index={i}
          option={option}
          startAdornment={startAdornment}
          {...props}
        />
      ))}
    </RcList>
  );
};

ListView.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  nonShow: PropTypes.node,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  valueFunction: PropTypes.func.isRequired,
  filter: PropTypes.string,
  renderFunction: PropTypes.func.isRequired,
  startAdornment: PropTypes.func,
};

ListView.defaultProps = {
  options: [],
  nonShow: null,
  filter: null,
  onChange() {},
  startAdornment() {},
};
