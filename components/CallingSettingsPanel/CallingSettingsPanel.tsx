/* eslint-disable react/destructuring-assignment */
import React, {
  FunctionComponent,
  useState,
  useRef,
  ChangeEvent,
  useEffect,
} from 'react';
import classnames from 'classnames';
import formatMessage from 'format-message';

import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
import TooltipBase from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import InfoIcon from '../../assets/images/Info.svg';

import styles from './styles.scss';
import i18n from './i18n';

import { SpinnerOverlay } from '../SpinnerOverlay';
import BackHeader from '../BackHeader';
import Panel from '../Panel';
import Switch from '../Switch';
import IconField from '../IconField';
import InputField from '../InputField';
import TextInput from '../TextInput';
import DropdownSelect from '../DropdownSelect';
import SaveButton from '../SaveButton';
import { RingTone } from '../Ringtone';
import {
  CallingSettingsPanelProps,
  CallingSettingsProps,
  GetCallingOptionProps,
  GetOptionNameProps,
  TooltipProps,
  CallWithProps,
} from './CallingSettingsPenal.interface';

const TooltipBaseComp =
  typeof TooltipBase === 'function' ? TooltipBase : TooltipBase.default;

export function getJupiterAppName({
  brandCode,
  brandName,
  shortBrandName,
  fullBrandName,
  jupiterAppName,
}: GetOptionNameProps): string {
  if (jupiterAppName) return jupiterAppName;
  switch (brandCode) {
    case 'att':
      return fullBrandName;
    case 'telus':
      return `${shortBrandName} App`;
    default:
      return `${brandName} App`;
  }
}

export function getSoftphoneAppName({
  brandCode,
  brandName,
  shortBrandName,
  fullBrandName,
}: GetOptionNameProps): string {
  switch (brandCode) {
    case 'att':
      return `${fullBrandName} Phone`;
    case 'telus':
      return `${shortBrandName} Phone`;
    default:
      return `${brandName} Phone`;
  }
}

export function getCallingOptionName({
  callingOption,
  brandCode,
  brandName,
  shortBrandName,
  fullBrandName,
  currentLocale,
  jupiterAppName,
}: GetCallingOptionProps) {
  if (callingOption === callingOptions.softphone) {
    return getSoftphoneAppName({
      brandCode,
      brandName,
      shortBrandName,
      fullBrandName,
    });
  }
  if (callingOption === callingOptions.jupiter) {
    return getJupiterAppName({
      brandCode,
      brandName,
      shortBrandName,
      fullBrandName,
      jupiterAppName,
    });
  }
  if (callingOption === callingOptions.ringout) {
    // Not to translate
    return 'RingOut';
  }
  return i18n.getString(callingOption, currentLocale);
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  brandCode,
  brandName,
  callWith,
  currentLocale,
  tooltipContainerRef,
  shortBrandName,
  fullBrandName,
  jupiterAppName,
}) => {
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
    brandCode,
    brandName,
    currentLocale,
    shortBrandName,
    fullBrandName,
    jupiterAppName,
  });
  const overlay = (
    <div>
      {keys.map((key) => (
        <div key={key}>
          {formatMessage(i18n.getString(key, currentLocale), {
            brand: optionName,
          })}
        </div>
      ))}
    </div>
  );
  return (
    <TooltipBaseComp
      placement="bottom"
      trigger="click"
      overlay={overlay}
      align={{
        offset: [0, 47],
      }}
      arrowContent={<div className="rc-tooltip-arrow-inner" />}
      getTooltipContainer={() => tooltipContainerRef.current}
    >
      <InfoIcon width={14} height={14} className={styles.infoIcon} />
    </TooltipBaseComp>
  );
};

