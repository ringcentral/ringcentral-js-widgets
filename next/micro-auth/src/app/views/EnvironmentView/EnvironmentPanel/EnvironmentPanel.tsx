import { CaretLeftMd } from '@ringcentral/spring-icon';
import {
  Button,
  FormLabel,
  IconButton,
  Switch,
  TextField,
  Accordion,
  useChange,
  useRefState,
  Textarea,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { ChangeEventHandler, FC } from 'react';
import React, { useEffect, useState } from 'react';

export type EnvironmentData = {
  server: string;
  recordingHost: string;
  enabled: boolean;
  allowDataTracking: boolean;
  mfeDepsInfo?: string;
};

export type EnvironmentPanelProps = {
  /**
   * If true, show the data tracking setting
   */
  useDataTrackingSetting?: boolean;
  onSetData: (data: EnvironmentData) => void;
  defaultHidden?: boolean;
} & EnvironmentData;

export const EnvironmentPanel: FC<EnvironmentPanelProps> = (props) => {
  const {
    recordingHost,
    defaultHidden = true,
    useDataTrackingSetting = false,
    onSetData,
    enabled,
    allowDataTracking,
    server,
    mfeDepsInfo = '',
  } = props;

  const [serverValueRef, setServerValue] = useRefState(server);
  const [mfeDepsInfoRef, setMfeDepsInfo] = useRefState(mfeDepsInfo);
  const [recordingHostValueRef, setRecordingHostValue] =
    useRefState(recordingHost);
  const [enabledDataTrackingRef, setEnabledDataTracking] =
    useRefState(allowDataTracking);
  const [enabledValueRef, setEnabledValue] = useRefState(enabled);
  const [hidden, setHidden] = useState(defaultHidden);

  useChange(
    () => {
      // when open panel, reset value again
      if (!hidden) {
        setServerValue(server, false);
        setMfeDepsInfo(mfeDepsInfo, false);
        setRecordingHostValue(recordingHost, false);
        setEnabledValue(enabled, false);
        setEnabledDataTracking(allowDataTracking, false);
      }
    },
    () => hidden,
  );

  const onServerChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setServerValue(e.currentTarget.value);
  };

  const onMfeDepsInfoChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMfeDepsInfo(e.currentTarget.value);
  };

  const onRecordingHostChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRecordingHostValue(e.currentTarget.value);
  };

  const onToggleEnabled = () => {
    setEnabledValue(!enabledValueRef.current);
  };

  const onToggleDataTracking = () => {
    setEnabledDataTracking(!enabledDataTrackingRef.current);
  };

  const toggleEnv = () => {
    setHidden(!hidden);
  };

  const onOk = () => {
    onSetData({
      server: serverValueRef.current,
      mfeDepsInfo: mfeDepsInfoRef.current,
      recordingHost: recordingHostValueRef.current,
      enabled: enabledValueRef.current,
      allowDataTracking: enabledDataTrackingRef.current,
    });

    toggleEnv();
  };

  const onCancel = () => {
    setServerValue(server);
    setMfeDepsInfo(mfeDepsInfo);
    setRecordingHostValue(recordingHost);
    setEnabledValue(enabled);
    setEnabledDataTracking(allowDataTracking);
    toggleEnv();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).toggleEnv = toggleEnv;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverValue = serverValueRef.current;
  const mfeDepsInfoValue = mfeDepsInfoRef.current;
  const enabledValue = enabledValueRef.current;
  const enabledDataTrackingValue = enabledDataTrackingRef.current;
  const recordingHostValue = recordingHostValueRef.current;

  if (hidden) {
    return null;
  }

  const hasChanges = !(
    serverValue === server &&
    mfeDepsInfoValue === mfeDepsInfo &&
    enabledValue === enabled &&
    recordingHostValue === recordingHost &&
    enabledDataTrackingValue === allowDataTracking
  );

  return (
    <div
      className="flex flex-col h-full fixed top-0 left-0 z-modal"
      data-sign="environmentPanel"
    >
      <header className="flex items-center bg-neutral-base border-b border-neutral-b4 min-h-[38px] px-4 py-2">
        <IconButton
          data-sign="backButton"
          onClick={onCancel}
          size="medium"
          color="secondary"
          symbol={CaretLeftMd}
          variant="contained"
        />
        <h1 className="typography-title text-neutral-b0 ml-2">Environment</h1>
      </header>

      <div className="flex-1 overflow-auto p-4 bg-neutral-base">
        <Accordion header="Server setting" defaultExpanded>
          <div data-sign="serverDetails" className="flex flex-col gap-4">
            <div className="flex flex-col">
              <FormLabel>Server</FormLabel>
              <TextField
                value={serverValue}
                inputProps={{
                  'data-sign': 'envServerUrl',
                }}
                onChange={onServerChange}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="flex flex-col">
              <FormLabel>Recording Host</FormLabel>
              <TextField
                inputProps={{
                  'data-sign': 'envRecordingHost',
                }}
                value={recordingHostValue}
                onChange={onRecordingHostChange}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="typography-mainText">Enable</span>
              <Switch
                inputProps={
                  {
                    'data-sign': 'envToggle',
                  } as any
                }
                checked={enabledValue}
                onChange={onToggleEnabled}
              />
            </div>
          </div>
        </Accordion>

        {mfeDepsInfo ? (
          <div data-sign="mfeDetails" className="flex flex-col gap-4">
            <div className="flex flex-col">
              <FormLabel>MFE setting</FormLabel>
              <Textarea
                inputProps={{
                  'data-sign': 'mfeDepsInfo',
                }}
                value={mfeDepsInfoValue}
                onChange={onMfeDepsInfoChange}
                fullWidth
                variant="outlined"
              />
            </div>
          </div>
        ) : null}

        {useDataTrackingSetting && (
          <Accordion
            header="Analytics setting"
            defaultExpanded
            className="mt-4"
          >
            <div data-sign="analyticsDetails" className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-2">
                <span className="typography-mainText">
                  Enable Data Tracking
                </span>
                <Switch
                  data-sign="dataTrackingToggle"
                  checked={enabledDataTrackingValue}
                  onChange={onToggleDataTracking}
                />
              </div>
              <div className="text-danger typography-descriptor">
                {
                  // new project not need refresh anymore
                  // this variable only inside new builder, so use that to check
                  process.env.BUILD_ENVIRONMENT ? (
                    <span>
                      when you enable that manually, the enable will take{' '}
                      <b>two hours</b> enable, will auto close after{' '}
                      <b>two hours</b>
                    </span>
                  ) : (
                    <span>
                      After clicking save, remember to{' '}
                      <b>refresh to take effect</b>
                      (all tabs need to be closed) when you enable that
                      manually, the enable will take <b>two hours</b> enable,
                      will auto close after <b>two hours</b>
                    </span>
                  )
                }
              </div>
            </div>
          </Accordion>
        )}
      </div>

      <div className="p-4 border-t border-neutral-b4 bg-neutral-base">
        <Button
          data-sign="envSave"
          className={clsx(
            'w-full flex justify-center',
            !hasChanges && 'opacity-50',
          )}
          onClick={onOk}
          disabled={!hasChanges}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
