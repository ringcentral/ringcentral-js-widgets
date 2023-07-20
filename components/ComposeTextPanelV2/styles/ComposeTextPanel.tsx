import { palette2, styled } from '@ringcentral/juno';

import { fullSizeStyle } from '../../../lib/commonStyles';

export const Root = styled.div`
  ${fullSizeStyle};
  box-sizing: border-box;
  background: ${palette2('neutral', 'b01')};
`;
