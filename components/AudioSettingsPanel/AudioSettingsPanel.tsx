import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import { usePrevious } from '@ringcentral/juno';
import clsx from 'clsx';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'rc-tooltip'
import TooltipBase from 'rc-tooltip';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import InfoIcon from '../../assets/images/Info.svg';
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import { Button } from '../Button';
import { DropdownSelect } from '../DropdownSelect';
import IconLine from '../IconLine';
import InputField from '../InputField';
import Panel from '../Panel';
import { SaveButton } from '../SaveButton';

import { AudioSettingsPanelProps } from './AudioSettingsPanel.interface';
import { VolumeSlider } from './VolumeSlider';
import i18n from './i18n';
import styles from './styles.scss';

// TODO: find a better tooltip solution?
const Tooltip =
  typeof TooltipBase === 'function' ? TooltipBase : TooltipBase.default;

const CheckMicPermission: FC<
  Pick<
    AudioSettingsPanelProps,
    'checkUserMedia' | 'userMedia' | 'currentLocale'
  >
> = ({ checkUserMedia, userMedia, currentLocale }) => {
  if (userMedia) {
    return null;
  }
  return (
    <IconLine
      noBorder
      icon={
        <Button dataSign="checkMicPermission" onClick={checkUserMedia}>
          {i18n.getString('checkMicPermission', currentLocale)}
        </Button>
      }
    >
      {i18n.getString('micNoPermissionMessage', currentLocale)}
    </IconLine>
  );
};

export const getFallbackLabel = (
  devices: OmitFunctions<MediaDeviceInfo>[],
  index: number,
  currentLocale: string,
) => {
  let fallbackLabel = i18n.getString('noLabel', currentLocale);
  if (devices.length > 1) {
    fallbackLabel = `${fallbackLabel} ${index + 1}`;
  }
  return fallbackLabel;
};

export const getDeviceValueRenderer =
  (devices: OmitFunctions<MediaDeviceInfo>[], currentLocale: string) =>
  (value: string | null) => {
    if (value === null) {
      return i18n.getString('noDevice', currentLocale);
    }
    const index = devices.findIndex((device) => device.deviceId === value);
    if (index > -1 && devices[index].label) {
      return devices[index].label;
    }
    return getFallbackLabel(devices, index, currentLocale);
  };

export const getDeviceOptionRenderer =
  (devices: OmitFunctions<MediaDeviceInfo>[], currentLocale: string) =>
  (device: OmitFunctions<MediaDeviceInfo>, index: number) => {
    if (device && device.label) {
      return device.label;
    }
    return getFallbackLabel(devices, index, currentLocale);
  };

const useDeviceRenderers = (
  devices: OmitFunctions<MediaDeviceInfo>[],
  currentLocale: string,
) => {
  return useMemo(
    () =>
      [
        getDeviceValueRenderer(devices, currentLocale),
        getDeviceOptionRenderer(devices, currentLocale),
      ] as const,
    [devices, currentLocale],
  );
};

const deviceValueFunction = (device: OmitFunctions<MediaDeviceInfo>) =>
  device.deviceId;

const OutputDevice: FC<
  Pick<
    AudioSettingsPanelProps,
    | 'availableOutputDevices'
    | 'currentLocale'
    | 'outputDeviceDisabled'
    | 'outputDeviceId'
  > & {
    isFirefox: boolean;
    onChange: (device: OmitFunctions<MediaDeviceInfo>) => void;
  }
> = ({
  availableOutputDevices,
  currentLocale,
  isFirefox,
  onChange,
  outputDeviceDisabled,
  outputDeviceId,
}) => {
  const [deviceValueRenderer, deviceOptionRenderer] = useDeviceRenderers(
    availableOutputDevices,
    currentLocale,
  );
  if (isFirefox && !availableOutputDevices.length) {
    return (
      <InputField
        className={styles.noHeightInputField}
        label={<span>{i18n.getString('outputDevice', currentLocale)}</span>}
        noBorder
      >
        <div className={styles.fakeDropdownContainer}>
          {i18n.getString('defaultOutputDevice', currentLocale)}
        </div>
      </InputField>
    );
  }
  return (
    <InputField
      label={<span>{i18n.getString('outputDevice', currentLocale)}</span>}
      noBorder
    >
      <DropdownSelect
        className={styles.select}
        disabled={outputDeviceDisabled}
        value={availableOutputDevices.length ? outputDeviceId : undefined}
        onChange={onChange}
        options={availableOutputDevices}
        dropdownAlign="left"
        renderFunction={deviceOptionRenderer}
        valueFunction={deviceValueFunction}
        renderValue={deviceValueRenderer}
        titleEnabled
      />
    </InputField>
  );
};

