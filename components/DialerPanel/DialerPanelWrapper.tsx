import { styled } from '@ringcentral/juno';

export const RcTextWrapper = styled.div`
  font-size: 13px;
  width: 219px;
  [sf-classic] & {
    font-size: 12px;
    width: 175px;
  }
  & p {
    margin-bottom: 25px;
  }
`;

export const RcLinkWrapper = styled.div`
  position: absolute;
  bottom: 13px;
`;
