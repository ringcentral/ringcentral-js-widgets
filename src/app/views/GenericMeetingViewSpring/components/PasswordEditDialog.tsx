import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@ringcentral/spring-ui';
import React, { useState, useEffect } from 'react';

import { RCV_PASSWORD_REGEX } from '../../../services/RcVideo/constants';
import i18n from '../i18n';

export interface PasswordEditDialogProps {
  open: boolean;
  currentPassword: string;
  onClose: () => void;
  onUpdate: (password: string) => void;
}

export const PasswordEditDialog: React.FC<PasswordEditDialogProps> = ({
  open,
  currentPassword,
  onClose,
  onUpdate,
}) => {
  const { t } = useLocale(i18n);
  const [password, setPassword] = useState(currentPassword);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setPassword(currentPassword);
      setError('');
    }
  }, [open, currentPassword]);

  const validatePassword = (value: string): string => {
    if (value.length === 0) {
      return t('passwordRequired');
    }
    if (!RCV_PASSWORD_REGEX.test(value)) {
      return t('passwordFormatError');
    }
    return '';
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const validationError = validatePassword(value);
    setError(validationError);
  };

  const handleUpdate = () => {
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }
    onUpdate(password);
    onClose();
  };

  const handleCancel = () => {
    setPassword(currentPassword);
    setError('');
    onClose();
  };

  const isValid = !error && password.length > 0;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      bodyProps={{
        style: { paddingTop: '12px', paddingBottom: '12px' },
      }}
      size="large"
    >
      <DialogTitle className="px-3">{t('updatePassword')}</DialogTitle>
      <DialogContent className="px-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="typography-descriptorMini text-neutral-b0">
              {t('password')}
            </div>
            <TextField
              variant="outlined"
              size="medium"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={!!error}
              helperText={error || t('passwordValidationHint')}
              className="w-full"
              placeholder={t('passwordPlaceholder')}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions className="px-3 pt-3">
        <Button
          onClick={handleCancel}
          color="secondary"
          size="medium"
          variant="outlined"
        >
          <span className="typography-subtitleMini">{t('cancel')}</span>
        </Button>
        <Button
          onClick={handleUpdate}
          disabled={!isValid}
          color="primary"
          size="medium"
        >
          <span className="typography-subtitleMini">{t('update')}</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
