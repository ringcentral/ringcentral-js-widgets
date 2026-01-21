jest.mock(
  '@ringcentral-integration/micro-phone/src/app/services/VolumeInspector/utils/createAudioElement',
  () => ({
    createAudioElement: () => ({
      src: '',
      srcObject: '',
      volume: 0,
      currentTime: 0,
      captureStream: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      setSinkId: jest.fn(),
    }),
  }),
);
