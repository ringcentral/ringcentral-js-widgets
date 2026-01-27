import { MicLevel } from './MicLevel';
import { LEVEL_CHECK_INTERVAL } from './const';

export class MicLevelHelper {
  private readonly micLevel = new MicLevel();

  constructor() {
    this.micLevel.setInterval(LEVEL_CHECK_INTERVAL);
  }

  async setupMicMedia(deviceId?: string): Promise<MediaStream> {
    const result = await this.micLevel.setupMicMedia(deviceId);
    if (result instanceof Error) {
      console.warn('setup mic media error.', result);
      throw result;
    }
    return result;
  }

  async listenToMic(dataCallback: (volume: number) => void): Promise<any> {
    const result = await this.micLevel.listenToMic(dataCallback);
    if (result instanceof Error) {
      console.warn('register mic listener error.', result);
      throw result;
    }
    return result;
  }

  clear(): void {
    this.micLevel.clear();
  }
}
