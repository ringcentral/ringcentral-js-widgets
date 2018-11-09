import React from 'react';
import PropTypes from 'prop-types';
import Line from '../Line';
import IconField from '../IconField';

export default function IconLine(props) {
  return (
    <Line
      dataSign={props.dataSign}
      className={props.className}
      onClick={props.onClick}
      noBorder={props.noBorder}>
      <IconField
        className={props.className}
        icon={props.icon}>
        {props.children}
      </IconField>
    </Line>
  );
}

IconLine.propTypes = {
  dataSign: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  noBorder: PropTypes.bool,
};

IconLine.defaultProps = {
  dataSign: null
};
