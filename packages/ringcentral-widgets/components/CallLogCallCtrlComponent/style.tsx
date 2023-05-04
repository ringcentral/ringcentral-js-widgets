import { css, RcButton, spacing, styled } from '@ringcentral/juno';

export const CompleteTransferButton = styled(RcButton)<{
  isWide?: boolean;
}>`
  white-space: initial;
  margin-right: ${({ isWide }) => (isWide ? spacing(2) : spacing(1))};
  ${({ isWide }) => {
    if (!isWide) {
      return css`
        padding: ${spacing(0, 2)};
      `;
    }
  }};
`;

CompleteTransferButton.defaultProps = {
  isWide: true,
};
