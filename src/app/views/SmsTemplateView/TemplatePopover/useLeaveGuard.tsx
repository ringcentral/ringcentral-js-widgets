import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useEventCallback,
} from '@ringcentral/spring-ui';
import React, { useCallback, useState } from 'react';

import i18n from './i18n';

export interface UseLeaveGuardOptions {
  condition: () => boolean;
  onLeave: () => void;
  onCancel?: () => void;
}

export const useLeaveGuard = ({
  condition,
  onLeave,
  onCancel,
}: UseLeaveGuardOptions) => {
  const { t } = useLocale(i18n);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // memo that to avoid un-necessary re-render
  const handleLeave = useEventCallback(onLeave);
  const handleCancel = useEventCallback(onCancel ?? (() => {}));

  const attemptLeave = () => {
    if (condition()) {
      setShowConfirmDialog(true);
      return false; // Prevent leaving
    }

    handleLeave();
    return true; // Allow leaving
  };

  const LeaveGuardDialog = useCallback(() => {
    const handleDiscardConfirm = () => {
      setShowConfirmDialog(false);
      handleLeave();
    };

    const handleDiscardCancel = () => {
      setShowConfirmDialog(false);
      handleCancel();
    };

    return (
      <Dialog
        open={showConfirmDialog}
        onClose={handleDiscardCancel}
        data-sign="templateLeaveGuard"
      >
        <DialogTitle>{t('discardChangesMessage')}</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDiscardCancel}
            data-sign="discardCancel"
          >
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            color="danger"
            onClick={handleDiscardConfirm}
            data-sign="discardConfirm"
          >
            {t('discard')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [handleCancel, handleLeave, showConfirmDialog, t]);

  return {
    attemptLeave,
    LeaveGuardDialog,
  };
};
