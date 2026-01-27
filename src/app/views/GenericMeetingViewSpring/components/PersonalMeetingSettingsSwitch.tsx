import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Block, Switch, Link } from '@ringcentral/spring-ui';
import React from 'react';

import i18n from '../i18n';

import {
  PersonalMeetingSettingsSwitchProps,
  PersonalMeetingSettingsSwitchFunctions,
} from './PersonalMeetingSettingsSwitch.interface';

export const PersonalMeetingSettingsSwitch: React.FC<
  PersonalMeetingSettingsSwitchProps & PersonalMeetingSettingsSwitchFunctions
> = ({
  isPersonalMeetingEnabled,
  personalMeetingLink,
  disabled,
  onPersonalMeetingToggle,
  viewPersonalMeetingSettings,
}) => {
  const { t } = useLocale(i18n);

  return (
    <Block
      bordered
      borderRadius="small"
      padding
      className="w-full mx-auto"
      classes={{
        root: 'overflow-visible',
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex gap-3">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="typography-subtitleMini text-neutral-b1">
              {t('usePersonalMeetingLink')}
            </div>
            <div className="flex flex-col gap-1 break-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="typography-descriptor text-neutral-b2 mt-1">
                    {personalMeetingLink}
                  </div>
                </div>
              </div>
              {isPersonalMeetingEnabled && (
                <Link
                  onClick={viewPersonalMeetingSettings}
                  data-sign="editPersonalMeetingSettings"
                >
                  <div className="typography-descriptorMini">
                    {t('editSettings')}
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Switch
              checked={isPersonalMeetingEnabled}
              onChange={(e) => onPersonalMeetingToggle(e.target.checked)}
              disabled={disabled}
              data-sign="usePersonalMeetingId"
            />
          </div>
        </div>
      </div>
    </Block>
  );
};
