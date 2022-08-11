import React, { FunctionComponent, useMemo } from 'react';

import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { RcIcon, RcPaletteKeys } from '@ringcentral/juno';
import {
  IncallBorder,
  MissedcallBorder,
  OutcallBorder,
} from '@ringcentral/juno-icon';

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
  const icon = (() => {
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
  })();

  const color = ((): RcPaletteKeys => {
    if (active) {
      return 'success.b04';
    }

    if (missed) {
      return 'danger.b04';
    }

    return 'neutral.f04';
  })();

  return (
    <RcIcon
      data-sign="callIcon"
      title={title || direction}
      // @ts-expect-error TS(2322): Type 'MemoExoticComponent<ForwardRefExoticComponen... Remove this comment to see the full error message
      symbol={icon}
      size="medium"
      color={color}
    />
  );
};
