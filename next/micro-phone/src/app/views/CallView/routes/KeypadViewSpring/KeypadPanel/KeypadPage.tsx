import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  useAsyncState,
  usePageAutoFocus,
} from '@ringcentral-integration/react-hooks';
import { KeypadOffSp } from '@ringcentral/juno-icon';
import {
  CallButton,
  Dialer,
  DialerPadSoundsMPEG,
  DialPad,
  DialTextField,
  IconButton,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';
import { noop } from 'rxjs';

import { useCallControlLayout } from '../../CallControlViewSpring/CallControlPanel';
import type { KeypadViewPanelProps } from '../Keypad.view.interface';
import i18n from '../i18n';

export const KeypadPage: FunctionComponent<KeypadViewPanelProps> = (props) => {
  const {
    call,
    onAction = noop,
    callVolume = 1,
    outputDeviceId = '',
    toNumber: toNumberProp,
    onToNumberChange,
    actionButtonDisabled,
    expanded,
    onExpand,
  } = props;

  const [toNumber, setToNumber] = useAsyncState(toNumberProp, onToNumberChange);
  const inputRef = useRef<HTMLInputElement>(null);

  usePageAutoFocus(inputRef);
  const { t } = useLocale(i18n);

  const render = useCallControlLayout(call, {
    main: (
      <Dialer>
        <div className="flex justify-center items-center mb-6 -mt-6">
          <DialTextField
            inputRef={inputRef}
            variant="quiet"
            keypadMode
            fullWidth
            value={toNumber}
            onChange={setToNumber}
            inputProps={{
              'data-sign': 'dialpad-input',
            }}
            onEmit={(newValue) => {
              onAction('sendDTMF', newValue);
            }}
            className="max-w-[250px]"
          />
        </div>

        <div>
          <DialPad
            data-sign="dialPad"
            volume={callVolume}
            sounds={DialerPadSoundsMPEG}
            size="medium"
            sinkId={outputDeviceId}
            className="gap-y-2"
          />
        </div>
      </Dialer>
    ),
    footer: (
      <>
        <CallButton
          className="-mt-3"
          data-sign="sendDTMF"
          variant="end"
          size="medium"
          disabled={actionButtonDisabled}
          onClick={() => onAction('hangUp')}
        />

        <IconButton
          className="absolute flex-col translate-x-[80px] -translate-y-1"
          data-sign="hideKeypad"
          shape="squircle"
          color="secondary"
          TooltipProps={{
            title: t('hideKeypad'),
          }}
          // TODO: wait spring version icon
          symbol={KeypadOffSp}
          onClick={() => onAction('activeCall')}
        />
      </>
    ),
    onBack: () => {
      onAction('back');
    },
    onConferenceClick: () => {
      onAction('viewConferenceList');
    },
    expanded,
    onExpand,
  });

  return render;
};
