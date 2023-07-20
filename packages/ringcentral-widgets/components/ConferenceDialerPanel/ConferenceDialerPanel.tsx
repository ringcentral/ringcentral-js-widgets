import type { FC } from 'react';
import React, { useEffect } from 'react';

import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import type { DialerPanelProps } from '../DialerPanel';
import { DialerPanel } from '../DialerPanel';
import i18n from './i18n';

type ConferenceDialerPanelProps = {
  onBack: () => void;
  setLastSessionId: () => void;
} & DialerPanelProps;

export const ConferenceDialerPanel: FC<ConferenceDialerPanelProps> = (
  props,
) => {
  const { onBack, setLastSessionId, ...baseProps } = props;

  useEffect(() => {
    setLastSessionId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackHeader
        key="header"
        onBackClick={onBack}
        backButton={<BackButton label={i18n.getString('activeCall')} />}
      />
      <DialerPanel key="dialer" {...baseProps} />
    </>
  );
};
