import type { DNDStatusValueType } from '@ringcentral-integration/commons/modules/Presence';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
import {
  Line,
  LinkLine,
  usePresenceItems,
  usePresenceText,
} from '@ringcentral-integration/next-widgets/components';
import { CaretDownMd, CaretUpMd, InfoMd } from '@ringcentral/spring-icon';
import {
  Icon,
  Menu,
  StatusIndicator,
  Switch,
  Tooltip,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React, { useRef, useState } from 'react';

import { t } from './i18n';

type PresenceSettingProps = {
  dndStatus: DNDStatusValueType;
  presenceStatus: string;
  isCallQueueMember: boolean;
  setAvailable: (...args: any[]) => any;
  setBusy: (...args: any[]) => any;
  setDoNotDisturb: (...args: any[]) => any;
  setInvisible: (...args: any[]) => any;
  toggleAcceptCallQueueCalls: (...args: any[]) => any;
  showPresenceSettings: boolean;
  enableAcceptQueueCallsControl: boolean;
  onCallQueueManagementClick?: () => void;
};

export const PresenceSetting: FunctionComponent<PresenceSettingProps> = ({
  showPresenceSettings = false,
  toggleAcceptCallQueueCalls,
  isCallQueueMember,
  dndStatus: dndStatusProp,
  presenceStatus,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  enableAcceptQueueCallsControl,
  onCallQueueManagementClick,
}) => {
  const [showSelects, setShowSelects] = useState(showPresenceSettings);
  const [statusAnchor, setStatusAnchor] = useState<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggleShow = () => {
    setShowSelects((prev) => !prev);
  };

  const onCallQueueChange = () => {
    toggleAcceptCallQueueCalls();
  };

  const acceptQueueCalls = isCallQueueMember ? (
    <Line
      data-sign="acceptQueueSwitch"
      endAdornment={
        <Switch
          data-sign="switch"
          disabled={
            dndStatusProp === dndStatus.doNotAcceptAnyCalls ||
            !enableAcceptQueueCallsControl
          }
          checked={dndStatusProp === dndStatus.takeAllCalls}
          onChange={onCallQueueChange}
        />
      }
    >
      {t('acceptQueueCalls')}
      {!enableAcceptQueueCallsControl ? (
        <Tooltip
          color="neutral"
          placement="bottom"
          title={t('callQueueDisabledReason')}
        >
          <Icon size="small" symbol={InfoMd} data-sign={`call-queue-info`} />
        </Tooltip>
      ) : null}
    </Line>
  ) : null;

  // don't show the management if dnd or do not accept department calls
  const showCallQueueManagement =
    enableAcceptQueueCallsControl &&
    onCallQueueManagementClick &&
    dndStatusProp !== dndStatus.doNotAcceptAnyCalls &&
    dndStatusProp !== dndStatus.doNotAcceptDepartmentCalls;
  const callQueueManagement = showCallQueueManagement ? (
    <LinkLine
      data-sign="callQueueManagement"
      onClick={onCallQueueManagementClick}
    >
      {t('callQueueManagement')}
    </LinkLine>
  ) : null;

  const currentStatus = usePresenceText({
    presenceStatus,
    dndStatus: dndStatusProp,
  });

  const { elements: presenceElements, selectedItem } = usePresenceItems({
    presenceStatus,
    dndStatus: dndStatusProp,
    divider: false,
    onChange: (type) => {
      switch (type) {
        case 'available':
          setAvailable();
          break;
        case 'busy':
          setBusy();
          break;
        case 'DND':
          setDoNotDisturb();
          break;
        case 'offline':
          setInvisible();
          break;
        default:
          break;
      }
      setStatusAnchor(null);
      setShowSelects(false);
    },
  });

  return (
    <>
      <Line
        data-sign="statusToggleShow"
        classes={{
          endAdornment: 'max-w-max',
        }}
        endAdornment={
          <span className="flex gap-2 items-center">
            <StatusIndicator size="medium" variant={selectedItem?.variant} />
            <span
              data-sign="status"
              className="typography-mainText text-nowrap"
            >
              {currentStatus}
            </span>
            <Icon
              data-sign="dropdownIcon"
              ref={iconRef}
              symbol={showSelects ? CaretUpMd : CaretDownMd}
            />
          </span>
        }
        onClick={() => {
          setStatusAnchor(showSelects ? null : iconRef.current);
          toggleShow();
        }}
        className="cursor-pointer gap-2"
      >
        <div data-sign="label" className="text-neutral-b1 truncate">
          {t('status')}
        </div>
      </Line>
      <Menu
        open={Boolean(statusAnchor)}
        anchorEl={statusAnchor}
        onClose={() => {
          setStatusAnchor(null);
          setShowSelects(false);
        }}
      >
        {presenceElements}
      </Menu>
      {acceptQueueCalls}
      {callQueueManagement}
    </>
  );
};
