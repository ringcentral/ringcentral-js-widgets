import { MAX_RECORDING_TIME, MEDIA_TYPE } from './const';

export class MediaRecorderHelper {
  private recordingTimer: ReturnType<typeof setTimeout> | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedMedia: string | null = null;
  private recordedChunks: Blob[] = [];
  private recordingTime = 0;
  private recordingCompleteCallback:
    | ((src: string, recordingTime: number) => void)
    | null = null;
  private updateRecordingTimeCallback:
    | ((recordingTime: number) => void)
    | null = null;
  get countDown() {
    return Math.ceil((MAX_RECORDING_TIME - this.recordingTime) / 1000);
  }

  setRecordingTime(recordingTime: number) {
    this.recordingTime = recordingTime;
    this.updateRecordingTimeCallback?.(recordingTime);
  }

  setUpdateRecordingTimeCallback(callback: any) {
    this.updateRecordingTimeCallback = callback;
  }

  setRecordingCompleteCallback(callback: any) {
    this.recordingCompleteCallback = callback;
  }

  startRecording(stream: MediaStream) {
    this.cleanupRecording();
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: MEDIA_TYPE });
    this.mediaRecorder.ondataavailable = (e) => {
      this.recordedChunks.push(e.data);
    };
    this.mediaRecorder.onstop = this.onRecordingComplete;
    const recordingStarted = Date.now();
    this.mediaRecorder.start();
    this.recordingTimer = setInterval(() => {
      const recordingTime = Date.now() - recordingStarted;
      this.setRecordingTime(recordingTime);
      if (recordingTime >= MAX_RECORDING_TIME) {
        this.stopRecording();
      }
    }, 1000);
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (error) {
        console.error('Recording stop failed', error);
        this.cleanupRecording();
        throw error;
      }
    }
  }

  private cleanupRecording() {
    if (this.recordingTimer) {
      clearInterval(this.recordingTimer);
      this.recordingTimer = null;
    }
    if (this.recordedMedia) {
      URL.revokeObjectURL(this.recordedMedia);
    }
    this.setRecordingTime(0);
  }

  private readonly onRecordingComplete = () => {
    const recordingTime = this.recordingTime;
    this.cleanupRecording();
    const blob = new Blob(this.recordedChunks, { type: MEDIA_TYPE });
    this.recordedMedia = URL.createObjectURL(blob);
    this.recordingCompleteCallback?.(this.recordedMedia, recordingTime);
  };
}
