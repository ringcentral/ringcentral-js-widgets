import type { DNDStatusValueType } from '@ringcentral-integration/commons/modules/Presence';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
import {
  flexCenterStyle,
  palette2,
  RcBox,
  RcList,
  RcListItem,
  RcPresence,
  spacing,
  styled,
} from '@ringcentral/juno';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { getPresenceStatusName } from '../../lib/getPresenceStatusName';
import IconLine from '../IconLine';
import { LinkLine } from '../LinkLine';
import { usePresenceItems } from '../PresenceDropdown/usePresenceItems';
import { SwitchLineItem } from '../SettingsPanel/SwitchLineItem';

import i18n from './i18n';
import styles from './styles.scss';

const StyledList = styled(RcList)`
  background-color: ${palette2('neutral', 'elevation')};

  ${RcListItem} {
    padding-left: ${spacing(5)};
  }
`;

// TODO: when full page refactor, remove this
const StyledPresenceWrap = styled.div`
  ${flexCenterStyle};
  color: ${palette2('neutral', 'f05')};

  ${RcPresence} {
    margin-right: ${spacing(2)};
  }
`;

type PresenceSettingSectionProps = {
  currentLocale: string;
  dndStatus: DNDStatusValueType;
  userStatus: string;
  isCallQueueMember: boolean;
  setAvailable: (...args: any[]) => any;
  setBusy: (...args: any[]) => any;
  setDoNotDisturb: (...args: any[]) => any;
  setInvisible: (...args: any[]) => any;
  toggleAcceptCallQueueCalls: (...args: any[]) => any;
  showPresenceSettings: boolean;
  enableAcceptQueueCallsControl?: boolean;
  showCallQueueManagement?: boolean;
  onCallQueueManagementClick?: () => void;
};

export const PresenceSettingSection: FunctionComponent<
  PresenceSettingSectionProps
> = ({
  showPresenceSettings = false,
  toggleAcceptCallQueueCalls,
  isCallQueueMember,
  dndStatus: dndStatusProp,
  userStatus,
  currentLocale,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  enableAcceptQueueCallsControl = true,
  onCallQueueManagementClick,
}) => {
  const [showSelects, setShowSelects] = useState(showPresenceSettings);

  const toggleShow = () => {
    setShowSelects((prev) => !prev);
  };

  const onCallQueueChange = () => {
    toggleAcceptCallQueueCalls();
  };

  const sectionClass = clsx(
    styles.section,
    showSelects ? styles.showDropdown : null,
  );
  const acceptQueueCalls = isCallQueueMember ? (
    <SwitchLineItem
      dataSign="acceptQueueSwitch"
      tooltip={
        !enableAcceptQueueCallsControl
          ? i18n.getString('callQueueDisabledReason', currentLocale)
          : undefined
      }
      customTitle={i18n.getString('acceptQueueCalls', currentLocale)}
      show
      checked={dndStatusProp === dndStatus.takeAllCalls}
      onChange={onCallQueueChange}
      disabled={
        dndStatusProp === dndStatus.doNotAcceptAnyCalls ||
        !enableAcceptQueueCallsControl
      }
    />
  ) : null;

  const showCallQueueManagement =
    enableAcceptQueueCallsControl &&
    onCallQueueManagementClick &&
    dndStatusProp !== dndStatus.doNotAcceptAnyCalls &&
    dndStatusProp !== dndStatus.doNotAcceptDepartmentCalls;

  const callQueueManagement = showCallQueueManagement ? (
    <LinkLine
      dataSign="callQueueManagementSwitch"
      onClick={onCallQueueManagementClick}
    >
      {i18n.getString('callQueueManagement', currentLocale)}
    </LinkLine>
  ) : null;

  const currentStatus = getPresenceStatusName(
    userStatus as any,
    dndStatusProp as any,
    currentLocale,
  );

  const { elements: presenceElements, selectedItem } = usePresenceItems({
    currentLocale,
    userStatus,
    dndStatus: dndStatusProp,
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
    },
  });
  return (
    <section className={sectionClass}>
      <IconLine
        dataSign="statusToggleShow"
        icon={
          <span className={styles.dropdownIcon}>
            <i className={dynamicsFont.arrow} />
          </span>
        }
        onClick={toggleShow}
        className={styles.iconLine}
      >
        <StyledPresenceWrap>
          <div data-sign="status">
            {i18n.getString('status', currentLocale)}
          </div>
          <RcBox flex="1 1 auto" />
          <RcPresence size="medium" type={selectedItem?.type} />
          <span>{currentStatus}</span>
        </StyledPresenceWrap>
      </IconLine>
      <StyledList className={styles.presenceList}>
        {presenceElements}
      </StyledList>
      {acceptQueueCalls}
      {callQueueManagement}
    </section>
  );
};

// export default class PresenceSettingSection extends Component<
//   PresenceSettingSectionProps,
//   PresenceSettingSectionState
// > {
//   constructor(props) {
//     super(props);
//   }
// }
