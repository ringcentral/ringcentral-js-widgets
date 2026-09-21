import { UserpilotService } from '@ringcentral-integration/micro-auth/src/app/services';
import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  Brand,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  Initiator,
  PortManager,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { FeedbackView } from './Feedback.view';

function createFeedbackView() {
  const userpilotService = {
    track: jest.fn(),
    sendGuideData: jest.fn(),
  };
  const toast = {
    success: jest.fn(),
  };

  const app = testBed({
    modules: [
      Initiator,
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'feedback-view-test',
          type: 'Base',
        },
      },
      ThemePlugin,
      StoragePlugin,
      Locale,
      Brand,
      {
        provide: 'BrandConfig',
        useValue: {
          id: '1210',
          code: 'rc',
          name: 'RingCentral',
          appName: 'RingCentral for HubSpot',
          application: 'RingCentral for HubSpot',
          defaultLocale: 'en-US',
          supportedLocales: ['en-US'],
        },
      },
      {
        provide: UserpilotService,
        useValue: userpilotService,
      },
      {
        provide: Toast,
        useValue: toast,
      },
      {
        provide: 'FeedbackViewOptions',
        useValue: {
          reviewLink: 'https://example.com/review',
        },
      },
    ],
    main: FeedbackView,
    render,
    devOptions: { autoComputed: true },
  });

  app.bootstrap();

  return {
    app,
    feedbackView: app.instance,
    portManager: app.container.get(PortManager),
    toast,
    userpilotService,
  };
}

const getCurrentTabId = (portManager: PortManager) =>
  portManager.clientId || portManager.activeTabId || 'default';

describe('FeedbackView', () => {
  it('opens and closes the feedback dialog by current tab id', async () => {
    const { app, feedbackView, portManager, userpilotService } =
      createFeedbackView();

    await waitForRenderReady();

    await act(async () => {
      await feedbackView.openFeedback();
    });

    expect(
      await screen.findByText(/How was your experience using/i),
    ).toBeInTheDocument();
    const currentTabId = getCurrentTabId(portManager);

    expect(feedbackView.currentTabId).toBe(currentTabId);
    expect(feedbackView.openTabIds[currentTabId]).toBe(true);

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(feedbackView.openTabIds[currentTabId]).toBe(false);
      expect(userpilotService.sendGuideData).toHaveBeenCalledWith(
        {
          action: 'dismiss',
        },
        expect.any(Function),
      );
    });
    const matcher = userpilotService.sendGuideData.mock.calls[0][1];

    expect(matcher({ eventName: 'settings-rating-show' })).toBe(true);
    expect(matcher({ eventName: 'experience-feedback-show' })).toBe(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    app.destroy();
  });

  it('submits low-rating feedback and closes only the current tab', async () => {
    const { app, feedbackView, portManager, toast, userpilotService } =
      createFeedbackView();

    await waitForRenderReady();

    await act(async () => {
      await feedbackView.openFeedback();
    });

    const currentTabId = getCurrentTabId(portManager);
    expect(feedbackView.openTabIds[currentTabId]).toBe(true);

    fireEvent.click(
      document.querySelector('input[name="feedback-rating"][value="2"]')!,
      {
        clientX: 1,
      },
    );
    fireEvent.click(screen.getByText('Next'));
    fireEvent.change(screen.getByTestId('textarea-feedback'), {
      target: { value: 'App crashes frequently' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(feedbackView.openTabIds[currentTabId]).toBe(false);
      expect(userpilotService.sendGuideData).toHaveBeenCalledWith(
        {
          action: 'submit',
          feedbackText: 'App crashes frequently',
          selectedTags: [],
          rating: '2',
        },
        expect.any(Function),
      );
      expect(toast.success).toHaveBeenCalledWith({
        message: 'Thanks for your feedback!',
      });
    });
    const matcher = userpilotService.sendGuideData.mock.calls[0][1];

    expect(matcher({ eventName: 'settings-rating-show' })).toBe(true);
    expect(matcher({ eventName: 'experience-feedback-show' })).toBe(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    app.destroy();
  });
});
