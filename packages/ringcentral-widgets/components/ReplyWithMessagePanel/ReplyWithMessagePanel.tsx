import {
  RcListItemSecondaryAction,
  RcListItemText,
  RcMenu,
} from '@ringcentral/juno';

import { Send } from '@ringcentral/juno-icon';
import React, { FunctionComponent, useState, MouseEvent } from 'react';
import BackHeader from '../BackHeaderV2';
import i18n from './i18n';
import { ReplyWithPattern } from '../../modules/ReplyWithMessageUI';
import {
  OptionsItem,
  ReplyWithMessageProps,
} from './ReplyWithMessagePanel.interface';
import {
  ReplyWithMessagePage,
  ReplyOptionsList,
  ReplyOptionItem,
  SendIcon,
  StyledCustomMessage,
  TimeOptionItem,
  TimeSendIcon,
} from './style';

export const ReplyWithMessagePanel: FunctionComponent<ReplyWithMessageProps> =
  ({
    onBackClick,
    displayCustomMessage,
    reply,
    currentLocale,
    children,
    options,
  }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [popKey, setPopKey] = useState<string | null>(null);
    const handleClose = () => {
      setAnchorEl(null);
      setPopKey(null);
    };
    const renderMenu = (
      {
        options,
        pattern,
      }: { options: OptionsItem[]; pattern: ReplyWithPattern },
      index: number,
    ) => {
      return (
        <RcMenu
          key={`pop-${index}`}
          open={`pop-${index}` === popKey}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          PaperProps={{
            style: {
              minWidth: 128,
            },
          }}
        >
          {options.map((item: any, subIndex: number) => {
            return (
              <TimeOptionItem
                onClick={() => {
                  reply({
                    replyWithPattern: {
                      pattern,
                      time: item.timeValue,
                      timeUnit: item.timeUnits,
                    },
                  });
                  onBackClick();
                }}
                key={`time-${index}-${subIndex}`}
              >
                <RcListItemText primary={item.text} />
                <RcListItemSecondaryAction>
                  <TimeSendIcon
                    color="action.grayLight"
                    size="small"
                    symbol={Send}
                  />
                </RcListItemSecondaryAction>
              </TimeOptionItem>
            );
          })}
        </RcMenu>
      );
    };
    return (
      <ReplyWithMessagePage data-sign="replyWithMessagePage">
        <BackHeader
          onBackClick={onBackClick}
          title={i18n.getString('title', currentLocale)}
        />
        <ReplyOptionsList>
          {options.map((item, index) => {
            return item.options ? (
              <>
                <ReplyOptionItem
                  selected={index === selectedIndex}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    setAnchorEl(event.currentTarget);
                    setPopKey(`pop-${index}`);
                  }}
                  onMouseOver={() => {
                    setSelectedIndex(index);
                  }}
                  key={index}
                >
                  <RcListItemText primary={item.text} data-sign={item.text} />
                </ReplyOptionItem>
                {renderMenu(item, index)}
              </>
            ) : (
              <ReplyOptionItem
                onMouseOver={() => {
                  setSelectedIndex(index);
                }}
                key={index}
                selected={index === selectedIndex}
                onClick={() => {
                  reply({
                    replyWithPattern: {
                      pattern: item.pattern,
                    },
                  });
                  onBackClick();
                }}
              >
                <RcListItemText primary={item.text} data-sign={item.text} />
                <RcListItemSecondaryAction>
                  <SendIcon
                    color="action.grayLight"
                    size="small"
                    symbol={Send}
                  />
                </RcListItemSecondaryAction>
              </ReplyOptionItem>
            );
          })}
        </ReplyOptionsList>
        {displayCustomMessage && (
          <StyledCustomMessage
            data-sign="customMessage"
            fullWidth
            label={i18n.getString('customMessage', currentLocale)}
            placeholder={i18n.getString(
              'customMessagePlaceholder',
              currentLocale,
            )}
            onKeyDown={(event: any) => {
              const reg = /([^\s])/g;
              if (event.key === 'Enter') {
                event.preventDefault();
              }
              if (event.key === 'Enter' && reg.test(event.target?.value)) {
                reply({ replyWithText: event.target.value });
                onBackClick();
              }
            }}
          />
        )}
        {children}
      </ReplyWithMessagePage>
    );
  };
