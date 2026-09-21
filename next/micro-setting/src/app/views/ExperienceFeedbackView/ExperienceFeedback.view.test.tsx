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
import { Subject } from 'rxjs';

import {
  EXPERIENCE_FEEDBACK_TRIGGER_EVENT,
  ExperienceFeedbackView,
  isExperienceFeedbackShowPayload,
} from './ExperienceFeedback.view';

function createExperienceFeedbackView({
  consumeRecentLogCallEvent = true,
}: { consumeRecentLogCallEvent?: boolean } = {}) {
  const guideDataSubject = new Subject<unknown>();
  const userpilotService = {
    guideData$: guideDataSubject.asObservable(),
    consumeRecentTrackedEvent: jest.fn(() => consumeRecentLogCallEvent),
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
          name: 'experience-feedback-test',
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
    ],
    main: ExperienceFeedbackView,
    render,
    devOptions: { autoComputed: true },
  });

  app.bootstrap();

  return {
    app,
    experienceFeedbackView: app.instance,
    guideDataSubject,
    portManager: app.container.get(PortManager),
    toast,
    userpilotService,
  };
}

const getCurrentTabId = (portManager: PortManager) =>
  portManager.clientId || portManager.activeTabId || 'default';

describe('ExperienceFeedbackView', () => {
  it('detects experience feedback guide show payloads', () => {
    expect(
      isExperienceFeedbackShowPayload({
        eventName: 'experience-feedback-show',
      }),
    ).toBe(true);
    expect(isExperienceFeedbackShowPayload('experience-feedback-show')).toBe(
      false,
    );
    expect(
      isExperienceFeedbackShowPayload({
        name: 'experience-feedback-show',
      }),
    ).toBe(false);
    expect(isExperienceFeedbackShowPayload({ eventName: 'other-event' })).toBe(
      false,
    );
  });

  it('does not open from guide payload without a recent LogCall track event', async () => {
    const {
      app,
      experienceFeedbackView,
      guideDataSubject,
      portManager,
      userpilotService,
    } = createExperienceFeedbackView({ consumeRecentLogCallEvent: false });

    await waitForRenderReady();

    act(() => {
      guideDataSubject.next({ eventName: 'experience-feedback-show' });
    });

    await waitFor(() => {
      expect(userpilotService.consumeRecentTrackedEvent).toHaveBeenCalledWith(
        EXPERIENCE_FEEDBACK_TRIGGER_EVENT,
      );
    });

    const currentTabId = getCurrentTabId(portManager);

    expect(experienceFeedbackView.openTabIds[currentTabId]).toBeUndefined();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(userpilotService.track).not.toHaveBeenCalled();

    app.destroy();
  });

  it('opens from guide payload with a recent LogCall track event and submits feedback to Userpilot', async () => {
    const {
      app,
      experienceFeedbackView,
      guideDataSubject,
      portManager,
      toast,
      userpilotService,
    } = createExperienceFeedbackView();

    await waitForRenderReady();

    act(() => {
      guideDataSubject.next({ eventName: 'experience-feedback-show' });
    });

    expect(
      await screen.findByText(
        'How was your experience using RingCentral for HubSpot?',
      ),
    ).toBeInTheDocument();
    const currentTabId = getCurrentTabId(portManager);

    expect(experienceFeedbackView.currentTabId).toBe(currentTabId);
    expect(experienceFeedbackView.openTabIds[currentTabId]).toBe(true);

    expect(userpilotService.consumeRecentTrackedEvent).toHaveBeenCalledWith(
      EXPERIENCE_FEEDBACK_TRIGGER_EVENT,
    );

    fireEvent.click(screen.getByText('Can be better'));

    await waitFor(() => {
      expect(experienceFeedbackView.openTabIds[currentTabId]).toBe(false);
      expect(userpilotService.track).toHaveBeenCalledWith(
        'experience-feedback-show',
      );
      expect(userpilotService.track).toHaveBeenCalledWith(
        'experience-feedback-submit-can-be-better',
        {
          feedback: 'can-be-better',
          showToast: true,
        },
      );
      expect(userpilotService.sendGuideData).toHaveBeenCalledWith(
        {
          action: 'submit',
          feedback: 'can-be-better',
          experience: 'Can be better',
        },
        isExperienceFeedbackShowPayload,
      );
      expect(toast.success).toHaveBeenCalledWith({
        message: 'Thanks for your feedback!',
      });
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    app.destroy();
  });

  it('sends dismiss feedback when the modal is closed', async () => {
    const {
      app,
      experienceFeedbackView,
      guideDataSubject,
      portManager,
      userpilotService,
    } = createExperienceFeedbackView();

    await waitForRenderReady();

    act(() => {
      guideDataSubject.next({ eventName: 'experience-feedback-show' });
    });

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    const currentTabId = getCurrentTabId(portManager);

    expect(experienceFeedbackView.currentTabId).toBe(currentTabId);
    expect(experienceFeedbackView.openTabIds[currentTabId]).toBe(true);

    fireEvent.click(screen.getByLabelText('Close feedback modal'));

    await waitFor(() => {
      expect(experienceFeedbackView.openTabIds[currentTabId]).toBe(false);
      expect(userpilotService.track).toHaveBeenCalledWith(
        'experience-feedback-dismiss',
      );
      expect(userpilotService.sendGuideData).toHaveBeenCalledWith(
        {
          action: 'dismiss',
        },
        isExperienceFeedbackShowPayload,
      );
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    app.destroy();
  });
});
