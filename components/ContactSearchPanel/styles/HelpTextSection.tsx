import { RcListItemText, RcText, spacing, styled } from '@ringcentral/juno';

export const HelpTextSectionWrapper = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  margin: ${spacing(3)} 0;
  text-align: ${({ isLoading }) => (isLoading ? 'center' : 'left')};
`;

export const StyledHintsTitle = styled(RcText)`
  margin-bottom: ${spacing(1)};
`;

export const StyledListItemText = styled(RcListItemText)`
  line-height: ${spacing(10)};
`;

export const HintsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${spacing(4)};
`;
