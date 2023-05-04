import {
  css,
  palette2,
  RcChip,
  RcDialTextField,
  RcText,
  spacing,
  styled,
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
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ResultContainer = styled.div`
  ${fullSizeStyle};
  display: flex;
  flex-direction: column;
  background: ${palette2('neutral', 'b01')};
  z-index: 10;
`;

export const FieldLine = styled.div`
  display: flex;
  flex-wrap: nowrap;
  &:nth-child(1) {
    align-items: flex-start;
    p {
      margin-top: ${spacing(1)};
      [sf-classic] & {
        margin-top: 3px;
      }
    }
  }
  &:nth-child(2) {
    align-items: center;
  }
`;

export const StyledRcChip = styled(RcChip)`
  margin: 2px 0;
  padding: 0;
`;

export const StyledRecipientsWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-height: 122px;
`;

export const StyledRcDialTextField = styled(RcDialTextField)`
  input {
    text-overflow: ellipsis;
    min-width: 20px;
  }
  min-height: 32px;
  [sf-classic] & {
    min-height: 28px;
  }
`;

export const StyledToInputWrapper = styled.div<{ inputFullWidth: boolean }>`
  width: 100%;
  min-width: 0;
  max-height: 122px;
  overflow-y: auto;
  overflow-x: hidden;

  ${({ inputFullWidth }) =>
    inputFullWidth &&
    css`
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;

      ${StyledRcDialTextField} {
        flex: 1 1 0%;
        min-width: 50px;
      }

      ${StyledRecipientsWrapper} {
        width: auto;
        display: contents;
      }
    `}
`;
