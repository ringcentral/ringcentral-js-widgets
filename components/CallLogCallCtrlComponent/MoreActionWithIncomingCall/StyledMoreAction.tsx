import {
  styled,
  RcIconButton,
  spacing,
  RcIcon,
  RcMenuList,
  RcMenuItem,
} from '@ringcentral/juno';

export const StyledActionIcon = styled(RcIcon)`
  margin-right: ${spacing(2)};
`;

export const StyledReplyIcon = styled(StyledActionIcon)`
  transform: rotateY(180deg);
`;

export const StyledMenuList = styled(RcMenuList)`
  ${RcMenuItem} {
    width: 124px;
  }
`;

export const StyledArrowIcon = styled(RcIconButton)`
  position: absolute;
  right: 8px;
`;
