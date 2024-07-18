jest.mock(
  '@ringcentral-integration/commons/modules/RingtoneConfiguration/const',
  () => {
    const list = [
      { id: 'phone_ring1' },
      { id: 'phone_ring2' },
      { id: 'acoustic_dreams' },
      { id: 'air_raid' },
      { id: 'allusive' },
      { id: 'attention' },
      { id: 'blub_blub' },
      { id: 'buzzy' },
      { id: 'channel_open' },
      { id: 'contemplation' },
      { id: 'crystal_ball' },
      { id: 'disco' },
      { id: 'door_bell' },
      { id: 'fairy' },
      { id: 'fast_bells' },
      { id: 'high_gong' },
      { id: 'immersion' },
      { id: 'indeed' },
      { id: 'lazy_day' },
      { id: 'neural_funk' },
      { id: 'nice' },
      { id: 'ring' },
      { id: 'ringing_bells' },
      { id: 'simple' },
      { id: 'soothing' },
      { id: 'sunshine' },
      { id: 'off' },
    ]
      .map((item) => ({
        ...item,
        url: item.id === 'off' ? '' : `${item.id}.mp3`,
      }))
      .slice(0);
    return {
      __esModule: true,
      ...jest.requireActual(
        '@ringcentral-integration/commons/modules/RingtoneConfiguration/const',
      ),
      DEFAULT_RINGTONE_LIST: list,
    };
  },
);