const InputDevice: FC<
  Pick<
    AudioSettingsPanelProps,
    | 'availableInputDevices'
    | 'inputDeviceId'
    | 'inputDeviceDisabled'
    | 'currentLocale'
  > & {
    onChange: (device: OmitFunctions<MediaDeviceInfo>) => void;
    isFirefox: boolean;
  }
> = ({
  availableInputDevices,
  currentLocale,
  inputDeviceDisabled,
  inputDeviceId,
  isFirefox,
  onChange,
}) => {
  const [deviceValueRenderer, deviceOptionRenderer] = useDeviceRenderers(
    availableInputDevices,
    currentLocale,
  );

  const showTooltip =
    availableInputDevices.length > 0
      ? availableInputDevices[0].label === ''
      : isFirefox;

  const tooltipContainer = useRef<HTMLDivElement | null>(null);

  const inputTooltip = showTooltip ? (
    <Tooltip
      placement="bottom"
      trigger="click"
      align={{
        offset: [0, 47],
      }}
      overlay={i18n.getString('noLabelTip', currentLocale)}
      arrowContent={<div className="rc-tooltip-arrow-inner" />}
      getTooltipContainer={() => tooltipContainer.current}
    >
      <InfoIcon width={14} height={14} className={styles.infoIcon} />
    </Tooltip>
  ) : null;
  return (
    <InputField
      label={
        <span>
          {i18n.getString('inputDevice', currentLocale)}
          {inputTooltip}
        </span>
      }
      noBorder
    >
      <DropdownSelect
        className={styles.select}
        disabled={inputDeviceDisabled}
        value={availableInputDevices.length ? inputDeviceId : undefined}
        onChange={onChange}
        options={availableInputDevices}
        dropdownAlign="left"
        renderFunction={deviceOptionRenderer}
        valueFunction={deviceValueFunction}
        renderValue={deviceValueRenderer}
        titleEnabled
      />
      <div
        className={styles.tooltipContainer}
        ref={(el) => {
          tooltipContainer.current = el;
        }}
      />
    </InputField>
  );
};

function useDeviceIdState(
  deviceId: string,
  devices: OmitFunctions<MediaDeviceInfo>[],
) {
  const [deviceIdState, setDeviceIdState] = useState(deviceId);
  const setDeviceState = useCallback(
    (device: OmitFunctions<MediaDeviceInfo>) => {
      setDeviceIdState(device.deviceId);
    },
    [setDeviceIdState],
  );
  const oldDeviceId = usePrevious(() => deviceId, true);
  const oldDevices = usePrevious(() => devices, true);
  useEffect(() => {
    if (deviceId !== oldDeviceId) {
      setDeviceIdState(deviceId);
    }
    if (devices !== oldDevices) {
      if (!devices.find((device) => device.deviceId === deviceIdState)) {
        setDeviceIdState(deviceId);
      }
    }
  }, [oldDeviceId, oldDevices, devices, deviceIdState, deviceId]);

  return [deviceIdState, setDeviceState] as const;
}

const VolumeInput: FC<{
  volume: number;
  minVolume?: number;
  maxVolume?: number;
  onChange: (volume: number) => void;
  label: string;
}> = ({ volume, minVolume, maxVolume, onChange, label }) => {
  return (
    <InputField label={<span>{label}</span>} noBorder>
      <VolumeSlider
        volume={volume}
        onChange={onChange}
        maxVolume={maxVolume}
        minVolume={minVolume}
      />
    </InputField>
  );
};

