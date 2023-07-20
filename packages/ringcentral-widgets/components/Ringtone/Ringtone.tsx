/* istanbul ignore file */

// TODO: that component still not completely yet, view in calling settings, layout style issue, still in Technical Preview

import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { useAudio, useMountState } from '@ringcentral/juno';

import i18n from './i18n';
import type { AudioFileReaderProps, RingtoneProps } from './Ringtone.interface';
import styles from './styles.scss';

const AudioFileReader: FunctionComponent<AudioFileReaderProps> = ({
  currentLocale,
  defaultFileName,
  defaultDataUrl,
  fileName = null,
  dataUrl = null,
  onChange,
  onReset,
}) => {
  const isMountedRef = useMountState();
  const inputElRef = useRef<HTMLInputElement>(null);
  const [playing, setPlaying] = useState(false);

  const audio = useAudio((audio) => {
    audio.onplay = () => setPlaying(true);
    audio.onpause = () => setPlaying(false);

    if (dataUrl) {
      audio.src = dataUrl;
    }
  });

  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);

    if (dataUrl) {
      audio.src = dataUrl;
    }
  }, [audio, dataUrl]);

  const resetButton =
    fileName !== defaultFileName || dataUrl !== defaultDataUrl ? (
      <button type="button" onClick={onReset}>
        {i18n.getString('reset', currentLocale)}
      </button>
    ) : null;

  return (
    <div>
      <div>File: {fileName}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            if (inputElRef.current) {
              inputElRef.current.click();
            }
          }}
        >
          {i18n.getString('upload', currentLocale)}
        </button>
        {resetButton}
        <button
          type="button"
          onClick={async () => {
            if (playing) {
              audio.pause();
            } else {
              try {
                audio.currentTime = 0;
                await audio.play();
              } catch (err) {
                if (isMountedRef.current) {
                  console.log(err);
                  console.log(
                    'Failed to play audio, please select a different file',
                  );
                }
              }
            }
          }}
        >
          {playing
            ? i18n.getString('stop', currentLocale)
            : i18n.getString('play', currentLocale)}
        </button>
      </div>
      <input
        ref={inputElRef}
        className={styles.hidden}
        type="file"
        onChange={({ currentTarget }) => {
          if (currentTarget?.files?.length) {
            const file = currentTarget.files[0];

            const reader = new FileReader();

            reader.onload = () => {
              if (isMountedRef.current) {
                onChange({
                  fileName: file.name,
                  dataUrl: reader.result as string,
                });
                // reset input
                currentTarget.value = '';
              }
            };

            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};

export const RingTone: FunctionComponent<RingtoneProps> = ({
  currentLocale,
  incomingAudio,
  incomingAudioFile,
  outgoingAudio,
  outgoingAudioFile,
  defaultIncomingAudio,
  defaultIncomingAudioFile,
  defaultOutgoingAudio,
  defaultOutgoingAudioFile,
  showRingToneSettings,
  setIncomingAudio,
  setOutgoingAudio,
  resetIncomingAudio,
  resetOutgoingAudio,
}) => {
  if (showRingToneSettings) {
    return (
      // newline
      <div>
        <div>
          {`${i18n.getString('ringtones', currentLocale)} (Technical Preview)`}
        </div>
        <div>{i18n.getString('incomingRingtone', currentLocale)}</div>
        <AudioFileReader
          {...{
            currentLocale,
            fileName: incomingAudioFile,
            dataUrl: incomingAudio,
            defaultFileName: defaultIncomingAudioFile,
            defaultDataUrl: defaultIncomingAudio,
            onChange: ({ fileName, dataUrl }) => {
              setIncomingAudio?.({ fileName, dataUrl });
            },
            onReset: resetIncomingAudio,
          }}
        />
        <div>{i18n.getString('outgoingRingtone', currentLocale)}</div>
        <AudioFileReader
          {...{
            currentLocale,
            fileName: outgoingAudioFile,
            dataUrl: outgoingAudio,
            defaultFileName: defaultOutgoingAudioFile,
            defaultDataUrl: defaultOutgoingAudio,
            onChange: ({ fileName, dataUrl }) => {
              setOutgoingAudio?.({ fileName, dataUrl });
            },
            onReset: resetOutgoingAudio,
          }}
        />
      </div>
    );
  }
  return null;
};
