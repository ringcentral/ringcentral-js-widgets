import type { RcThemedStyled } from '@ringcentral/juno';
import {
  css,
  flexCenterStyle,
  focusVisible,
  nonStyleButton,
  nonTouchHoverMedia,
  palette2,
  setOpacity,
} from '@ringcentral/juno';
import React from 'react';

import type { NavButtonProps } from '../NavButton';

const iconColor = palette2('nav', 'menuText');

// TODO: check with designer, is need add that active background color?

export const navButtonStyle: RcThemedStyled<NavButtonProps, any> = ({
  width,
  height,
  active,
}) => {
  return css`
    ${nonStyleButton};
    ${flexCenterStyle};
    width: ${width};
    height: ${height};
    flex: 1 1 auto;
    color: ${iconColor};
    background-color: ${active && setOpacity(iconColor, '12')};

    ${nonTouchHoverMedia} {
      &:hover {
        background-color: ${setOpacity(iconColor, '08')};
      }
    }

    &:active {
      background-color: ${setOpacity(iconColor, '16')};
    }

    ${focusVisible} {
      background-color: ${setOpacity(iconColor, '16')};
    }
  `;
};
