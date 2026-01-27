import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  RcButton,
  RcCheckbox,
  RcDialogActions,
  RcDrawer,
  RcTypography,
  spacing,
  styled,
} from '@ringcentral/juno';
import React, { type FunctionComponent, useEffect, useState } from 'react';

import { MergeCallConfirmationProps } from './MergeCallConfirmation.interface';
import i18n from './i18n';

const InnerContainer = styled.div`
  display: grid;
  gap: ${spacing(3)};
  padding: ${spacing(0, 4)};
  margin: ${spacing(4, 0)};

  ${RcDialogActions} {
    margin-top: ${spacing(2)};
    padding: 0;
  }
`;

/**
 * Default value for "Don't ask me again"
 */
const DEFAULT_DO_NOT_ASK = false;

export const MergeCallConfirmation: FunctionComponent<
  MergeCallConfirmationProps
> = ({ isOpen, contactName, isConferenceCall, onClose, onCancel, onMerge }) => {
  const { t } = useLocale(i18n);
  const [doNotAsk, setDoNotAsk] = useState<boolean>(DEFAULT_DO_NOT_ASK);
  useEffect(() => {
    if (isOpen) {
      setDoNotAsk(DEFAULT_DO_NOT_ASK);
    }
  }, [isOpen]);
  return (
    <RcDrawer
      radius="xl"
      anchor="bottom"
      open={isOpen}
      onClose={() => {
        onClose?.();
      }}
      data-sign="mergeCallConfirmation"
    >
      <InnerContainer>
        <RcTypography variant="subheading2">{t('title')}</RcTypography>
        <RcTypography variant="body1" data-sign="confirmMessage">
          {t('message', {
            contactName: isConferenceCall ? t('conferenceCall') : contactName,
          })}
        </RcTypography>
        <RcCheckbox
          label={t('doNotAsk')}
          data-sign="doNotAsk"
          formControlLabelProps={{
            labelPlacement: 'end',
          }}
          checked={doNotAsk}
          onChange={(ev, checked) => {
            setDoNotAsk(checked);
          }}
        />
        <RcDialogActions direction="vertical" reverse={false}>
          <RcButton
            data-sign="confirmMerge"
            variant="contained"
            color="primary"
            size="xlarge"
            fullWidth
            onClick={() => {
              onMerge(doNotAsk);
            }}
          >
            {t('merge')}
          </RcButton>
          <RcButton
            data-sign="cancelMerge"
            variant="text"
            size="xlarge"
            fullWidth
            onClick={() => {
              onCancel();
            }}
          >
            {t('cancel')}
          </RcButton>
        </RcDialogActions>
      </InnerContainer>
    </RcDrawer>
  );
};
