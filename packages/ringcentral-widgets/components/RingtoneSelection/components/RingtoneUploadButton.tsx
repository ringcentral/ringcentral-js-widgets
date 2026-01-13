import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
import {
  AudioInfo,
  MAX_RINGTONE_SIZE,
} from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import {
  RcIcon,
  RcText,
  RcMenuItem,
  useMountState,
  RcDivider,
} from '@ringcentral/juno';
import { ZoomIn } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';

import { isAudioFile, readAudioFile } from '../helper';
import { t } from '../i18n';
import styles from '../styles.scss';

interface RingtoneUploadButtonProps {
  customRingtoneNameList: string[];
  isButtonDisabled?: boolean;
  onUploadRingtone: ({ fileName, dataUrl }: AudioInfo) => void;
  showAlert: (message: string) => void;
  onClickAddButton: () => void;
}

export const RingtoneUploadButton: FunctionComponent<
  RingtoneUploadButtonProps
> = ({
  customRingtoneNameList,
  isButtonDisabled,
  onUploadRingtone,
  showAlert,
  onClickAddButton,
}) => {
  const isMountedRef = useMountState();
  const inputElRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <RcMenuItem
        key="add"
        data-sign="addRingtone"
        className={styles.addRingtoneItem}
        onClick={() => {
          if (inputElRef.current) {
            inputElRef.current.click();
          }
          onClickAddButton();
        }}
        disabled={isButtonDisabled}
      >
        <RcIcon symbol={ZoomIn} size="small" />
        <RcText title={t('add')} flexFull>
          {t('add')}
        </RcText>
        <input
          ref={inputElRef}
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
      </RcMenuItem>
      <RcDivider
        aria-hidden={true}
        tabIndex={-1}
        className={styles.addRingtoneDivider}
      />
    </>
  );
};
