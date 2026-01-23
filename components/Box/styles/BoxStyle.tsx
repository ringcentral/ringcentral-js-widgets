import type { RcThemedStyled } from '@ringcentral/juno';
import {
  css,
  flexCenterStyle,
  flexWidth,
  getParsePaletteColor,
  spacing,
  typography,
} from '@ringcentral/juno';
import React from 'react';

import type { BoxProps } from '../Box';

export const BoxStyle: RcThemedStyled<BoxProps, any> = (props) => {
  const {
    m,
    p,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    flexWidth: flexWidthProp,
    typography: typographyProp,
    color,
    flexCenter,
    classes,
  } = props;
  const _ml = ml ?? mx ?? m;
  const _mr = mr ?? mx ?? m;
  const _mt = mt ?? my ?? m;
  const _mb = mb ?? my ?? m;
  const _pl = pl ?? px ?? p;
  const _pr = pr ?? px ?? p;
  const _pt = pt ?? py ?? p;
  const _pb = pb ?? py ?? p;

  const typographyClassName = classes?.typography;

  return css`
    margin-left: ${_ml && spacing(_ml)};
    margin-right: ${_mr && spacing(_mr)};
    margin-top: ${_mt && spacing(_mt)};
    margin-bottom: ${_mb && spacing(_mb)};

    padding-left: ${_pl && spacing(_pl)};
    padding-right: ${_pr && spacing(_pr)};
    padding-top: ${_pt && spacing(_pt)};
    padding-bottom: ${_pb && spacing(_pb)};

    ${flexWidthProp && flexWidth(flexWidthProp)};

    ${typographyClassName
      ? css`
          .${typographyClassName} {
            ${typographyProp && typography(typographyProp)};
            color: ${color && getParsePaletteColor(color)};
          }
        `
      : css`
          ${typographyProp && typography(typographyProp)};
          color: ${color && getParsePaletteColor(color)};
        `};

    ${flexCenter && flexCenterStyle};
  `;
};
