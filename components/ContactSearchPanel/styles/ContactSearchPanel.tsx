import {
  ellipsis,
  flexWidth,
  palette2,
  radius,
  RcAvatar,
  RcIcon,
  RcListItemText,
  RcTab,
  spacing,
  styled,
} from '@ringcentral/juno';

export const ContactName = styled.span`
  display: inline-block;
  max-width: 92%;
  vertical-align: middle;
  ${ellipsis};
  [sf-classic] & {
    max-width: 80%;
  }
`;

export const StyledTabsWrapper = styled.div`
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
`;

export const StyledContactSearchPanel = styled.div`
  position: relative;
  background: ${palette2('neutral', 'f01')};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${RcAvatar} {
    div {
      font-weight: normal;
    }
  }

  [sf-classic] & {
    ${RcTab} {
      padding: ${spacing(1)};
    }
    ${RcTab}:not(:last-child) {
      ${flexWidth('81px')};
      padding: ${spacing(1)};
      span {
        ${ellipsis}
        display: inline-block;
      }
    }
  }
`;

export const FullSizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const DefaultIcon = styled(RcIcon)`
  background: ${palette2('avatar', 'global')};
  border-radius: ${radius('circle')};
`;

export const TabText = styled.div`
  ${ellipsis};
  font-size: 12px;
`;

export const StyledListItemText = styled(RcListItemText)<{
  inset?: boolean;
}>`
  && {
    padding-left: ${spacing(8)};
  }
  [sf-classic] & {
    padding-left: ${({ inset }) => inset && spacing(5)};
  }
`;
