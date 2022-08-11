import {
  palette2,
  radius,
  RcDialPad,
  RcIconButton,
  RcIconButtonGroup,
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

export const DefaultIconWrap = styled.div`
  flex: 1;
  text-align: center;
`;

export const DefaultIconGroup = styled(RcIconButtonGroup)`
  display: flex;

  [sf-classic] & {
    padding-left: ${spacing(1)};
    padding-right: ${spacing(1)};
  }
`;

export const DefaultIcon = styled(RcIconButton)`
  background: ${palette2('neutral', 'f01')};
  border-radius: ${radius('circle')};
  padding: ${spacing(2)};
  border: 1px solid;
  margin-bottom: ${spacing(1)};
`;

export const TransferPage = styled.div`
  height: 100%;
  background-color: ${palette2('neutral', 'b01')};
`;
export const CommunicationSetupPanelWrap = styled.div`
  max-height: calc(100% - 44px);
  height: calc(100% - 44px);
`;
