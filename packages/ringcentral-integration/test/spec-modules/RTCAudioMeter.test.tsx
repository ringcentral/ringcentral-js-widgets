import { RTCAudioMeter } from '../../modules/VolumeInspector/RTCAudioMeter';

describe('RTCAudioMeter', () => {
  let audioMeter: RTCAudioMeter | null;

  beforeEach(() => {
    audioMeter = new RTCAudioMeter();
  });

  afterEach(() => {
    audioMeter = null;
  });

  describe('_initialize', () => {
    it('check _initialize', () => {
      RTCAudioMeter['_audioCtx'] = {
        createAnalyser: jest.fn().mockReturnValue({}),
        createMediaStreamSource: jest.fn().mockReturnValue({
          connect: jest.fn(),
        }),
      } as any;
      audioMeter!._initialize();
      expect(audioMeter!['_analyser']).toBeDefined();
      expect(audioMeter!['_data']).toBeDefined();
    });
  });

  describe('updateInputStream', () => {
    it('should update the input stream', async () => {
      const input = new MediaStream();
      RTCAudioMeter['_audioCtx'] = {
        createMediaStreamSource: jest.fn().mockReturnValue({
          connect: jest.fn(() => {
            throw new Error('Test error');
          }),
        }),
      } as any;
      audioMeter!['_analyser'] = {} as any;
      await expect(audioMeter!.updateInputStream(input)).rejects.toThrow();
    });

    it('should reject if there is no audioContext or audioNode', async () => {
      const input = new MediaStream();
      audioMeter!['_analyser'] = undefined;
      await expect(audioMeter!.updateInputStream(input)).rejects.toThrow(
        'There is no audioContext or audioNode',
      );
    });

    it('should disconnect the old audio source if it exists', async () => {
      const input = new MediaStream();
      audioMeter!['_source'] = {
        disconnect: jest.fn(),
      } as any;
      RTCAudioMeter['_audioCtx'] = {
        createMediaStreamSource: jest
          .fn()
          .mockReturnValue({ connect: jest.fn() }),
      } as any;
      audioMeter!['_analyser'] = {} as any;
      const disconnectSpy = jest.spyOn(audioMeter!['_source']!, 'disconnect');
      await audioMeter!.updateInputStream(input);
      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should activate audioContext if it is suspended', async () => {
      const input = new MediaStream();
      audioMeter!['_analyser'] = {} as any;
      RTCAudioMeter['_audioCtx'] = {
        createMediaStreamSource: jest
          .fn()
          .mockReturnValue({ connect: jest.fn() }),
        state: 'suspended',
        resume: jest.fn(),
      } as any;
      const resumeSpy = jest.spyOn(RTCAudioMeter['_audioCtx']!, 'resume');
      await audioMeter!.updateInputStream(input);
      expect(resumeSpy).toHaveBeenCalled();
    });

    it('should create a media element source if input is an HTMLMediaElement', async () => {
      const input = document.createElement('audio');
      audioMeter!['_analyser'] = {} as any;
      RTCAudioMeter['_audioCtx'] = {
        createMediaElementSource: jest
          .fn()
          .mockReturnValue({ connect: jest.fn() }),
      } as any;
      const createMediaElementSourceSpy = jest.spyOn(
        RTCAudioMeter['_audioCtx']!,
        'createMediaElementSource',
      );
      await audioMeter!.updateInputStream(input);
      expect(createMediaElementSourceSpy).toHaveBeenCalled();
    });

    // it('should create a media stream source if input is a MediaStream', async () => {
    //   const input = new MediaStream();
    //   await audioMeter!.updateInputStream(input);
    //   expect(audioMeter!['_source']).toBeInstanceOf(MediaStreamAudioSourceNode);
    // });
  });

  describe('getMicLevel', () => {
    it('should return 0 if audioContext or audioNode is not available', () => {
      expect(audioMeter!.getMicLevel()).toBe(0);
    });

    it('should return the mic level', () => {
      audioMeter!['_source'] = {} as any;
      audioMeter!['_analyser'] = {} as any;
      audioMeter!['_data'] = new Uint8Array(32);
      RTCAudioMeter['_audioCtx'] = { state: 'running' } as any;
      audioMeter!['_analyser']!.getByteFrequencyData = jest.fn();
      audioMeter!['_data'].fill(100);
      const micLevel = audioMeter!.getMicLevel();
      expect(micLevel).toBeGreaterThanOrEqual(0);
      expect(micLevel).toBeLessThanOrEqual(1);
    });

    it('should return 0 if there is an error', () => {
      audioMeter!['_source'] = {} as any;
      audioMeter!['_analyser'] = {} as any;
      audioMeter!['_data'] = new Uint8Array(32);
      audioMeter!['_audioCtx'] = { state: 'running' } as any;
      audioMeter!['_analyser']!.getByteFrequencyData = jest.fn(() => {
        throw new Error('Test error');
      });
      const micLevel = audioMeter!.getMicLevel();
      expect(micLevel).toBe(0);
    });
  });
});
