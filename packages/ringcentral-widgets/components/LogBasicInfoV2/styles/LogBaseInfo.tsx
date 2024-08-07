import {
  RcButton,
  RcIcon,
  RcIconButton,
  RcText,
  palette2,
  spacing,
  styled,
} from '@ringcentral/juno';

import { fullSizeStyle } from '../../../lib/commonStyles';

export const SubInfoWrapper = styled.div`
  ${fullSizeStyle};
  display: flex;
  align-items: center;
  padding-bottom: 1px;
`;

export const SubInfoName = styled(RcText)<{
  $isWide?: boolean;
}>`
  margin: 0 10px;
  font-size: ${({ $isWide }) => ($isWide ? '18px' : `${spacing(2)}`)};
  color: #212121;
  flex-grow: 1;
`;

export const StyledTransferSwitchButton = styled(RcIconButton)`
  position: absolute;
  right: ${spacing(5)};
  margin-top: ${spacing(-4)};
  z-index: 1;
`;

export const StyledSide = styled.div`
  display: flex;
  line-height: 16px;
  justify-content: flex-end;
  margin-bottom: ${spacing(2)};
`;

export const StyleSubBox = styled.div`
  position: relative;
`;

export const StyledSubSide = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${palette2('neutral', 'f03')};
  font-size: ${spacing(3)};
  margin-bottom: ${spacing(1)};
`;

export const StyledSubRecordingIndicator = styled.div`
  padding-left: ${spacing(1)};
`;

export const StyledParticipantsButton = styled(RcButton)`
  && {
    font-size: 12px;
    margin-left: ${spacing(1)};
    padding: ${spacing(0, 2)};
    min-height: 22px;
    background-color: #ffffff;
    :hover {
      background-color: #ffffff;
    }

    ${RcIcon} {
      margin-right: ${spacing(1)};
    }
  }
`;
