import { css, spacing } from '@ringcentral/juno';

export const resetModalContentStyle = css`
  margin-left: -${spacing(6)};
  margin-bottom: -${spacing(3)};
  width: calc(100% + ${spacing(12)});
  height: calc(100% + ${spacing(3)});
`;

export const resetContentProps = {
  style: { overflow: 'hidden' },
};