const CallWithSettings: FunctionComponent<CallWithProps> = ({
  brandCode,
  brandName,
  shortBrandName,
  fullBrandName,
  callWith,
  callWithOptions,
  currentLocale,
  disabled,
  onCallWithChange,
  jupiterAppName,
}) => {
  const tooltipContainerRef = useRef(null);

  const optionRenderer = (option: string) => {
    const optionName = getCallingOptionName({
      callingOption: option,
      brandCode,
      brandName,
      currentLocale,
      shortBrandName,
      fullBrandName,
      jupiterAppName,
    });
    return optionName;
  };

  return (
    <InputField
      label={
        <span>
          {i18n.getString('makeCallsWith', currentLocale)}
          <Tooltip
            {...{
              brandCode,
              brandName,
              callWith,
              currentLocale,
              tooltipContainerRef,
              shortBrandName,
              fullBrandName,
              jupiterAppName,
            }}
          />
        </span>
      }
    >
      <DropdownSelect
        dataSign="callingSetting"
        className={styles.select}
        value={callWith}
        onChange={onCallWithChange}
        options={callWithOptions}
        dropdownAlign="left"
        renderFunction={optionRenderer}
        renderValue={optionRenderer}
        disabled={disabled}
        titleEnabled
      />
      <div className={styles.tooltipContainer} ref={tooltipContainerRef} />
    </InputField>
  );
};

// TODO properly type available numbers

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
              className={classnames(styles.select, styles.locationSelect)}
              value={myLocation}
              onChange={onMyLocationChange}
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
  brandCode,
  brandName,
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
  showRingToneSettings = false,
  incomingAudio,
  incomingAudioFile,
  outgoingAudio,
  outgoingAudioFile,
  defaultIncomingAudio,
  defaultIncomingAudioFile,
  defaultOutgoingAudio,
  defaultOutgoingAudioFile,
  shortBrandName,
  fullBrandName,
  jupiterAppName,
}) => {
  const [callWithState, setCallWithState] = useState(callWith);
  const [ringoutPromptState, setRingoutPromptState] = useState(ringoutPrompt);
  const [myLocationState, setMyLocationState] = useState(myLocation);
  const [incomingAudioState, setIncomingAudioState] = useState(incomingAudio);
  const [incomingAudioFileState, setIncomingAudioFileState] = useState(
    incomingAudioFile,
  );
  const [outgoingAudioState, setOutgoingAudioState] = useState(outgoingAudio);
  const [outgoingAudioFileState, setOutgoingAudioFileState] = useState(
    outgoingAudioFile,
  );

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
  return (
    <>
      <CallWithSettings
        {...{
          brandCode,
          brandName,
          callWith: callWithState,
          jupiterAppName,
          callWithOptions,
          currentLocale,
          disabled,
          shortBrandName,
          fullBrandName,
          onCallWithChange: (newCallWith: string) => {
            setCallWithState(newCallWith);
            if (newCallWith === callWith) {
              setMyLocationState(myLocation);
              setRingoutPromptState(ringoutPrompt);
            } else {
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
      <RingTone
        {...{
          currentLocale,
          showRingToneSettings:
            showRingToneSettings && callWithState === callingOptions.browser,
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
      />
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
          disabled:
            (callWithState === callWith &&
              myLocationState === myLocation &&
              ringoutPromptState === ringoutPrompt &&
              incomingAudioState === incomingAudio &&
              incomingAudioFileState === incomingAudioFile &&
              outgoingAudioState === outgoingAudio &&
              outgoingAudioFileState === outgoingAudioFile) ||
            (callWithState === callingOptions.ringout && !myLocationState),
        }}
      />
    </>
  );
};

export const CallingSettingsPanel: FunctionComponent<CallingSettingsPanelProps> = ({
  className,
  onBackButtonClick,
  currentLocale,
  showSpinner = false,
  ...props
}) => {
  const content = showSpinner ? (
    <SpinnerOverlay />
  ) : (
    <>
      <CallingSettings {...{ ...props, currentLocale }} />
    </>
  );
  return (
    <div
      data-sign="callingSettings"
      className={classnames(styles.root, className)}
    >
      <BackHeader onBackClick={onBackButtonClick}>
        {i18n.getString('title', currentLocale)}
      </BackHeader>
      <Panel className={styles.content}>{content}</Panel>
    </div>
  );
};
