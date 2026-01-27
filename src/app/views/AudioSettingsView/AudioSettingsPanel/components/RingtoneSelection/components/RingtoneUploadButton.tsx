import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
import {
  AudioInfo,
  MAX_RINGTONE_SIZE,
} from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import { useMountState } from '@ringcentral/spring-ui';
import React, { forwardRef } from 'react';

import { isAudioFile, readAudioFile } from '../helper';
import styles from '../styles.scss';

interface RingtoneUploadButtonProps {
  customRingtoneNameList: string[];
  onUploadRingtone: ({ fileName, dataUrl }: AudioInfo) => void;
  showAlert: (message: string) => void;
}

export const RingtoneUploadButton = forwardRef<
  HTMLInputElement,
  RingtoneUploadButtonProps
>(({ customRingtoneNameList, onUploadRingtone, showAlert }, ref) => {
  const isMountedRef = useMountState();
  return (
    <input
      ref={ref}
      className={styles.hidden}
      type="file"
      data-sign="uploadRingtoneInput"
      accept=".mp3, .wav"
      onChange={async ({ currentTarget }) => {
        try {
          if (currentTarget?.files?.length && isMountedRef.current) {
            const file = currentTarget.files[0];

            // duplicate file
            if (customRingtoneNameList.includes(file.name)) {
              showAlert(audioSettingsErrors.duplicateRingtone);
              return;
            }

            // over size limit
            if (file.size > MAX_RINGTONE_SIZE) {
              showAlert(audioSettingsErrors.ringtoneSizeOverLimit);
              return;
            }

            const isValidFile = await isAudioFile(file);
            if (!isValidFile) {
              showAlert(audioSettingsErrors.uploadRingtoneFailed);
              return;
            }

            const audioInfo = await readAudioFile(file);
            onUploadRingtone(audioInfo);
            // reset input
            currentTarget.value = '';
          }
        } catch (e) {
          console.error('upload ringtone failed', e);
          showAlert(audioSettingsErrors.uploadRingtoneFailed);
        }
      }}
    />
  );
});
