import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { RcMenuItem, RcMenuList, RcPopover, styled } from '@ringcentral/juno';
import { Ignore, Voicemail } from '@ringcentral/juno/icon';
import classnames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';

import AnswerIcon from '../../assets/images/Answer.svg';
import EndAnswerIcon from '../../assets/images/EndAnswer.svg';
import ForwardIcon from '../../assets/images/Forward_white.svg';
import HoldAnswerIcon from '../../assets/images/HoldAnswer.svg';
import CircleButton from '../CircleButton';
import i18n from './i18n';
import styles from './styles.scss';
import { WebRTCNotificationProps } from './WebRTCNotificationSection.interface';

const ForwardActiveList = styled.div`
  max-width: 170px;
`;

export const WebRTCNotificationSection: FunctionComponent<WebRTCNotificationProps> = ({
  call,
  onCloseNotification,
  currentNotificationIdentify,
  logName,
  currentLocale,
  formatPhone,
  isWide,
  onIgnore,
  endAndAnswer,
  holdAndAnswer,
  toVoicemail,
  hasActiveSession,
  answer,
  forwardingNumbers,
  onForward,
  clickForwardTrack = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (currentNotificationIdentify) {
      const { result } = call;
      if (result) {
        onCloseNotification();
      }
    }
  }, [call.result]);

  const renderLogSection = () => {
    const { direction, to, from, telephonySessionId } = call;
    const number =
      direction === callDirections.outbound
        ? to && (to.phoneNumber || to.extensionNumber)
        : from && (from.phoneNumber || from.extensionNumber);
    const formatNumber = formatPhone(number);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      clickForwardTrack();
      setAnchorEl(event.currentTarget);
    };
    return (
      <div className={styles.layer}>
        <div
          data-sign="inboundNotification"
          className={classnames(
            !isWide ? styles.classic : null,
            styles.content,
          )}
        >
          <div title={logName} className={styles.contact}>
            {logName}
          </div>
          <div className={styles.number}>{formatNumber}</div>
          <div className={styles.control}>
            <ul
              className={classnames(styles.buttonsGroup, {
                [styles.singleCallCtrl]: !hasActiveSession,
              })}
            >
              <li className={styles.callButton}>
                <CircleButton
                  dataSign="ignore"
                  icon={Ignore}
                  iconWidth={250}
                  iconHeight={250}
                  iconX={125}
                  iconY={125}
                  className={styles.button}
                  onClick={() => onIgnore(telephonySessionId)}
                />
                <span
                  title={i18n.getString('ignore', currentLocale)}
                  className={styles.firstLineText}
                >
                  {i18n.getString('ignore', currentLocale)}
                </span>
              </li>
              <li className={styles.callButton}>
                <CircleButton
                  dataSign={!anchorEl ? 'forward' : 'forwardActive'}
                  icon={ForwardIcon}
                  className={styles.button}
                  onClick={handleClick}
                />
                <span
                  title={i18n.getString('forward', currentLocale)}
                  className={styles.firstLineText}
                >
                  {i18n.getString('forward', currentLocale)}
                </span>
              </li>
              {!isWide && hasActiveSession && (
                <li className={classnames(styles.callButton, styles.voicemail)}>
                  <CircleButton
                    dataSign="toVoiceMail"
                    icon={Voicemail}
                    className={classnames(styles.button, styles.hangup)}
                    showBorder={false}
                    iconWidth={250}
                    iconHeight={250}
                    iconX={125}
                    iconY={125}
                    onClick={() => toVoicemail(telephonySessionId)}
                  />
                  <span
                    title={i18n.getString('toVoicemail', currentLocale)}
                    className={styles.firstLineText}
                  >
                    {i18n.getString('toVoicemail', currentLocale)}
                  </span>
                </li>
              )}
            </ul>
            <ul className={styles.buttonsGroup}>
              {!hasActiveSession && (
                <li
                  className={classnames(styles.callButton, styles.answerButton)}
                >
                  <CircleButton
                    dataSign="answer"
                    icon={AnswerIcon}
                    className={classnames(styles.button, styles.answer)}
                    showBorder={false}
                    onClick={() => answer(telephonySessionId)}
                  />
                  <span
                    title={i18n.getString('answer', currentLocale)}
                    className={styles.secondLineText}
                  >
                    {i18n.getString('answer', currentLocale)}
                  </span>
                </li>
              )}
              {hasActiveSession && (
                <li className={styles.callButton}>
                  <CircleButton
                    dataSign="endAndAnswer"
                    icon={EndAnswerIcon}
                    className={classnames(styles.button, styles.multipleButton)}
                    showBorder={false}
                    iconWidth={500}
                    iconHeight={500}
                    iconX={0}
                    iconY={0}
                    onClick={() => endAndAnswer(telephonySessionId)}
                  />
                  <span
                    title={i18n.getString('endAndAnswer', currentLocale)}
                    className={styles.secondLineText}
                  >
                    {i18n.getString('endAndAnswer', currentLocale)}
                  </span>
                </li>
              )}
              {(isWide || !hasActiveSession) && (
                <li className={styles.callButton}>
                  <CircleButton
                    dataSign="toVoiceMail"
                    icon={Voicemail}
                    className={classnames(styles.button, styles.hangup)}
                    showBorder={false}
                    iconWidth={250}
                    iconHeight={250}
                    iconX={125}
                    iconY={125}
                    onClick={() => toVoicemail(telephonySessionId)}
                  />
                  <span
                    title={i18n.getString('toVoicemail', currentLocale)}
                    className={styles.secondLineText}
                  >
                    {i18n.getString('toVoicemail', currentLocale)}
                  </span>
                </li>
              )}
              {hasActiveSession && (
                <li className={styles.callButton}>
                  <CircleButton
                    dataSign="holdAndAnswer"
                    icon={HoldAnswerIcon}
                    className={classnames(styles.button, styles.multipleButton)}
                    showBorder={false}
                    iconWidth={500}
                    iconHeight={500}
                    iconX={0}
                    iconY={0}
                    onClick={() => holdAndAnswer(telephonySessionId)}
                  />
                  <span
                    title={i18n.getString('holdAndAnswer', currentLocale)}
                    className={styles.secondLineText}
                  >
                    {i18n.getString('holdAndAnswer', currentLocale)}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderForwardList = () => {
    const handleClose = () => {
      setAnchorEl(null);
    };
    const forward = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      handleClose();
      // TODO: check that type, should switch to getAttribute
      const selectedValue = e.currentTarget.attributes['data-value'].value;
      onForward(selectedValue, call?.telephonySessionId);
    };
    const forwardList = forwardingNumbers.map((phoneNumber) => {
      return {
        key: phoneNumber.phoneNumber,
        text: phoneNumber.label,
        subText: phoneNumber.phoneNumber,
        onClick: forward,
      };
    });
    forwardList.push({
      key: 'custom',
      text: i18n.getString('custom', currentLocale),
      subText: null,
      onClick: forward,
    });
    return (
      <RcPopover
        anchorOrigin={{
          vertical: 'center',
          horizontal: isWide ? 'left' : 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: isWide ? 'right' : 'center',
        }}
        marginThreshold={isWide ? 0 : 15}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => handleClose()}
        classes={{ paper: styles.forwardPopover }}
      >
        <ForwardActiveList data-sign="forwardActiveList">
          <RcMenuList>
            {forwardList.map(({ text, subText, onClick, key }) => (
              <RcMenuItem key={key} onClick={onClick} data-value={key}>
                <div className={styles.moreActionItem} data-sign={key}>
                  {text && <span className={styles.actionText}>{text}</span>}
                  {subText && (
                    <span className={styles.subText}>{subText} </span>
                  )}
                </div>
              </RcMenuItem>
            ))}
          </RcMenuList>
        </ForwardActiveList>
      </RcPopover>
    );
  };
  return (
    <>
      {renderLogSection()}
      {renderForwardList()}
    </>
  );
};
