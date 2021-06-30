import { css, spacing } from '@ringcentral/juno';

const lightningPageSpace = spacing(4);
const classicPageSpace = spacing(3);

export const pageSpace = (type: 'margin' | 'padding' = 'margin') =>
  type === 'margin'
    ? css`
        margin-left: ${lightningPageSpace};
        margin-right: ${lightningPageSpace};

        [sf-classic] & {
          margin-left: ${classicPageSpace};
          margin-right: ${classicPageSpace};
        }
      `
    : css`
        padding-left: ${lightningPageSpace};
        padding-right: ${lightningPageSpace};

        [sf-classic] & {
          padding-left: ${classicPageSpace};
          padding-right: ${classicPageSpace};
        }
      `;
