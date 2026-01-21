import type { LiteralUnion } from '@ringcentral/juno';
import { flexWidth, spacing, styled } from '@ringcentral/juno';

export const FlexWidth = styled.div<{ value: LiteralUnion<'auto'> }>`
  ${({ value }) => flexWidth(value)}
`;

export const Spacing = styled.div<{
  flexWidth: LiteralUnion<'auto'>;
  margin?: number[];
  padding?: number[];
}>`
  margin: ${({ margin }) => margin && spacing(...margin)};
  padding: ${({ padding }) => padding && spacing(...padding)};
  ${({ flexWidth: value }) => value && flexWidth(value)};
`;
