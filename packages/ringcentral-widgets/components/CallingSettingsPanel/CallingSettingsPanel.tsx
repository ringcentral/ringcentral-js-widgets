/* eslint-disable react/destructuring-assignment */
import React, {
  FunctionComponent,
  useState,
  ReactNode,
  useRef,
  MutableRefObject,
  ChangeEvent,
  useEffect,
} from 'react';
import classnames from 'classnames';
import formatMessage from 'format-message';

import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import TooltipBase from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import InfoIcon from '../../assets/images/Info.svg';

import styles from './styles.scss';
import i18n from './i18n';

import SpinnerOverlay from '../SpinnerOverlay';
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
} from './CallingSettingsPenal.interface';

const TooltipBaseComp =
  typeof TooltipBase === 'function' ? TooltipBase : TooltipBase.default;

const checkIsRcBrand = (brand) =>
  brand &&
  typeof brand === 'string' &&
  brand.toLowerCase().indexOf('ringcentral') !== -1;

const getJupiterAppName = (brand) => {
  const isRcBrand = checkIsRcBrand(brand);
  if (isRcBrand) return `${brand} App`;
  return brand;
};

const getSoftphoneAppName = (brand) => {
  const isRcBrand = checkIsRcBrand(brand);
  if (isRcBrand) return `${brand} Phone`;
  return brand;
};
interface CallWithProps {
  callWithOptions: string[];
  disabled: boolean;
  brand: string;
  callWith: string;
  onCallWithChange: (newCallWith: string) => void;
}
interface TooltipProps {
  brand: string;
  callWith: string;
  currentLocale: string;
  tooltipContainerRef: MutableRefObject<ReactNode>;
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  brand,
  callWith,
  currentLocale,
  tooltipContainerRef,
}) => {
  const keys = [`${callWith}Tooltip`];
  if (
    callWith !== callingOptions.browser &&
    callWith !== callingOptions.softphone &&
    callWith !== callingOptions.jupiter
  ) {
    keys.push(`${callWith}Tooltip1`);
  }
  let appName = brand;
  if (callWith === callingOptions.jupiter) {
    appName = getJupiterAppName(brand);
  }
  if (callWith === callingOptions.softphone) {
    appName = getSoftphoneAppName(brand);
  }
  const overlay = (
    <div>
      {keys.map((key) => (
        <div key={key}>
          {formatMessage(i18n.getString(key, currentLocale), {
            brand: appName,
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
  callWith,
  callWithOptions,
  currentLocale,
  disabled,
  onCallWithChange,
  brand,
}) => {
  const tooltipContainerRef = useRef(null);
  const optionRenderer = (option) => {
    let appName = brand;
    if (option === callingOptions.softphone) {
      appName = getSoftphoneAppName(brand);
    }
    if (option === callingOptions.jupiter) {
      appName = getJupiterAppName(brand);
    }
    return formatMessage(i18n.getString(option, currentLocale), {
      brand:
        option === callingOptions.myphone
          ? brand.replace(/\sPhone$/, '')
          : appName,
    });
  };

  return (
    <InputField
      label={
        <span>
          {i18n.getString('makeCallsWith', currentLocale)}
          <Tooltip
            {...{
              brand,
              callWith,
              currentLocale,
              tooltipContainerRef,
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
  availableNumbers: any;
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
  availableNumbers,
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
          {availableNumbers[callWith] ? (
            <DropdownSelect
              className={classnames(styles.select, styles.locationSelect)}
              value={myLocation}
              onChange={onMyLocationChange}
              searchOption={
                locationSearchable
                  ? (option, text) => option.includes(text)
                  : null
              }
              options={availableNumbers[callWith]}
              disabled={disabled}
              dropdownAlign="left"
              titleEnabled
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
  availableNumbers,
  brand,
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
          brand,
          callWith: callWithState,
          callWithOptions,
          currentLocale,
          disabled,
          onCallWithChange: (newCallWith: string) => {
            setCallWithState(newCallWith);
            if (newCallWith === callWith) {
              setMyLocationState(myLocation);
              setRingoutPromptState(ringoutPrompt);
            } else {
              setMyLocationState(availableNumbers[newCallWith]?.[0] || '');
              setRingoutPromptState(defaultRingoutPrompt);
            }
          },
        }}
      />
      <RingoutSettings
        {...{
          currentLocale,
          callWith: callWithState,
          availableNumbers,
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
              incomingAudio: incomingAudioState,
              incomingAudioFile: incomingAudioFileState,
              outgoingAudio: outgoingAudioState,
              outgoingAudioFile: outgoingAudioFileState,
            });
          },
          disabled:
            callWithState === callWith &&
            myLocationState === myLocation &&
            ringoutPromptState === ringoutPrompt &&
            incomingAudioState === incomingAudio &&
            incomingAudioFileState === incomingAudioFile &&
            outgoingAudioState === outgoingAudio &&
            outgoingAudioFileState === outgoingAudioFile,
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
