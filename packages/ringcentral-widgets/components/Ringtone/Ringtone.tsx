import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useIsMounted } from '../../react-hooks/useIsMounted';
import styles from './styles.scss';
import i18n from './i18n';
import { AudioFileReaderProps, RingtoneProps } from './Ringtone.interface';

const AudioFileReader: FunctionComponent<AudioFileReaderProps> = ({
  currentLocale,
  defaultFileName,
  defaultDataUrl,
  fileName = null,
  dataUrl = null,
  onChange,
  onReset,
}) => {
  const isMountedRef = useIsMounted();
  const audioElRef = useRef(null);
  const inputElRef = useRef(null);
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    audioElRef.current.pause();
    audioElRef.current.currentTime = 0;
    setPlayState(false);
  }, [dataUrl]);

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
            if (audioElRef.current) {
              if (playState) {
                audioElRef.current.pause();
              } else {
                try {
                  audioElRef.current.currentTime = 0;
                  await audioElRef.current.play();
                } catch (err) {
                  if (isMountedRef.current) {
                    console.log(err);
                    console.log(
                      'Failed to play audio, please select a different file',
                    );
                  }
                }
              }
            }
          }}
        >
          {playState
            ? i18n.getString('stop', currentLocale)
            : i18n.getString('play', currentLocale)}
        </button>
      </div>
      <input
        ref={inputElRef}
        className={styles.hidden}
        type="file"
        onChange={({ currentTarget }) => {
          if (currentTarget.files.length) {
            const file = currentTarget.files[0];
            // const canPlayType = audioElRef.current?.canPlayType(file.type);
            // if (canPlayType !== '') {}
            const reader = new FileReader();
            reader.onload = () => {
              if (isMountedRef.current) {
                onChange({
                  fileName: file.name,
                  dataUrl: reader.result as string,
                });
                // reset input
                currentTarget.value = null;
              }
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <audio
        ref={audioElRef}
        className={styles.hidden}
        src={dataUrl}
        onPlay={() => {
          setPlayState(true);
        }}
        onPause={() => {
          setPlayState(false);
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
              setIncomingAudio({ fileName, dataUrl });
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
              setOutgoingAudio({ fileName, dataUrl });
            },
            onReset: resetOutgoingAudio,
          }}
        />
      </div>
    );
  }
  return null;
};
