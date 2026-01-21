import { css, palette2, RcThemedStyled, spacing } from '@ringcentral/juno';

import type { ExampleProps } from '../Example';

export const exampleStyle: RcThemedStyled<
  ExampleProps,
  ReturnType<typeof css>
> = (props) => {
  return css`
    background-color: ${palette2('neutral', 'b04')};
    color: ${palette2('neutral', 'f01')};
    padding: ${spacing(1, 2, 3, 4)};
  `;
};
