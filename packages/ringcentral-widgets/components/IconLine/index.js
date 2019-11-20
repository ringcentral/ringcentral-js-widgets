import React from 'react';
import PropTypes from 'prop-types';
import Line from '../Line';
import IconField from '../IconField';

export default function IconLine(props) {
  return (
    <Line
      className={props.className}
      onClick={props.onClick}
      dataSign={props.dataSign}
      noBorder={props.noBorder}
    >
      <IconField
        className={props.className}
        icon={props.icon}
        title={props.title}
      >
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
  title: PropTypes.string,
};
IconLine.defaultProps = {
  dataSign: null,
  title: null,
};
