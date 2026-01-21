import { styled } from '@ringcentral/juno';

import { classicWidth, lightningWidth } from '../utils';

export const StyledTitle = styled.div`
  max-width: ${lightningWidth};

  [sf-classic] & {
    max-width: ${classicWidth};
  }
`;
