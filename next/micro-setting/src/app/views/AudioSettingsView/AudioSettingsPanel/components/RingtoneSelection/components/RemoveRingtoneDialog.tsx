import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Text,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import i18n from '../i18n';

export const RemoveRingtoneDialog: FunctionComponent<{
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ name, open, onConfirm, onCancel }) => {
  const { t } = useLocale(i18n);

  // TODO: spring-ui Dialog in test show how never close, so we hide that in test
  if (process.env.NODE_ENV === 'test' && !open) {
    return null;
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <Text
          data-test-automation-id="DialogTitle"
          className="typography-subtitle text-neutral-b0"
          component="p"
        >
          {t('confirmToDelete', { name })}
        </Text>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          data-test-automation-id="DialogCancelButton"
          onClick={onCancel}
        >
          {t('cancel')}
        </Button>
        <Button
          color="danger"
          variant="contained"
          data-test-automation-id="DialogOKButton"
          onClick={onConfirm}
        >
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
