import React, { FunctionComponent, useCallback } from 'react';
import { RcIconButton, styled, spacing } from '@ringcentral/juno';
import CopyIcon from '@ringcentral/juno/icon/Copy';
import CopyToClipboard from '../CopyToClipboard';
import i18n from './i18n';
import { ICopyBtnProps, InnerBtnProps } from './interface';

const BtnContainer = styled('div')`
  & {
    width: ${spacing(8)};
  }
`;

const InnerBtn: FunctionComponent<InnerBtnProps> = (props) => {
  const { currentLocale, executeCopy } = props;
  return (
    <RcIconButton
      variant="round"
      size="small"
      color="text.subdued"
      data-sign="copyBtn"
      symbol={CopyIcon}
      tooltipTitle={i18n.getString('copy', currentLocale)}
      onClick={executeCopy}
    />
  );
};

export const CopyBtn: FunctionComponent<ICopyBtnProps> = (props) => {
  const { value, currentLocale, handleSuccess, handleFailure } = props;
  const memoizedBtn = useCallback(
    ({ executeCopy }: Pick<InnerBtnProps, 'executeCopy'>) => (
      <InnerBtn currentLocale={currentLocale} executeCopy={executeCopy} />
    ),
    [currentLocale],
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
};
