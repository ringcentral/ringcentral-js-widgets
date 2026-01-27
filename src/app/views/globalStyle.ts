import { normalizeStyle } from '@ringcentral-integration/widgets/lib/commonStyles';
import { createGlobalStyle, palette2, RcPresence } from '@ringcentral/juno';

type GlobalStyleProps = {
  /**
   * root element, default is `#viewport`
   */
  root?: string;
};

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${normalizeStyle}

  html,
  body,
  ${({ root }) => root || '#viewport'} {
    height: 100%;
    background-color: ${palette2('neutral', 'b01')};
  }

  ${({ root }) => root || '#viewport'} {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: ${palette2('neutral', 'f06')};
  }

  ${
    RcPresence
    // TODO: fix in Juno
  } {
    box-sizing: content-box;
  }
`;
