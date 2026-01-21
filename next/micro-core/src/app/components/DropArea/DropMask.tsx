import { palette2, setOpacity, styled } from '@ringcentral/juno';

export const DropMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${setOpacity(palette2('neutral', 'b02'), '64')};
  border: 2px dotted ${palette2('highlight', 'f02')};
  pointer-events: none;
  display: none;
`;
