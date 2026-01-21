import {
  flexCenterStyle,
  palette2,
  RcDialPad,
  spacing,
  styled,
} from '@ringcentral/juno';

export const StyledRcDialPad = styled(RcDialPad)`
  [sf-classic] & {
    height: 90%;
  }
`;

// TODO: check withTabs
export const DialerWrapper = styled.div`
  flex: 1 1 auto;
  margin: ${spacing(6)} 44px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  [sf-classic] & {
    height: 70%;
    margin: ${spacing(2)} 10px;
  }
`;

export const AddCallPage = styled.div`
  height: 100%;
  background-color: ${palette2('neutral', 'b01')};
`;
export const CommunicationSetupPanelWrap = styled.div`
  max-height: calc(100% - 44px);
  height: calc(100% - 44px);
`;

export const BodyBottom = styled.div`
  ${flexCenterStyle};
  margin-bottom: ${spacing(7)};
`;
