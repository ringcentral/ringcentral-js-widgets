import {
  RcListItem,
  spacing,
  styled,
  RcCard,
  RcTypography,
  RcSwitch,
  RcSelect,
  RcListItemText,
  RcBox,
  RcLink,
} from '@ringcentral/juno';

export const TitleWrapper = styled.div`
  margin-bottom: ${spacing(5)};

  ${RcTypography} {
    margin-bottom: ${spacing(1)};
  }

  ${RcTypography}:last-child {
    margin-bottom: 0;
  }
`;

export const StyledRcCard = styled(RcCard)`
  padding: ${spacing(0, 3)};
  margin-bottom: ${spacing(5)};
`;

export const StyledListItem = styled(RcListItem)`
  padding: ${spacing(3, 0)} !important;

  ${RcSwitch} {
    margin-left: ${spacing(4)};
  }

  ${RcSelect} {
    margin-top: ${spacing(4)};
  }
`;

export const StyledPasswordDescription = styled(RcBox)`
  gap: ${spacing(2)};

  ${RcLink} {
    margin-left: ${spacing(2.5)};
  }
`;

export const StyledVerticalListItem = styled(StyledListItem)`
  flex-direction: column;
  align-items: stretch;
`;

export const StyledListItemText = styled(RcListItemText)`
  .RcListItemText-secondary {
    white-space: break-spaces;
  }
`;
