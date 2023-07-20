import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import classnames from 'classnames';

import { RcMenuItem, RcMenuList, RcPopover, RcText } from '@ringcentral/juno';
import {
  Ignore as IgnoreIcon,
  ArrowRight,
  Forwardcall,
  Forwarding as ReplyIcon,
} from '@ringcentral/juno-icon';

import MoreIcon from '../../../assets/images/MoreIcon.svg';
import CircleButton from '../../CircleButton';
import i18n from '../i18n';
import rootStyles from '../styles.scss';
import type { MoreActionWithIncomingCallProps } from './MoreActionWithIncomingCall.interface';
import styles from './styles.scss';
import {
  StyledArrowIcon,
  StyledActionIcon,
  StyledMenuList,
  StyledReplyIcon,
} from './StyledMoreAction';

const MoreActionWithIncomingCall: FunctionComponent<MoreActionWithIncomingCallProps> =
  (props) => {
    const {
      disabled,
      currentLocale,
      forwardingNumbers,
      forward,
      ignore,
      reply,
      clickForwardTrack,
      enableReply,
      isWebRTCNotification = false,
      disableIgnore,
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [forwardListEl, setForwardListEl] = useState(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // @ts-expect-error TS(2345): Argument of type 'EventTarget & HTMLButtonElement'... Remove this comment to see the full error message
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleForwardListClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      clickForwardTrack();
      // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
      setForwardListEl(event.currentTarget.children?.[0]);
    };
    const handleForwardListClose = () => {
      setForwardListEl(null);
    };

    const onForward = (event: React.MouseEvent<HTMLButtonElement>) => {
      // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
      const selectedValue = event.currentTarget.attributes['data-value'].value;
      if (selectedValue === 'custom') {
        setForwardListEl(null);
        setAnchorEl(null);
      }
      forward(selectedValue);
    };
    return (
      <>
        <span title={i18n.getString('more', currentLocale)}>
          <CircleButton
            dataSign="more"
            icon={MoreIcon}
            onClick={handleClick}
            className={classnames(
              isWebRTCNotification
                ? styles.webRTCNotificationButton
                : styles.button,
              {
                [styles.buttonDisabled]: disabled,
                [rootStyles.rootButtonActive]: !!anchorEl,
              },
            )}
          />
        </span>
        <RcPopover
          open={!!anchorEl}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <StyledMenuList data-sign="moreList">
            <RcMenuItem
              // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
              onClick={handleForwardListClick}
              data-sign="forward"
            >
              <StyledActionIcon
                symbol={Forwardcall}
                color="neutral.l04"
                size="xsmall"
              />

              <RcText color="neutral.f06" variant="body1">
                {i18n.getString('forward', currentLocale)}
              </RcText>

              <StyledArrowIcon
                color="neutral.l04"
                size="medium"
                symbol={ArrowRight}
                variant="plain"
              />
            </RcMenuItem>
            {enableReply && (
              <RcMenuItem
                onClick={() => {
                  handleClose();
                  reply?.();
                }}
                data-sign="reply"
              >
                <StyledReplyIcon
                  symbol={ReplyIcon}
                  color="neutral.l04"
                  size="xsmall"
                />

                <RcText color="neutral.f06" variant="body1">
                  {i18n.getString('reply', currentLocale)}
                </RcText>

                <StyledArrowIcon
                  color="neutral.l04"
                  size="medium"
                  symbol={ArrowRight}
                  variant="plain"
                />
              </RcMenuItem>
            )}
            {ignore && (
              <RcMenuItem
                disabled={disableIgnore}
                onClick={ignore}
                data-sign="ignore"
              >
                <StyledActionIcon
                  symbol={IgnoreIcon}
                  color="neutral.l04"
                  size="xsmall"
                />

                <RcText color="neutral.f06" variant="body1">
                  {i18n.getString('ignore', currentLocale)}
                </RcText>
              </RcMenuItem>
            )}
          </StyledMenuList>
        </RcPopover>
        <RcPopover
          open={!!forwardListEl}
          onClose={handleForwardListClose}
          anchorEl={forwardListEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <RcMenuList classes={{ root: styles.forwardMenuList }}>
            {[
              ...forwardingNumbers,
              {
                phoneNumber: 'custom',
                label: i18n.getString('custom', currentLocale),
              },
            ].map((item) => {
              const isCustomOption = item.phoneNumber === 'custom';
              return (
                <RcMenuItem
                  // @ts-expect-error TS(2322): Type '(event: React.MouseEvent<HTMLButtonElement>)... Remove this comment to see the full error message
                  onClick={onForward}
                  key={item.phoneNumber}
                  data-value={item.phoneNumber}
                  data-sign={item.phoneNumber}
                >
                  <div className={styles.forwardNumberItem}>
                    <span className={styles.actionText}>{item.label}</span>
                    {isCustomOption ? (
                      <StyledArrowIcon
                        color="neutral.l04"
                        size="medium"
                        symbol={ArrowRight}
                        variant="plain"
                      />
                    ) : (
                      <span className={styles.subText}>{item.phoneNumber}</span>
                    )}
                  </div>
                </RcMenuItem>
              );
            })}
          </RcMenuList>
        </RcPopover>
      </>
    );
  };

export { MoreActionWithIncomingCall };
