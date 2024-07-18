import {
  palette2,
  RcIconButton,
  type RcIconButtonProps,
  RcText,
  RcTextProps,
  spacing,
  styled,
} from '@ringcentral/juno';
import { ChevronLeft } from '@ringcentral/juno-icon';
import type { ComponentProps, FunctionComponent } from 'react';
import React from 'react';

// ! not modify this file directly, wait all components migrate to latest version
// TODO: this file be copy from libs/next-widgets/components/PageHeader, should sync file from there

const _PageHeaderBack: FunctionComponent<RcIconButtonProps> = (props) => {
  return (
    <RcIconButton
      symbol={ChevronLeft}
      size="small"
      data-sign="backButton"
      {...props}
    />
  );
};

export const PageHeaderBack = styled(_PageHeaderBack)``;

const _PageHeaderRemain: FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  return <RcIconButton as="i" size="small" className={className} />;
};

export const PageHeaderRemain = styled(_PageHeaderRemain)`
  visibility: hidden;
`;

export const PageHeader = styled.header.attrs(
  (props: ComponentProps<'header'>) => ({
    'data-sign': 'header',
    ...props,
  }),
)`
  display: flex;
  align-items: center;
  background-color: ${palette2('neutral', 'b02')};
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
  min-height: 38px;

  ${PageHeaderRemain},
  ${PageHeaderBack} {
    margin-left: ${spacing(2)};
  }
`;

export const PageHeaderTitle = styled(RcText).attrs((props: RcTextProps) => ({
  'data-sign': 'headerTitle',
  display: 'block',
  ...props,
}))`
  flex: 1 1 auto;
  text-align: center;
`;
