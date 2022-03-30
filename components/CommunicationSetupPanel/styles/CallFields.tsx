import {
  palette2,
  RcDialTextField,
  RcText,
  spacing,
  styled,
  RcChip,
} from '@ringcentral/juno';

import { fullSizeStyle } from '../../../lib/commonStyles';

export const CallFields = styled.div`
  margin-top: 10px;
  padding: 0 ${spacing(5)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-bottom: 1px solid ${palette2('nav', 'line')};
  ${RcText} {
    width: 46px;
  }
`;

export const RootWrapper = styled.div`
  ${fullSizeStyle};
  display: flex;
  flex-direction: column;
`;

export const FullSizeWrapper = styled.div`
  ${fullSizeStyle};
`;

export const ResultContainer = styled.div`
  ${fullSizeStyle};
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${palette2('neutral', 'b01')};
  z-index: 20;
`;

export const FieldLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

export const StyledToInputWrapper = styled.div`
  width: 100%;
`;

export const StyledRecipientsWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: auto;
  max-height: 122px;
`;

export const StyledRcDialTextField = styled(RcDialTextField)`
  min-height: 32px;
`;

export const StyledRcChip = styled(RcChip)`
  margin: 2px 0;
  padding: 0;
`;
