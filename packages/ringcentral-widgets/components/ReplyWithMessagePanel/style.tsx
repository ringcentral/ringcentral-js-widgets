import {
  palette2,
  RcIcon,
  RcList,
  RcListItem,
  RcTextarea,
  spacing,
  styled,
} from '@ringcentral/juno';

export const ReplyWithMessagePage = styled.div`
  position: relative;
  z-index: 21;
  height: 100%;
  background-color: ${palette2('neutral', 'b01')};
`;

export const ReplyOptionsList = styled(RcList)`
  margin-top: ${spacing(8)};
`;

export const SendIcon = styled(RcIcon)`
  display: none;
`;

export const ReplyOptionItem = styled(RcListItem)`
  padding-top: ${spacing(2)};
  padding-bottom: ${spacing(2)};
  &:hover {
    ${SendIcon} {
      display: flex;
    }
  }
`;

export const StyledCustomMessage = styled(RcTextarea)`
  padding: ${spacing(0, 4, 8, 4)};
  margin-top: ${spacing(14)};
  position: absolute;
  bottom: 0;
  label {
    padding-left: ${spacing(4)};
  }
`;

export const TimeSendIcon = styled(RcIcon)`
  display: flex;
  visibility: hidden;
`;

export const TimeOptionItem = styled(RcListItem)`
  padding-top: ${spacing(2)};
  padding-bottom: ${spacing(2)};
  &:hover {
    ${TimeSendIcon} {
      visibility: visible;
    }
  }
`;
