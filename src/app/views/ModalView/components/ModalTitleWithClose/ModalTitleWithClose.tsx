import {
  RcDialogTitle,
  RcIconButton,
  RcText,
  spacing,
  styled,
} from '@ringcentral/juno';
import { Close } from '@ringcentral/juno-icon';
import React, { forwardRef } from 'react';

import { useLocale } from '../../../../hooks';
import i18n from '../../ModalItemView/ModalItemPanel/i18n';
import { useModalItemView } from '../../ModalItemView/contexts';

import { modalTitleWithCloseStyle } from './styles';

export type ModalTitleWithCloseProps = {};

const Title = styled(RcText)`
  margin-right: ${spacing(3)};
`;

const _ModalTitleWithClose = forwardRef<
  HTMLDivElement,
  ModalTitleWithCloseProps
>((sourceProps, ref) => {
  const { children, ...rest } = sourceProps;
  const { t } = useLocale(i18n);

  const { props, action } = useModalItemView();

  const { onClose, TitleProps } = props;

  const {
    disableTypography = true,
    display = 'flex',
    space = [0, 6],
  } = TitleProps || {};

  return (
    <RcDialogTitle
      {...TitleProps}
      disableTypography={disableTypography}
      display={display}
      space={space}
      ref={ref}
    >
      <div {...rest}>
        <Title variant="title2" component="h2" flexFull>
          {children}
        </Title>
        <div>
          <RcIconButton
            title={t('close')}
            symbol={Close}
            onClick={() => action?.close?.('programmatic')}
          />
        </div>
      </div>
    </RcDialogTitle>
  );
});

/**
 * when you need title with close button can use this component in your view `title` method
 */
export const ModalTitleWithClose = styled(_ModalTitleWithClose)`
  ${modalTitleWithCloseStyle}
`;
