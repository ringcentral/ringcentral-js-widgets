import { css, palette2 } from '@ringcentral/juno';

export const highContrastBorderStyle = (
  direction: 'left' | 'right' | 'top' | 'bottom',
) => {
  return css`
    ${({ theme }) => {
      const isHighContrast = theme.palette.highContrast !== 'transparent';

      if (isHighContrast) {
        const border = direction ? `border-${direction}` : 'border';

        return `${border}: 1px solid ${palette2('highContrast')({ theme })}`;
      }

      return '';
    }}
  `;
};
