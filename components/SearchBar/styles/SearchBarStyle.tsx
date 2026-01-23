import type { RcThemedStyled } from '@ringcentral/juno';
import {
  css,
  flexCenterStyle,
  RcIconButton,
  RcTextField,
  spacing,
} from '@ringcentral/juno';

import type { SearchBarProps } from '../SearchBar';

export const SearchBarStyle: RcThemedStyled<SearchBarProps, any> = (props) => {
  return css`
    ${flexCenterStyle};
    padding: ${spacing(1, 4)};

    ${RcTextField} {
    }

    ${RcIconButton} {
      flex-shrink: 0;
    }
  `;
};
