import { styled } from '@ringcentral/juno';

export const DoNotCallWrapper = styled.div`
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
  font-size: 0;
  margin: -2px 0 0 5px;
  height: 12px;
  width: 12px;
  &:hover {
    background-color: rgba(101, 108, 128, 0.08);
  }
`;
