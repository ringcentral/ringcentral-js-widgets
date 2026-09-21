import { createMockAction } from '@ringcentral-integration/test-utils/lib/createMockAction';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { VoicemailPlayer } from '../../src/app/components/VoicemailPlayer/VoicemailPlayer';

jest.mock('@ringcentral/spring-ui', () => {
  const originalModule = jest.requireActual('@ringcentral/spring-ui');

  const mockAudio = {
    src: '',
    currentTime: 0,
    duration: 0,
    paused: true,
    pause: jest.fn(),
    play: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  return {
    ...originalModule,
    useAudio: () => mockAudio,
  };
});

describe('VoicemailPlayer', () => {
  const mockProps = {
    uri: 'test-uri',
    duration: 120, // 2 minutes
    onStartLoad: jest.fn(),
    onDownload: jest.fn(),
    audioStatus: {
      blobUrl: undefined,
      isPlaying: false,
      currentTime: 0,
      loading: false,
      duration: 120,
      isNetworkError: false,
    },
    updateAudioStatus: jest.fn(),
  };

  let actionSpy: ReturnType<typeof createMockAction>;

  beforeEach(() => {
    jest.clearAllMocks();
    actionSpy = createMockAction();
    const instance = require('@ringcentral/spring-ui').useAudio();

    instance.src = '';
    instance.currentTime = 0;
    instance.duration = 0;
    instance.paused = true;
    instance.addEventListener.mockImplementation(actionSpy.addListener);
    instance.removeEventListener.mockImplementation(actionSpy.removeListener);
  });

  afterEach(() => {
    actionSpy.destroy();
  });

  it('renders correctly in initial state', () => {
    render(<VoicemailPlayer {...mockProps} />);

    // Check if the component renders correctly
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument(); // current time
    expect(screen.getByText('02:00')).toBeInTheDocument(); // duration
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByTestId('download')).toBeInTheDocument();
  });

  it('shows loading indicator when loading is true', () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{ ...mockProps.audioStatus, loading: true }}
      />,
    );

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(screen.queryByTestId('play')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pause')).not.toBeInTheDocument();
  });

  it('changes to playing state when play button is clicked', async () => {
    render(<VoicemailPlayer {...mockProps} />);

    const playButton = screen.getByTestId('play');
    await userEvent.click(playButton);

    expect(mockProps.onStartLoad).toHaveBeenCalledWith(mockProps.uri);
    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      blobUrl: undefined,
      currentTime: 0,
      duration: 120,
      isNetworkError: false,
      loading: true,
      //
      isPlaying: true,
    });
  });

  it('resumes audio when play button is clicked', async () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{
          ...mockProps.audioStatus,
          isPlaying: false,
          blobUrl: 'blob:test-url',
        }}
      />,
    );

    const mockAudio = require('@ringcentral/spring-ui').useAudio();
    mockAudio.src = 'blob:test-url';
    expect(mockAudio.play).not.toHaveBeenCalled();

    const playButton = screen.getByTestId('play');
    await userEvent.click(playButton);

    expect(mockAudio.play).toHaveBeenCalled();
  });

  it('when playing received isPlaying false and audio.src is not set, it will pause the audio.', () => {
    const mockAudio = require('@ringcentral/spring-ui').useAudio();

    mockAudio.src = 'blob:test-url';

    mockAudio.paused = false;
    expect(mockAudio.pause).not.toHaveBeenCalled();
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{
          ...mockProps.audioStatus,
          isPlaying: false,
        }}
      />,
    );

    expect(mockAudio.pause).toHaveBeenCalled();
  });

  it('changes to paused state when pause button is clicked', async () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{ ...mockProps.audioStatus, isPlaying: true }}
      />,
    );

    const pauseButton = screen.getByTestId('pause');
    await userEvent.click(pauseButton);

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      currentTime: 0,
      duration: 120,
      isNetworkError: false,
      loading: false,
      //
      isPlaying: false,
    });
  });

  it('calls onDownload when download button is clicked', async () => {
    render(<VoicemailPlayer {...mockProps} />);

    const downloadButton = screen.getByTestId('download');
    await userEvent.click(downloadButton);

    expect(mockProps.onDownload).toHaveBeenCalled();
  });

  it('updates slider value based on current time', () => {
    const currentTime = 60; // 1 minute
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{ ...mockProps.audioStatus, currentTime }}
      />,
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');

    expect(screen.getByText('01:00')).toBeInTheDocument(); // current time
    expect(screen.getByText('02:00')).toBeInTheDocument(); // current time
  });

  it('updates time when slider is moved', () => {
    render(<VoicemailPlayer {...mockProps} />);

    const slider = screen.getByRole('slider');

    // Simulate moving slider to 75%
    fireEvent.change(slider, { target: { value: 75 } });
    // Simulate releasing the slider
    fireEvent.mouseUp(slider);

    // Should update time to 75% of duration (90 seconds)
    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      blobUrl: undefined,
      currentTime: 90,
      duration: 120,
      isNetworkError: false,
      isPlaying: false,
      loading: false,
    });
  });

  it('pause audio when slider is moved', () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{ ...mockProps.audioStatus, isPlaying: true }}
      />,
    );

    const slider = screen.getByRole('slider');

    mockProps.updateAudioStatus.mockClear();
    // Simulate moving slider to 75%
    fireEvent.change(slider, { target: { value: 75 } });
    // Simulate releasing the slider
    fireEvent.mouseUp(slider);

    // Should update time to 75% of duration (90 seconds)
    // emit pause event first
    expect(mockProps.updateAudioStatus).toHaveBeenNthCalledWith(1, {
      blobUrl: undefined,
      // that is the current time(0 is the current playing time)
      currentTime: 0,
      duration: 120,
      isNetworkError: false,
      isPlaying: false,
      loading: false,
    });

    expect(mockProps.updateAudioStatus).toHaveBeenNthCalledWith(2, {
      blobUrl: undefined,
      currentTime: 90,
      duration: 120,
      isNetworkError: false,
      isPlaying: true,
      loading: false,
    });
  });

  it('handles loadAudioFromOutside prop correctly', () => {
    const blobUrl = 'blob:test-url';
    render(
      <VoicemailPlayer
        {...mockProps}
        loadSourceExternally={true}
        audioStatus={{ ...mockProps.audioStatus, blobUrl }}
      />,
    );

    // With loadAudioFromOutside, it should use the provided blobUrl
    const mockAudio = require('@ringcentral/spring-ui').useAudio();
    expect(mockAudio.src).toBe(blobUrl);
  });

  it('does not show download button when onDownload is not provided', () => {
    const { onDownload, ...propsWithoutDownload } = mockProps;
    render(<VoicemailPlayer {...propsWithoutDownload} />);

    expect(screen.queryByTestId('download')).not.toBeInTheDocument();
  });

  it('should reset time when ended', () => {
    render(<VoicemailPlayer {...mockProps} />);

    actionSpy.action$.next(['ended', {}]);

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      currentTime: 0,
      duration: 120,
      isNetworkError: false,
      loading: false,
      isPlaying: false,
    });
  });

  it('should update time when timeupdate', () => {
    render(<VoicemailPlayer {...mockProps} />);

    const mockAudio = require('@ringcentral/spring-ui').useAudio();
    mockAudio.currentTime = 10;

    actionSpy.action$.next(['timeupdate', {}]);

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      currentTime: 10,
      duration: 120,
      isNetworkError: false,
      loading: false,
      isPlaying: false,
    });
  });

  it('should update duration when loadeddata', () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{ ...mockProps.audioStatus, loading: true }}
      />,
    );

    const mockAudio = require('@ringcentral/spring-ui').useAudio();
    mockAudio.currentTime = 0;
    mockAudio.duration = 500;

    actionSpy.action$.next(['loadeddata', {}]);

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      currentTime: 0,
      duration: 500,
      isNetworkError: false,
      loading: false,
      isPlaying: false,
    });
  });

  it('should update isNetworkError when error', () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{
          ...mockProps.audioStatus,
          currentTime: 10,
          loading: true,
          isPlaying: true,
        }}
      />,
    );

    const mockAudio = require('@ringcentral/spring-ui').useAudio();

    mockAudio.currentTime = 10;
    mockAudio.paused = false;

    actionSpy.action$.next(['error', {}]);

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      blobUrl: undefined,
      currentTime: 10,
      duration: 120,
      isNetworkError: true,
      loading: false,
      isPlaying: false,
    });

    expect(mockAudio.pause).toHaveBeenCalled();
  });

  it('should play when loadeddata', () => {
    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{
          ...mockProps.audioStatus,
          loading: true,
          isPlaying: true,
        }}
      />,
    );

    const mockAudio = require('@ringcentral/spring-ui').useAudio();
    expect(mockAudio.play).not.toHaveBeenCalled();

    mockAudio.paused = true;
    actionSpy.action$.next(['loadeddata', {}]);

    expect(mockAudio.play).toHaveBeenCalled();
  });

  it('destroys audio when unmount', () => {
    const mockAudio = require('@ringcentral/spring-ui').useAudio();

    const { unmount } = render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{
          ...mockProps.audioStatus,
          loading: true,
          isPlaying: true,
        }}
      />,
    );

    expect(mockAudio.removeEventListener).not.toHaveBeenCalled();

    mockProps.updateAudioStatus.mockClear();
    unmount();

    expect(mockAudio.removeEventListener).toHaveBeenCalled();

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      currentTime: 0,
      duration: 120,
      isNetworkError: false,
      loading: true,
      isPlaying: false,
    });
  });

  it('destroys audio when beforeunload', () => {
    const windowListenerSpy = createMockAction();
    jest
      .spyOn(global.window, 'addEventListener')
      .mockImplementation(windowListenerSpy.addListener);

    const mockAudio = require('@ringcentral/spring-ui').useAudio();

    render(
      <VoicemailPlayer
        {...mockProps}
        audioStatus={{
          ...mockProps.audioStatus,
          loading: true,
          isPlaying: true,
        }}
      />,
    );

    expect(mockAudio.removeEventListener).not.toHaveBeenCalled();

    mockProps.updateAudioStatus.mockClear();
    windowListenerSpy.action$.next(['beforeunload', {}]);

    expect(mockProps.updateAudioStatus).toHaveBeenCalledWith({
      currentTime: 0,
      duration: 120,
      isNetworkError: false,
      loading: true,
      isPlaying: false,
    });
  });
});
