import type { RcThemedStyled } from '@ringcentral/juno';
import { css, palette2, px } from '@ringcentral/juno';
import React from 'react';

import { navBarHeight } from '../../../styles';
import type { NavBarProps } from '../NavBar';

export const NavBarStyle: RcThemedStyled<NavBarProps, any> = (props) => {
  const { direction } = props;
  const isVertical = direction === 'vertical';

  return css`
    box-sizing: border-box;
    overflow: visible;
    height: ${px(navBarHeight)};
    flex-shrink: 0;
    background-color: ${palette2('nav', 'menuBg')};
    display: flex;

    ${isVertical &&
    css`
      flex-direction: column;
      height: 100%;
    `}
  `;
};
