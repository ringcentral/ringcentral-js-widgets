import { RcIconButton, spacing, styled } from '@ringcentral/juno';
import { Copy as CopyIcon } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';

import CopyToClipboard from '../CopyToClipboard';

import i18n from './i18n';
import type { ICopyBtnProps, InnerBtnProps } from './interface';

const BtnContainer = styled('div')`
  & {
    width: ${spacing(8)};
  }
`;

const InnerBtn: FunctionComponent<InnerBtnProps> = ({
  size,
  currentLocale,
  executeCopy,
}) => (
  <RcIconButton
    variant="round"
    size={size}
    color="neutral.f04"
    data-sign="copyBtn"
    symbol={CopyIcon}
    title={i18n.getString('copy', currentLocale)}
    onClick={executeCopy}
  />
);

export const CopyBtn: FunctionComponent<ICopyBtnProps> = ({
  value,
  size,
  currentLocale,
  handleSuccess,
  handleFailure,
}) => {
  const memoizedBtn = useCallback(
    ({ executeCopy }: Pick<InnerBtnProps, 'executeCopy'>) => (
      <InnerBtn
        size={size}
        currentLocale={currentLocale}
        executeCopy={executeCopy}
      />
    ),
    [size, currentLocale],
  );
  return (
    <BtnContainer aria-disabled>
      <CopyToClipboard
        currentLocale={currentLocale}
        copiedText={value}
        button={memoizedBtn}
        handleSuccess={handleSuccess}
        handleFailure={handleFailure}
      />
    </BtnContainer>
  );
};

CopyBtn.defaultProps = {
  handleSuccess: () => {},
  handleFailure: () => {},
  currentLocale: 'en-US',
  value: '',
  size: 'small',
};
