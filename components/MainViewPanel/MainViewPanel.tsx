import { RcIcon, RcIconProps } from '@ringcentral/juno';
import phoneSvg from '@ringcentral/juno/icon/Phone';
import phoneBorderSvg from '@ringcentral/juno/icon/PhoneBorder';
import TimeSvg from '@ringcentral/juno/icon/Time';
import TimeBorderSvg from '@ringcentral/juno/icon/TimeBorder';
import settingsSvg from '@ringcentral/juno/icon/Settings';
import settingsBorderSvg from '@ringcentral/juno/icon/SettingsBorder';
import classNames from 'classnames';
import React, { FunctionComponent, useMemo } from 'react';
import { TabPropTypes } from 'ringcentral-widgets/components/NavigationBar';
import { Tooltip } from 'ringcentral-widgets/components/Rcui/Tooltip';
import TabNavigationView from 'ringcentral-widgets/components/TabNavigationView';

import offHookSvgConnecting from '../../assets/icons/icon-pvc-connecting.svg';
import offHookSvgDisabled from '../../assets/icons/icon-pvc-disabled.svg';
import offHookSvgDisconnecting from '../../assets/icons/icon-pvc-disconnecting.svg';
import offHookSvgOff from '../../assets/icons/icon-pvc-off.svg';
import offHookSvgOn from '../../assets/icons/icon-pvc-on.svg';
import {
  EvMainViewUIFunctions,
  EvMainViewUIProps,
} from '../../interfaces/EvMainViewUI.interface';
import i18n from './i18n';
import styles from './styles.scss';
import { WorkingStateSelect } from './WorkingStateSelect';

export type MainViewPanelProps = EvMainViewUIProps & EvMainViewUIFunctions;

const CustomIcon: FunctionComponent<RcIconProps> = (props) => {
  return <RcIcon className={styles.icon} {...props} />;
};

const MainViewPanel: FunctionComponent<MainViewPanelProps> = ({
  currentPath,
  goTo,
  agentStates,
  changeWorkingState,
  currentStateIndex,
  getStateColor,
  handleWithIntervalTime,
  stateText,
  time,
  getTimerText,
  disabled,
  children,
  currentLocale,
  isOffHookDisable,
  offhookState,
  offhook,
  isWide,
  isOffhooking,
  hideOffHookBtn,
}) => {
  const tabs: TabPropTypes[] = [
    {
      icon: () => <CustomIcon symbol={phoneBorderSvg} />,
      activeIcon: () => <CustomIcon symbol={phoneSvg} />,
      label: i18n.getString('dialpadLabel', currentLocale),
      path: '/dialer',
      isActive: (currentPath) =>
        currentPath === '/dialer' || /^\/activityCallLog/.test(currentPath),
      className: styles.tab,
    },
    {
      icon: () => <CustomIcon symbol={TimeBorderSvg} />,
      activeIcon: () => <CustomIcon symbol={TimeSvg} />,
      label: i18n.getString('historyLabel', currentLocale),
      path: '/history',
      isActive: (currentPath) => /^\/history/.test(currentPath),
      className: styles.tab,
    },
    {
      icon: () => <CustomIcon symbol={settingsBorderSvg} />,
      activeIcon: () => <CustomIcon symbol={settingsSvg} />,
      label: i18n.getString('settingsLabel', currentLocale),
      path: '/settings',
      isActive: (currentPath) => /^\/settings/.test(currentPath),
      className: styles.tab,
    },
  ];

  const offHookIcon = useMemo(() => {
    let className;
    let symbol;
    let title;
    if (isOffHookDisable && !isOffhooking) {
      className = styles.offHookIcon;
      symbol = offHookSvgDisabled;
      title = i18n.getString('disabled', currentLocale);
    } else {
      switch (offhookState) {
        case 'connecting':
          className = styles.loading;
          symbol = offHookSvgConnecting;
          title = i18n.getString('disabled', currentLocale);
          break;
        case 'disconnecting':
          className = styles.loading;
          symbol = offHookSvgDisconnecting;
          title = i18n.getString('disabled', currentLocale);
          break;
        case 'disconnected':
          className = styles.offHookIcon;
          symbol = offHookSvgOff;
          title = i18n.getString('turnOn', currentLocale);
          break;
        case 'connected':
        default:
          className = styles.offHookIcon;
          symbol = offHookSvgOn;
          title = i18n.getString('turnOff', currentLocale);
      }
    }
    return (
      <Tooltip title={title}>
        <RcIcon className={className} symbol={symbol} />
      </Tooltip>
    );
  }, [offhookState, isOffHookDisable]);

  return (
    <TabNavigationView
      goTo={goTo}
      currentPath={currentPath}
      tabNavigationViewClassName={styles.tabNavigationView}
      navBarClassName={styles.navigationBar}
      className={styles.mainView}
      tabs={tabs}
    >
      <div className={styles.header}>
        <WorkingStateSelect
          handleWithIntervalTime={handleWithIntervalTime}
          getTimerText={getTimerText}
          time={time}
          stateText={stateText}
          getStateColor={getStateColor}
          currentStateIndex={currentStateIndex}
          changeWorkingState={changeWorkingState}
          agentStates={agentStates}
          disabled={disabled}
          isWide={isWide}
          hideOffHookBtn={hideOffHookBtn}
        />
        {!hideOffHookBtn && (
          <div
            className={classNames([
              styles.offHookState,
              isOffHookDisable ? styles.disabled : styles.enabled,
            ])}
            onClick={isOffHookDisable ? null : offhook}
          >
            {offHookIcon}
          </div>
        )}
      </div>
      {children}
    </TabNavigationView>
  );
};

export { MainViewPanel };
