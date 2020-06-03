import React, { FunctionComponent } from 'react';
import BackHeader from 'ringcentral-widgets/components/BackHeaderV2';
import classNames from 'classnames';

import {
  EvActiveCallListUIFunctions,
  EvActiveCallListUIProps,
} from '../../interfaces';
import {
  HandUpButton,
  HoldCallButton,
} from '../SmallCallControl';
import i18n from './i18n';
import styles from './styles.scss';

export type ActiveCallListPanelProps = EvActiveCallListUIProps &
  EvActiveCallListUIFunctions;

const ActiveCallListPanel: FunctionComponent<ActiveCallListPanelProps> = ({
  currentLocale,
  goBack,
  callList,
  onHangup,
  onUnHold,
  onHold,
}) => {
  return (
    <>
      <BackHeader
        currentLocale={currentLocale}
        title={i18n.getString('activeCall', currentLocale)}
        onBackClick={goBack}
        className={styles.backHeader}
      />
      <div className={styles.list} data-sign="callList">
        {callList.map((callItem, key) => {
          const index = key > 1 ? 2 : key;
          const infos = [
            <span className={styles.emphasisCallInfo}>
              {i18n.getString('everyone', currentLocale)}
            </span>,
            <span
              className={classNames(styles.emphasisCallInfo, styles.children)}
            >
              {i18n.getString('justMe', currentLocale)}
            </span>,
            <div className={classNames(styles.otherCallInfo, styles.children)}>
              <span className={styles.name}>
                {callItem.session.transferSessions?.[callItem.session.sessionId]
                  ?.destination ?? null}
              </span>
              {/* TODO: add phoneFormat in ev native render logic */}
              <span className={styles.phoneNumber} />
            </div>,
          ];
          return (
            <div className={styles.item} data-sign="callItem" key={key}>
              <div className={styles.info}>{infos[index]}</div>
              <div className={styles.controlButtons}>
                <div className={classNames(styles.button, styles.hide)} />
                {key > 0 ? (
                  <HoldCallButton
                    currentLocale={currentLocale}
                    isOnHold={callItem.isHold}
                    onUnHold={() => onUnHold(callItem)}
                    onHold={() => onHold(callItem)}
                    className={styles.button}
                    size="small"
                  />
                ) : (
                  <div className={classNames(styles.button, styles.hide)} />
                )}
                <HandUpButton
                  currentLocale={currentLocale}
                  onHangup={() => onHangup(callItem)}
                  className={styles.button}
                  size="small"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { ActiveCallListPanel };
