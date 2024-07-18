/* eslint-disable react/destructuring-assignment */
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
import { format } from '@ringcentral-integration/utils';
import { RcIcon } from '@ringcentral/juno';
import { InfoBorder as infoSvg } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import 'rc-tooltip/assets/bootstrap_white.css';
import type { ChangeEvent, FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import { DropdownSelect } from '../DropdownSelect';
import IconField from '../IconField';
import InputField from '../InputField';
import Panel from '../Panel';
import { Tooltip } from '../Rcui/Tooltip';
import SaveButton from '../SaveButton';
import { SpinnerOverlay } from '../SpinnerOverlay';
import Switch from '../Switch';
import TextInput from '../TextInput';

import type {
  CallingSettingsPanelProps,
  CallingSettingsProps,
  CallWithProps,
  GetCallingOptionNameProps,
} from './CallingSettingsPenal.interface';
import i18n from './i18n';
import styles from './styles.scss';

export function getCallingOptionName({
  callingOption,
  currentLocale,
  jupiterAppName,
  softphoneAppName,
}: GetCallingOptionNameProps) {
  if (callingOption === callingOptions.softphone) {
    return softphoneAppName;
  }
  if (callingOption === callingOptions.jupiter) {
    return jupiterAppName;
  }
  if (callingOption === callingOptions.ringout) {
    // Not to translate
    return 'RingOut';
  }
  return i18n.getString(callingOption, currentLocale);
}

const CallWithSettings: FunctionComponent<CallWithProps> = ({
  callWith,
  callWithOptions,
  currentLocale,
  disabled,
  onCallWithChange,
  jupiterAppName,
  softphoneAppName,
}) => {
  const tooltipContainerRef = useRef(null);

  const valueRenderer = (option: string) => {
    const optionName = getCallingOptionName({
      callingOption: option,
      currentLocale,
      jupiterAppName,
      softphoneAppName,
    });
    return <span data-sign={`selected_${optionName}`}>{optionName}</span>;
  };

  const optionRenderer = (option: string) => {
    const optionName = getCallingOptionName({
      callingOption: option,
      currentLocale,
      jupiterAppName,
      softphoneAppName,
    });
    return <span data-sign={`option_${optionName}`}>{optionName}</span>;
  };

  const keys = [`${callWith}Tooltip`];
  if (
    callWith !== callingOptions.browser &&
    callWith !== callingOptions.softphone &&
    callWith !== callingOptions.jupiter
  ) {
    keys.push(`${callWith}Tooltip1`);
  }
  const optionName = getCallingOptionName({
    callingOption: callWith,
    currentLocale,
    jupiterAppName,
    softphoneAppName,
  });

  return (
    <InputField
      label={
        <span data-sign="callSettingInfo">
          {i18n.getString('makeCallsWith', currentLocale)}
          <Tooltip
            title={keys.map((key) => (
              <div key={key}>
                {format(i18n.getString(key, currentLocale), {
                  brand: optionName,
                })}
              </div>
            ))}
          >
            <RcIcon
              size="small"
              symbol={infoSvg}
              className={styles.tooltipIcon}
            />
          </Tooltip>
        </span>
      }
    >
      <DropdownSelect
        dataSign="callingSetting"
        dropdownClassName={styles.overWidth}
        className={styles.select}
        value={callWith}
        onChange={onCallWithChange}
        options={callWithOptions}
        dropdownAlign="left"
        renderFunction={optionRenderer}
        renderValue={valueRenderer}
        valueFunction={(option) => option}
        disabled={disabled}
        titleEnabled
      />
      <div className={styles.tooltipContainer} ref={tooltipContainerRef} />
    </InputField>
  );
};

// TODO: properly type available numbers

interface RingoutSettingsProps {
  currentLocale: string;
  callWith: string;
  availableNumbersWithLabel: { label: string; value: string }[];
  locationSearchable: boolean;
  myLocation: string;
  onMyLocationChange: (newMyLocation: string) => void;
  onMyLocationTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  ringoutPrompt: boolean;
  onRingoutPromptChange: (newRingoutPrompt: boolean) => void;
}

const RingoutSettings: FunctionComponent<RingoutSettingsProps> = ({
  currentLocale,
  callWith,
  availableNumbersWithLabel,
  locationSearchable,
  myLocation,
  onMyLocationChange,
  onMyLocationTextChange,
  disabled,
  ringoutPrompt,
  onRingoutPromptChange,
}) => {
  if (
    callWith !== callingOptions.softphone &&
    callWith !== callingOptions.browser &&
    callWith !== callingOptions.jupiter
  ) {
    return (
      <div>
        <div className={styles.ringoutHint}>
          {i18n.getString('ringoutHint', currentLocale)}
        </div>
        <InputField
          dataSign="myLocation"
          label={i18n.getString('myLocationLabel', currentLocale)}
        >
          {availableNumbersWithLabel ? (
            <DropdownSelect
              className={clsx(styles.select, styles.locationSelect)}
              value={myLocation}
              onChange={onMyLocationChange}
              // @ts-expect-error TS(2322): Type '((option: string, text: string) => boolean) ... Remove this comment to see the full error message
              searchOption={
                locationSearchable
                  ? (option: string, text: string) => option.includes(text)
                  : null
              }
              options={availableNumbersWithLabel}
              disabled={disabled}
              dropdownAlign="left"
              titleEnabled
              customInputEnabled
              optionsWithLabel
              customInputLimit={30}
            />
          ) : (
            <TextInput
              dataSign="myLocationInput"
              value={myLocation}
              maxLength={30}
              onChange={onMyLocationTextChange}
            />
          )}
        </InputField>
        <IconField
          className={styles.iconField}
          icon={
            <Switch
              dataSign="ringoutPromptToggle"
              checked={ringoutPrompt}
              onChange={onRingoutPromptChange}
            />
          }
        >
          {i18n.getString('press1ToStartCallLabel', currentLocale)}
        </IconField>
      </div>
    );
  }
  return null;
};

const CallingSettings: FunctionComponent<CallingSettingsProps> = ({
  availableNumbersWithLabel,
  callWith,
  callWithOptions,
  currentLocale,
  defaultRingoutPrompt = true,
  disabled = false,
  locationSearchable = false,
  myLocation,
  onSave,
  ringoutPrompt,
  incomingAudio,
  incomingAudioFile,
  outgoingAudio,
  outgoingAudioFile,
  jupiterAppName,
  softphoneAppName,
}) => {
  const [callWithState, setCallWithState] = useState(callWith);
  const [ringoutPromptState, setRingoutPromptState] = useState(ringoutPrompt);
  const [myLocationState, setMyLocationState] = useState(myLocation);
  const [incomingAudioState, setIncomingAudioState] = useState(incomingAudio);
  const [incomingAudioFileState, setIncomingAudioFileState] =
    useState(incomingAudioFile);
  const [outgoingAudioState, setOutgoingAudioState] = useState(outgoingAudio);
  const [outgoingAudioFileState, setOutgoingAudioFileState] =
    useState(outgoingAudioFile);

  useEffect(() => {
    setCallWithState(callWith);
    setMyLocationState(myLocation);
    setRingoutPromptState(ringoutPrompt);
    setIncomingAudioState(incomingAudio);
    setIncomingAudioFileState(incomingAudioFile);
    setOutgoingAudioState(outgoingAudio);
    setOutgoingAudioFileState(outgoingAudioFile);
  }, [
    callWith,
    myLocation,
    ringoutPrompt,
    incomingAudio,
    incomingAudioFile,
    outgoingAudio,
    outgoingAudioFile,
  ]);
  const isSaveButtonDisabled =
    (callWithState === callWith &&
      myLocationState === myLocation &&
      ringoutPromptState === ringoutPrompt &&
      incomingAudioState === incomingAudio &&
      incomingAudioFileState === incomingAudioFile &&
      outgoingAudioState === outgoingAudio &&
      outgoingAudioFileState === outgoingAudioFile) ||
    (callWithState === callingOptions.ringout && !myLocationState);

  return (
    <>
      <CallWithSettings
        {...{
          callWith: callWithState,
          jupiterAppName,
          softphoneAppName,
          callWithOptions,
          currentLocale,
          disabled,
          onCallWithChange: (newCallWith: string) => {
            setCallWithState(newCallWith);
            if (newCallWith === callWith) {
              setMyLocationState(myLocation);
              setRingoutPromptState(ringoutPrompt);
            } else {
              // * when callWith changed, set myLocation to be the first available number
              setMyLocationState(availableNumbersWithLabel?.[0]?.value || '');
              setRingoutPromptState(defaultRingoutPrompt);
            }
          },
        }}
      />
      <RingoutSettings
        {...{
          currentLocale,
          callWith: callWithState,
          availableNumbersWithLabel,
          locationSearchable,
          myLocation: myLocationState,
          onMyLocationChange: setMyLocationState,
          onMyLocationTextChange: ({ target: { value } }) => {
            setMyLocationState(value);
          },
          ringoutPrompt: ringoutPromptState,
          onRingoutPromptChange: setRingoutPromptState,
          disabled,
        }}
      />
      {/* TODO: still in Technical Preview */}
      {/* <RingTone
        {...{
          currentLocale,
          showRingToneSettings: true,
          incomingAudio: incomingAudioState,
          incomingAudioFile: incomingAudioFileState,
          outgoingAudio: outgoingAudioState,
          outgoingAudioFile: outgoingAudioFileState,
          defaultIncomingAudio,
          defaultIncomingAudioFile,
          defaultOutgoingAudio,
          defaultOutgoingAudioFile,
          setIncomingAudio: ({ fileName, dataUrl }) => {
            setIncomingAudioState(dataUrl);
            setIncomingAudioFileState(fileName);
          },
          resetIncomingAudio: () => {
            setIncomingAudioState(defaultIncomingAudio);
            setIncomingAudioFileState(defaultIncomingAudioFile);
          },
          setOutgoingAudio: ({ fileName, dataUrl }) => {
            setOutgoingAudioState(dataUrl);
            setOutgoingAudioFileState(fileName);
          },
          resetOutgoingAudio: () => {
            setOutgoingAudioState(defaultOutgoingAudio);
            setOutgoingAudioFileState(defaultOutgoingAudioFile);
          },
        }}
      /> */}
      <SaveButton
        {...{
          currentLocale,
          onClick: () => {
            onSave({
              callWith: callWithState,
              myLocation: myLocationState,
              ringoutPrompt: ringoutPromptState,
              isCustomLocation: !availableNumbersWithLabel.find(
                (item) => item.value === myLocationState,
              ),
              incomingAudio: incomingAudioState,
              incomingAudioFile: incomingAudioFileState,
              outgoingAudio: outgoingAudioState,
              outgoingAudioFile: outgoingAudioFileState,
            });
          },
          disabled: isSaveButtonDisabled,
        }}
      />
    </>
  );
};

export const CallingSettingsPanel: FunctionComponent<
  CallingSettingsPanelProps
> = ({
  className,
  onBackButtonClick,
  currentLocale,
  showSpinner = false,
  ...props
}) => {
  const content = showSpinner ? (
    <SpinnerOverlay />
  ) : (
    <CallingSettings {...{ ...props, currentLocale }} />
  );
  return (
    <div data-sign="callingSettings" className={clsx(styles.root, className)}>
      <PageHeader>
        <PageHeaderBack onClick={onBackButtonClick} />
        <PageHeaderTitle>
          {i18n.getString('title', currentLocale)}
        </PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <Panel className={styles.content}>{content}</Panel>
    </div>
  );
};
