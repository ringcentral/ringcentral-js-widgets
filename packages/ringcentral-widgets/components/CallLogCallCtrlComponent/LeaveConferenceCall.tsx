import { RcButton, RcDrawer, RcIcon, RcTypography } from '@ringcentral/juno';
import { CallAdd } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import { props } from 'ramda';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import type { MoreActionComponentProps } from './MoreActionComponent.interface';
import i18n from './i18n';
import styles from './styles.scss';

export const LeaveConferenceCall: FunctionComponent<{
  currentLocale: string;
  onEndCallForEveryOne: () => any;
  onLeaveCall: () => any;
}> = (props) => {
  const { currentLocale, onLeaveCall, onEndCallForEveryOne } = props;
  return (
    <>
      <div className="flex flex-col items-center">
        <RcTypography
          data-sign="leaveOrEndCallTitle"
          className="w-[305px] px-4 self-center mb-3"
          align={'center'}
          variant="subheading2"
        >
          {i18n.getString('leaveOrEndCall', currentLocale)}
        </RcTypography>

        <RcButton
          data-sign="leaveCall"
          variant="contained"
          radius="round"
          className="min-w-[96px] h-[36px] w-[273px] self-center"
          onClick={onLeaveCall}
          size={'large'}
        >
          {i18n.getString('leaveCall', currentLocale)}
        </RcButton>
        <RcButton
          data-sign="endCallForEveryone"
          className="m-2 mx-3 align-self-center"
          fullWidth={false}
          size={'large'}
          variant="text"
          onClick={onEndCallForEveryOne}
        >
          {i18n.getString('endCallForEveryone', currentLocale)}
        </RcButton>
      </div>
    </>
  );
};
