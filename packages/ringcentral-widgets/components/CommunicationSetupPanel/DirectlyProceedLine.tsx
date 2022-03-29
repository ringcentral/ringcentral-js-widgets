import React, { memo, FunctionComponent } from 'react';
import {
  RcListItem,
  RcListItemAvatar,
  RcAvatar,
  RcListItemText,
  RcListItemSecondaryAction,
  RcIcon,
} from '@ringcentral/juno';
import { Dial, DefaultAvatar } from '@ringcentral/juno/icon';
import i18n from './i18n';

interface DirectlyProceedLineProps {
  onClick: (...args: any[]) => any;
  number: string;
  currentLocale: string;
  inMessagePage?: boolean;
}

export const DirectlyProceedLine: FunctionComponent<DirectlyProceedLineProps> =
  memo(({ onClick, number, currentLocale, inMessagePage }) => {
    return (
      <RcListItem
        data-sign="directlyProceedEntrance"
        color="highlight.f01"
        singleLine
        onClick={onClick}
      >
        <RcListItemAvatar>
          <RcAvatar
            color="avatar.global"
            size="xsmall"
            iconSymbol={DefaultAvatar}
          />
        </RcListItemAvatar>
        <RcListItemText
          primary={`${i18n.getString(
            inMessagePage ? 'message' : 'dial',
            currentLocale,
          )}`}
          secondary={number}
        />
        <RcListItemSecondaryAction>
          <RcIcon color="action.primary" symbol={Dial} />
        </RcListItemSecondaryAction>
      </RcListItem>
    );
  });
