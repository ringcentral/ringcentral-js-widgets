import { validatePasswordSettings } from '@ringcentral-integration/commons/modules/RcVideo';
import {
  RcButton,
  RcDialogActions,
  RcTextField,
  spacing,
  styled,
} from '@ringcentral/juno';
import React, { useState, useEffect } from 'react';

import { t } from './i18n';
import styles from './styles.scss';
import { getHelperTextForPasswordField } from './utils';

export interface ChangePasswordPopupProps {
  currentLocale: string;
  meetingPassword?: string;
  handleCancel: () => void;
  handleUpdate: (password: string) => void;
}

const StyledDialogActions = styled(RcDialogActions)`
  padding: ${spacing(5, 0, 6)} !important;
`;

export const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
  currentLocale,
  meetingPassword = '',
  handleCancel,
  handleUpdate,
}) => {
  const [password, setPassword] = useState(meetingPassword);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setPassword(meetingPassword);
  }, [meetingPassword]);

  useEffect(() => {
    setError(!validatePasswordSettings(password, true));
  }, [password]);

  return (
    <div data-sign="updatePasswordModal">
      <RcTextField
        label={t('passwordLabel')}
        variant="outline"
        fullWidth
        size="small"
        placeholder={t('enterPassword')}
        error={isError}
        helperText={getHelperTextForPasswordField(
          password,
          !isError,
          currentLocale,
        )}
        InputLabelProps={{
          className: styles.passwordLabel,
        }}
        data-sign="password"
        clearBtn
        spellCheck={false}
        value={password}
        inputProps={{
          maxLength: 255,
        }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <StyledDialogActions>
        <RcButton variant="plain" color="primary" onClick={handleCancel}>
          {t('cancel')}
        </RcButton>
        <RcButton
          variant="contained"
          color="primary"
          disabled={isError}
          onClick={() => handleUpdate(password)}
        >
          {t('update')}
        </RcButton>
      </StyledDialogActions>
    </div>
  );
};
