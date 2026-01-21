import {
  getFileNameWithoutExt,
  type RINGS_TYPE,
  type RingtoneItem,
} from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PlayMd, PlusMd, TrashMd } from '@ringcentral/spring-icon';
import {
  Divider,
  Icon,
  IconButton,
  ListItemText,
  MenuItem,
  Option,
  Select,
  Text,
  useAudio,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { RemoveRingtoneDialog } from './components/RemoveRingtoneDialog';
import { RingtoneUploadButton } from './components/RingtoneUploadButton';
import i18n from './i18n';
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
  const { t } = useLocale(i18n);
  const [playing, setPlaying] = useState(false);
  const [playingId, setPlayingId] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const inputElRef = useRef<HTMLInputElement>(null);
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
        <Text
          data-sign="ringtoneSelectionLabel"
          className="text-neutral-b0 typography-mainText"
          component="p"
        >
          {label}
        </Text>
      ) : null}
      <Select
        displayEmpty
        size="medium"
        className="w-full [&_.sui-form-field-focus-effect]:border-none"
        classes={{
          content: 'border-none',
        }}
        disabled={isDisabled}
        MenuProps={{
          onExitComplete: () => {
            turnOffAudio();
          },
        }}
        focused={false}
        ref={ref}
        data-sign="ringtoneSelection"
        value={selectedRingtoneId}
        renderValue={(id: string) => {
          let label;
          const selected = ringtoneList.find((ringtone) => ringtone.id === id);
          if (!selected) {
            label = '';
          } else {
            const { type, name } = selected;
            label =
              type === 'default'
                ? t(id as RINGS_TYPE)
                : getFileNameWithoutExt(name!);
          }
          return <span className="text-neutral-b2">{label}</span>;
        }}
      >
        {enableCustomRingtone && (
          <>
            <MenuItem
              key="add"
              data-sign="addRingtone"
              className={clsx(styles.addRingtoneItem, 'py-0')}
              onClick={(e) => {
                turnOffAudio();
                e.stopPropagation();
                if (inputElRef.current) {
                  inputElRef.current.click();
                }
              }}
              disabled={isUploadRingtoneDisabled}
              classes={{
                container: 'w-full gap-3',
              }}
            >
              <Icon symbol={PlusMd} size="small" />
              <Text className="flex-1">{t('add')}</Text>
            </MenuItem>
            <Divider
              aria-hidden={true}
              tabIndex={-1}
              className={styles.addRingtoneDivider}
            />
          </>
        )}
        <div className="max-h-60 overflow-y-auto overflow-x-hidden">
          {ringtoneList.map((ringtone) => {
            const { id, type, name, url } = ringtone;
            const isDefaultRingtone = type === 'default';
            return (
              <Option
                key={id}
                className={styles.ringtoneItem}
                classes={{
                  container: 'w-full flex',
                }}
                value={id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedRingtoneId !== id) {
                    updateCurrentRingtone(id);
                  }
                }}
              >
                <ListItemText>
                  {isDefaultRingtone
                    ? t(id as RINGS_TYPE)
                    : getFileNameWithoutExt(name!)}
                </ListItemText>
                <i className="flex-auto" />
                {url && (
                  <div className="flex items-center gap-1">
                    {!isDefaultRingtone && (
                      <IconButton
                        symbol={TrashMd}
                        TooltipProps={{ title: t('delete') }}
                        size="small"
                        variant="icon"
                        data-sign="delete"
                        className="text-neutral-b2"
                        color="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setRingtonePlanToRemoved({ id, name: name! });
                        }}
                      />
                    )}
                    <IconButton
                      symbol={PlayMd}
                      data-sign="play"
                      TooltipProps={{ title: t('play') }}
                      size="small"
                      variant="icon"
                      className="text-neutral-b2"
                      color={
                        playing && id === playingId ? 'primary' : 'secondary'
                      }
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          turnOffAudio();
                          if (ringtoneDeviceId === 'off' || !ringtoneDeviceId) {
                            return;
                          }
                          setPlayingId(id);
                          audio.src = url;
                          setAudioUrl(url);
                          audio.play();
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    />
                  </div>
                )}
              </Option>
            );
          })}
        </div>
      </Select>
      {enableCustomRingtone && (
        <RingtoneUploadButton
          ref={inputElRef}
          customRingtoneNameList={customRingtoneNameList}
          showAlert={(message) => {
            showAlert(message);
          }}
          onUploadRingtone={(info) => {
            uploadCustomRingtone(info);
          }}
        />
      )}
    </div>
  );
};
