import React, { useMemo, FunctionComponent } from 'react';
import classNames from 'classnames';
import { callDirection } from 'ringcentral-integration/enums/callDirections';
import { RcIcon } from '@ringcentral/juno';
import {
  IncallBorder,
  OutcallBorder,
  MissedcallBorder,
} from '@ringcentral/juno/icon';

import styles from './styles.scss';

export type CallIconProps = {
  direction?: string;
  active?: boolean;
  missed?: boolean;
  title?: string;
};

export const CallIcon: FunctionComponent<CallIconProps> = ({
  direction,
  active,
  missed,
  title,
}) => {
  const icon = useMemo(() => {
    if (missed) {
      return MissedcallBorder;
    }

    switch (direction) {
      case callDirection.inbound:
        return IncallBorder;
      case callDirection.outbound:
        return OutcallBorder;
      default:
        return null;
    }
  }, [missed, direction]);

  return (
    <span title={title}>
      <RcIcon
        symbol={icon}
        className={classNames(styles.icon, {
          [styles.active]: active,
          [styles.missed]: missed,
        })}
      />
    </span>
  );
};
