import React from 'react';

import IconField from '../IconField';
import Line from '../Line';

type IconLineProps = {
  dataSign?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (...args: any[]) => any;
  noBorder?: boolean;
  title?: string;
};
const IconLine: React.SFC<IconLineProps> = (props) => {
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
};
IconLine.defaultProps = {
  dataSign: null,
  title: null,
};
export default IconLine;