export const AudioSettingsPanel: FC<AudioSettingsPanelProps> = ({
  availableInputDevices,
  availableOutputDevices,
  callVolume,
  checkUserMedia,
  className = null,
  currentLocale,
  inputDeviceDisabled = false,
  inputDeviceId,
  onBackButtonClick,
  onSave,
  outputDeviceDisabled = false,
  outputDeviceId,
  ringtoneVolume,
  showCallVolume = false,
  showRingToneVolume = false,
  supportDevices,
  userMedia,
}) => {
  // For firefox, when input device have empty label
  // trigger get-user-media to load the device info at the first time
  const triggerCheckUserMedia = useRef<boolean>(false);
  if (!triggerCheckUserMedia.current) {
    triggerCheckUserMedia.current = true;
    if (userMedia && availableInputDevices[0]?.label === '') {
      checkUserMedia();
    }
  }
  const [outputDeviceIdState, setOutputDeviceState] = useDeviceIdState(
    outputDeviceId,
    availableOutputDevices,
  );
  const [inputDeviceIdState, setInputDeviceState] = useDeviceIdState(
    inputDeviceId,
    availableInputDevices,
  );
  const [isFirefox] = useState<boolean>(
    navigator.userAgent.indexOf('Firefox') > -1,
  );

  const [ringtoneVolumeState, setRingtoneVolumeState] =
    useState(ringtoneVolume);
  const [callVolumeState, setCallVolumeState] = useState(callVolume);

  const oldRingtoneVolume = usePrevious(() => ringtoneVolume, true);
  const oldCallVolume = usePrevious(() => callVolume, true);

  useEffect(() => {
    if (ringtoneVolume !== oldRingtoneVolume) {
      setRingtoneVolumeState(ringtoneVolume);
    }
    if (callVolume !== oldCallVolume) {
      setCallVolumeState(callVolume);
    }
  }, [ringtoneVolume, callVolume, oldRingtoneVolume, oldCallVolume]);

  const hasChanges =
    outputDeviceId !== outputDeviceIdState ||
    inputDeviceId !== inputDeviceIdState ||
    ringtoneVolume !== ringtoneVolumeState ||
    callVolume !== callVolumeState;

  const onSaveClick = useCallback(
    () =>
      onSave({
        outputDeviceId: outputDeviceIdState,
        inputDeviceId: inputDeviceIdState,
        ringtoneVolume: ringtoneVolumeState,
        callVolume: callVolumeState,
      }),
    [
      onSave,
      outputDeviceIdState,
      inputDeviceIdState,
      ringtoneVolumeState,
      callVolumeState,
    ],
  );

  return (
    <div className={clsx(styles.root, className)}>
      <PageHeader>
        <PageHeaderBack onClick={onBackButtonClick} />
        <PageHeaderTitle>
          {i18n.getString('title', currentLocale)}
        </PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <Panel className={styles.content}>
        {supportDevices ? (
          <>
            <OutputDevice
              availableOutputDevices={availableOutputDevices}
              currentLocale={currentLocale}
              isFirefox={isFirefox}
              outputDeviceDisabled={outputDeviceDisabled}
              outputDeviceId={outputDeviceIdState}
              onChange={setOutputDeviceState}
            />
            <InputDevice
              availableInputDevices={availableInputDevices}
              currentLocale={currentLocale}
              isFirefox={isFirefox}
              inputDeviceDisabled={inputDeviceDisabled}
              inputDeviceId={inputDeviceIdState}
              onChange={setInputDeviceState}
            />
          </>
        ) : null}
        <CheckMicPermission
          checkUserMedia={checkUserMedia}
          currentLocale={currentLocale}
          userMedia={userMedia}
        />
        {showCallVolume ? (
          <VolumeInput
            volume={callVolumeState}
            label={i18n.getString('callVolume', currentLocale)}
            onChange={setCallVolumeState}
            minVolume={0.1}
          />
        ) : null}
        {showRingToneVolume ? (
          <VolumeInput
            volume={ringtoneVolumeState}
            label={i18n.getString('ringtoneVolume', currentLocale)}
            onChange={setRingtoneVolumeState}
          />
        ) : null}
        <SaveButton
          onClick={onSaveClick}
          disabled={!hasChanges}
          currentLocale={currentLocale}
        />
      </Panel>
    </div>
  );
};
