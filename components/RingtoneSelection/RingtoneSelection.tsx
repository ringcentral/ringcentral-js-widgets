import {
  getFileNameWithoutExt,
  type RINGS_TYPE,
  type RingtoneItem,
} from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import {
  RcIcon,
  RcMenuItem,
  RcSelect,
  RcText,
  RcTooltip,
  RcTypography,
  useAudio,
} from '@ringcentral/juno';
import { PlayCircleBorder, Delete } from '@ringcentral/juno-icon';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { RemoveRingtoneDialog } from './components/RemoveRingtoneDialog';
import { RingtoneUploadButton } from './components/RingtoneUploadButton';
import { t } from './i18n';
import styles from './styles.scss';

export interface RingtoneSelectionProps {
  ringtoneList: RingtoneItem[];
  selectedRingtoneId: string;
  ringtoneDeviceId?: string;
  enableCustomRingtone?: boolean;
  volume?: number;
  label?: string;
  isDisabled?: boolean;
  isUploadRingtoneDisabled?: boolean;
  updateCurrentRingtone: (id: string) => void;
  removeCustomRingtone: (id: string) => void;
  uploadCustomRingtone: (props: any) => void;
  showAlert: (message: string) => void;
}

export const RingtoneSelection = ({
  label,
  volume,
  isDisabled,
  ringtoneList,
  ringtoneDeviceId,
  selectedRingtoneId,
  enableCustomRingtone,
  isUploadRingtoneDisabled,
  updateCurrentRingtone,
  uploadCustomRingtone,
  removeCustomRingtone,
  showAlert,
}: RingtoneSelectionProps) => {
  const [playing, setPlaying] = useState(false);
  const [playingId, setPlayingId] = useState('');
  const [open, setOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [ringtonePlanToRemoved, setRingtonePlanToRemoved] = useState<{
    id: string;
    name: string;
  }>({
    id: '',
    name: '',
  });

  const audio = useAudio((audio) => {
    const resetPlaying = () => {
      setPlaying(false);
      setPlayingId('');
    };
    audio.onplay = () => setPlaying(true);
    audio.onpause = resetPlaying;
    audio.onended = resetPlaying;
    audio.onerror = resetPlaying;
    if (volume !== undefined) {
      audio.volume = volume;
    }

    if (audioUrl) {
      audio.src = audioUrl;
    }
    if (ringtoneDeviceId) {
      audio.setSinkId?.(ringtoneDeviceId);
    }
  });

  const turnOffAudio = useCallback(() => {
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, playing]);

  const customRingtoneNameList = useMemo(() => {
    const customRingtoneList = ringtoneList.filter(
      (ringtone) => ringtone.type === 'custom',
    );
    return customRingtoneList.map((ringtone) => ringtone.name!);
  }, [ringtoneList]);

  useEffect(() => {
    if (volume !== undefined) {
      audio.volume = volume;
    }
    if (ringtoneDeviceId) {
      audio.setSinkId?.(ringtoneDeviceId);
    }
  }, [audio, volume, ringtoneDeviceId]);

  return (
    <div
      className={styles.ringtoneContainer}
      data-sign="ringtoneSelectionContainer"
    >
      {enableCustomRingtone && (
        <RemoveRingtoneDialog
          name={getFileNameWithoutExt(ringtonePlanToRemoved.name)}
          open={!!(ringtonePlanToRemoved.id && ringtonePlanToRemoved.name)}
          onCancel={() => setRingtonePlanToRemoved({ id: '', name: '' })}
          onConfirm={() => {
            setRingtonePlanToRemoved({ id: '', name: '' });
            removeCustomRingtone(ringtonePlanToRemoved.id);
          }}
        />
      )}
      {label ? (
        <RcTypography
          data-sign="ringtoneSelectionLabel"
          variant="body2"
          color="neutral.f06"
        >
          {label}
        </RcTypography>
      ) : null}
      <RcSelect
        displayEmpty
        fullWidth
        disabled={isDisabled}
        MenuProps={{
          PopoverClasses: {
            paper: styles.ringtonePopover,
          },
        }}
        open={open}
        variant="box"
        data-sign="ringtoneSelection"
        value={selectedRingtoneId}
        onOpen={() => setOpen(true)}
        onClose={() => {
          turnOffAudio();
          setOpen(false);
        }}
      >
        {enableCustomRingtone && (
          <RingtoneUploadButton
            isButtonDisabled={isUploadRingtoneDisabled}
            customRingtoneNameList={customRingtoneNameList}
            showAlert={(message) => {
              showAlert(message);
              setOpen(false);
            }}
            onUploadRingtone={(info) => {
              uploadCustomRingtone(info);
              setOpen(false);
            }}
            onClickAddButton={turnOffAudio}
          />
        )}
        {ringtoneList.map((ringtone) => {
          const { id, type, name, url } = ringtone;
          const isDefaultRingtone = type === 'default';
          return (
            <RcMenuItem
              key={id}
              className={styles.ringtoneItem}
              value={id}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedRingtoneId !== id) {
                  updateCurrentRingtone(id);
                }
                setOpen(false);
              }}
            >
              <RcText>
                {isDefaultRingtone
                  ? t(id as RINGS_TYPE)
                  : getFileNameWithoutExt(name!)}
              </RcText>
              {url && (
                <div className={styles.actionWrapper}>
                  {!isDefaultRingtone && (
                    <RcTooltip title={t('delete')}>
                      <RcIcon
                        symbol={Delete}
                        size="small"
                        className={styles.deleteIcon}
                        color="action.grayDark"
                        onClick={(e) => {
                          e.stopPropagation();
                          turnOffAudio();
                          setOpen(false);
                          setRingtonePlanToRemoved({ id, name: name! });
                        }}
                      />
                    </RcTooltip>
                  )}
                  <RcTooltip title={t('play')}>
                    <RcIcon
                      symbol={PlayCircleBorder}
                      size="small"
                      color={
                        playing && id === playingId
                          ? 'action.primary'
                          : 'action.grayDark'
                      }
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          turnOffAudio();
                          if (ringtoneDeviceId === 'off' || !ringtoneDeviceId) {
                            return;
                          }
                          if (id !== playingId) {
                            audio.src = url;
                            setAudioUrl(url);
                            setPlayingId(id);
                          }
                          audio.play();
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    />
                  </RcTooltip>
                </div>
              )}
            </RcMenuItem>
          );
        })}
      </RcSelect>
    </div>
  );
};
