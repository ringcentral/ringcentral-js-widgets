export interface fileChangeProps {
  fileName: string;
  dataUrl: string;
}

export interface RingtoneBaseProps {
  currentLocale: string;
  incomingAudio?: string;
  incomingAudioFile?: string;
  outgoingAudio?: string;
  outgoingAudioFile?: string;
  defaultIncomingAudio?: string;
  defaultIncomingAudioFile?: string;
  defaultOutgoingAudio?: string;
  defaultOutgoingAudioFile?: string;
  showRingToneSettings: boolean;
}

export interface RingtoneProps extends RingtoneBaseProps {
  setIncomingAudio?: (props: fileChangeProps) => void;
  setOutgoingAudio?: (props: fileChangeProps) => void;
  resetIncomingAudio?: () => void;
  resetOutgoingAudio?: () => void;
}

export interface AudioFileReaderProps {
  currentLocale: string;
  fileName?: string;
  dataUrl?: string;
  defaultFileName: string | undefined;
  defaultDataUrl: string | undefined;
  onChange: (props: fileChangeProps) => void;
  onReset?: () => void;
}
