/* eslint-disable react/destructuring-assignment */
import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { callingOptions } from '@ringcentral-integration/micro-phone/src/app/services/CallingSettings/callingOptions';
import {
  PageHeader,
  SelectableTextField,
} from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { InfoMd } from '@ringcentral/spring-icon';
import {
  FormLabel,
  Icon,
  Option,
  Select,
  Switch,
  Tooltip,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { CallingSettingsPanelProps } from '../CallingSettings.view.interface';

import type {
  CallWithProps,
  GetCallingOptionNameProps,
} from './CallingSettingsPenal.interface';
import i18n, { t } from './i18n';

interface TooltipProps {
  callWith: string;
  softphoneAppName: string;
  jupiterAppName: string;
}

export function getCallingOptionName({
  callingOption,
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
  return t('browser');
}

export function getCallingOptionTooltip({
  callWith,
  softphoneAppName,
  jupiterAppName,
}: TooltipProps) {
  if (callWith === callingOptions.browser) {
    return t('browserTooltip');
  }
  if (callWith === callingOptions.softphone) {
    return t('softphoneTooltip', { appName: softphoneAppName });
  }
  if (callWith === callingOptions.jupiter) {
    return t('jupiterTooltip', { appName: jupiterAppName });
  }

  // ringout
  return t('ringoutTooltip');
}

const CallWithSettings: FunctionComponent<CallWithProps> = ({
  callWith,
  callWithOptions,
  disabled,
  onCallWithChange,
  softphoneAppName,
  jupiterAppName,
}) => {
  const { t } = useLocale(i18n);

  const valueRenderer = (option: string) => {
    const optionName = getCallingOptionName({
      callingOption: option,
      jupiterAppName,
      softphoneAppName,
    });
    return <span data-sign={`selected_${optionName}`}>{optionName}</span>;
  };

  const optionRenderer = (option: string) => {
    const optionName = getCallingOptionName({
      callingOption: option,
      jupiterAppName,
      softphoneAppName,
    });
    return <span data-sign={`option_${optionName}`}>{optionName}</span>;
  };

  const TooltipContent = getCallingOptionTooltip({
    callWith,
    softphoneAppName,
    jupiterAppName,
  });

  return (
    <Select
      label={
        <span
          data-sign="callSettingInfo"
          className="flex items-center gap-1 mb-3"
        >
          {t('makeCallsWith')}
          <Tooltip
            classes={{
              // allow line break with \n
              content: 'whitespace-pre-wrap',
            }}
            title={TooltipContent}
          >
            <Icon
              size="small"
              data-sign="callSettingInfoIcon"
              symbol={InfoMd}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </Tooltip>
        </span>
      }
      data-sign="callingSetting"
      value={callWith}
      renderValue={valueRenderer}
      size="large"
      variant="outlined"
      disabled={disabled}
      onChange={(e) => onCallWithChange(e.target.value)}
    >
      {callWithOptions.map((option) => (
        <Option data-sign="selectMenuItem" key={option} value={option}>
          {optionRenderer(option)}
        </Option>
      ))}
    </Select>
  );
};

// TODO: properly type available numbers

interface RingoutSettingsProps {
  availableNumbersWithLabel: { label: string; value: string }[];
  locationSearchable: boolean;
  myLocation: string;
  onMyLocationChange: (newMyLocation: string) => void;
  disabled: boolean;
  ringoutPrompt: boolean;
  onRingoutPromptChange: (newRingoutPrompt: boolean) => void;
}
const RingoutSettings: FunctionComponent<RingoutSettingsProps> = ({
  availableNumbersWithLabel,
  locationSearchable,
  myLocation,
  onMyLocationChange,
  disabled,
  ringoutPrompt,
  onRingoutPromptChange,
}) => {
  const { t } = useLocale(i18n);

  return (
    <div>
      <div className="py-4 typography-mainText">{t('ringoutHint')}</div>
      <SelectableTextField
        RootProps={{
          'data-sign': 'myLocation',
        }}
        classes={{
          label: 'mb-3',
        }}
        size="large"
        data-sign="myLocationInput"
        label={t('myLocationLabel')}
        options={availableNumbersWithLabel}
        value={myLocation}
        onChange={onMyLocationChange}
        maxLength={30}
        data-sig="myLocationInput"
        disabled={disabled}
        searchable={locationSearchable}
        freeSoloOptionLabel={t('custom')}
      />
      <FormLabel
        label={
          <span className="typography-mainText">
            {t('press1ToStartCallLabel')}
          </span>
        }
        placement="start"
        className="mt-4"
      >
        <Switch
          className="flex-none"
          data-sign="ringoutPromptToggle"
          checked={ringoutPrompt}
          onChange={(e) => onRingoutPromptChange(e.target.checked)}
        />
      </FormLabel>
    </div>
  );
};

export const CallingSettingsPanel: FunctionComponent<
  CallingSettingsPanelProps
> = (props) => {
  const {
    className,
    onBackButtonClick,
    availableNumbersWithLabel,
    callWith,
    defaultRingoutPrompt = true,
    disabled = false,
    locationSearchable = false,
    myLocation,
    onSave,
    ringoutPrompt,
  } = props;

  const [callWithState, setCallWithState] = useAsyncState(callWith, (val) => {
    onSave({ callWith: val });
  });
  const [ringoutPromptState, setRingoutPromptState] = useAsyncState(
    ringoutPrompt,
    (val) => {
      onSave({ ringoutPrompt: val });
    },
  );
  const [myLocationState, setMyLocationState] = useAsyncState(
    myLocation,
    (val) => {
      onSave({
        myLocation: val,
      });
    },
  );
  const { t } = useLocale(i18n);

  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={onBackButtonClick}>{t('title')}</PageHeader>
      </AppHeaderNav>

      <div
        data-sign="callingSettings"
        className={clsx(
          'flex-auto overflow-y-auto overflow-x-hidden px-4 py-2',
          className,
        )}
      >
        <CallWithSettings
          {...props}
          callWith={callWithState}
          onCallWithChange={(newCallWith: string) => {
            setCallWithState(newCallWith);
            if (newCallWith === callWith) {
              setMyLocationState(myLocation);
              setRingoutPromptState(ringoutPrompt);
            } else {
              // * when callWith changed, set myLocation to be the first available number
              setMyLocationState(availableNumbersWithLabel?.[0]?.value || '');
              setRingoutPromptState(defaultRingoutPrompt);
            }
          }}
        />
        {callWithState === callingOptions.ringout && (
          <RingoutSettings
            {...{
              availableNumbersWithLabel,
              locationSearchable,
              myLocation: myLocationState,
              onMyLocationChange: setMyLocationState,
              ringoutPrompt: ringoutPromptState,
              onRingoutPromptChange: setRingoutPromptState,
              disabled,
            }}
          />
        )}
      </div>

      <AppFooterNav />
    </>
  );
};
