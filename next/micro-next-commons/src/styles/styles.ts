import { normalizeStyle } from '@ringcentral-integration/widgets/lib/commonStyles';
import { createGlobalStyle, palette2, typography } from '@ringcentral/juno';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #viewport {
    height: 100%;
    background-color: ${palette2('neutral', 'b01')};
    color: ${palette2('neutral', 'f06')};
    ${typography('body1')};
  }

  ${normalizeStyle}
`;
