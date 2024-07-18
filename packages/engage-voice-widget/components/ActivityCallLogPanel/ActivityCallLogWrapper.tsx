import { SubmitButtonHeight } from '@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo';
import { styled, px, RcIconButton } from '@ringcentral/juno';

import { pageSpace } from '../../scss/variables';

export const StyledAgentScriptIcon = styled(RcIconButton)`
  position: absolute;
  right: 16px;
  top: 50px;
  z-index: 2;
`;

export const SubmitButtonWrapper = styled.div`
  height: ${px(SubmitButtonHeight)};
  display: flex;
  align-items: center;
  ${pageSpace('padding')};
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);
`;
