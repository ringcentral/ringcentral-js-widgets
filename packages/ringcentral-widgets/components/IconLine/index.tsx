import { RcText } from '@ringcentral/juno';
import React from 'react';

import IconField from '../IconField';
import Line from '../Line';

type IconLineProps = {
  dataSign?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  onClick?: (...args: any[]) => any;
  noBorder?: boolean;
  title?: string;
  hintText?: string;
};

const IconLine: React.FC<IconLineProps> = (props) => {
  return (
    <Line
      className={props.className}
      onClick={props.onClick}
      dataSign={props.dataSign}
      noBorder={props.noBorder}
    >
      <IconField
        className={props.className}
        iconClassName={props.iconClassName}
        icon={props.icon}
        title={props.title}
      >
        {props.children}
      </IconField>

      {props.hintText && (
        <RcText
          data-sign="hintText"
          color="neutral.f04"
          variant="caption1"
          component="div"
          noWrap={false}
          style={{ marginTop: '15px' }}
        >
          {props.hintText}
        </RcText>
      )}
    </Line>
  );
};

IconLine.defaultProps = {
  dataSign: undefined,
  title: undefined,
};

export default IconLine;
