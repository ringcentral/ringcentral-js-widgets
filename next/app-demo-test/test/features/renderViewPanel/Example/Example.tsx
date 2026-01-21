import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { styled } from '@ringcentral/juno';
import type {
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import React from 'react';

import i18n from './i18n';
import i18n2 from './i18n2';
import { exampleStyle } from './styles';

export type ExampleProps = PropsWithChildren<{}> &
  HTMLAttributes<HTMLDivElement>;

const _Example: FunctionComponent<ExampleProps> = (props) => {
  const { children, ...rest } = props;

  const { t, currentLocale } = useLocale(i18n, i18n2);

  const showMessage = t('showMessage', {
    hello: 'Hello world',
    name: 'John',
  });

  const showMessage2 = t('showMessage2', {
    hello: 'Hello world',
    name: 'John',
  });

  return (
    <div {...rest}>
      <div>{currentLocale}</div>
      <div>{showMessage}</div>
      <div>{showMessage2}</div>
    </div>
  );
};

export const Example = styled(_Example)`
  ${exampleStyle}
`;
