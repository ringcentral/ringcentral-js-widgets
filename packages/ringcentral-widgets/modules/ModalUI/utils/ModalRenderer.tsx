import React from 'react';

import { RcIconButton, RcText, spacing, styled } from '@ringcentral/juno';
import { Close as close } from '@ringcentral/juno-icon';

import i18n from '../i18n';
import { CustomRenderer } from '../ModalUI.interface';

export const defaultOKRendererID = 'ModalUI.defaultOKRendererID';
export const defaultCancelRendererID = 'ModalUI.defaultCancelRendererID';
export const infoTitleRendererID = 'ModalUI.infoTitleRendererID';

export const defaultOKRenderer: CustomRenderer = ({ currentLocale }) =>
  i18n.getString('ok', currentLocale);

export const defaultCancelRenderer: CustomRenderer = ({ currentLocale }) =>
  i18n.getString('cancel', currentLocale);

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
`;

const Title = styled(RcText)`
  margin-right: ${spacing(3)};
`;

export const infoTitleRenderer: CustomRenderer = ({
  currentLocale,
  onConfirm,
  title,
}) => (
  <Header>
    <Title variant="title2" component="h2" flexFull>
      {title}
    </Title>
    <div>
      <RcIconButton
        tooltipTitle={i18n.getString('close', currentLocale)}
        symbol={close}
        onClick={onConfirm}
      />
    </div>
  </Header>
);
