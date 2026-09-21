import { testBed } from '@ringcentral-integration/next-core';
import { of, Subject } from 'rxjs';

import { Auth } from '../Auth';
import { TrackPropsService } from '../TrackPropsService';

import { UserpilotService } from './UserpilotService';
import type { GuideDataEvent } from './utils';
import { registerGuideDataListener } from './utils';

jest.mock('userpilot', () => ({
  Userpilot: {
    initialize: jest.fn(),
    clean: jest.fn(),
    identify: jest.fn(),
    reload: jest.fn(),
    track: jest.fn(),
  },
}));

jest.mock('./utils', () => ({
  registerGuideDataListener: jest.fn(),
}));

const mockRegisterGuideDataListener = jest.mocked(registerGuideDataListener);

function createUserpilotService({ appToken = '' }: { appToken?: string } = {}) {
  const app = testBed({
    main: UserpilotService,
    modules: [
      {
        provide: Auth,
        useValue: {
          ownerId: undefined,
          ownerId$: of(null),
        },
      },
      {
        provide: TrackPropsService,
        useValue: {
          getTrackProps: jest.fn(),
        },
      },
      {
        provide: 'UserpilotServiceOptions',
        useValue: {
          appToken,
        },
      },
    ],
  });

  return app;
}

describe('UserpilotService', () => {
  let guideDataListenerSubject: Subject<GuideDataEvent>;

  beforeEach(() => {
    guideDataListenerSubject = new Subject<GuideDataEvent>();
    mockRegisterGuideDataListener.mockReturnValue(
      guideDataListenerSubject.asObservable(),
    );
  });

  it('keeps the latest 10 local tracked event names', () => {
    const app = createUserpilotService();
    const service = app.instance;

    Array.from({ length: 12 }, (_, index) => `event-${index}`).forEach(
      (eventName) => service.track(eventName, { appName: 'Test App' }),
    );

    expect(service.recentTrackedEventNames).toEqual([
      'event-2',
      'event-3',
      'event-4',
      'event-5',
      'event-6',
      'event-7',
      'event-8',
      'event-9',
      'event-10',
      'event-11',
    ]);
    expect(service.hasRecentTrackedEvent('event-1')).toBe(false);
    expect(service.hasRecentTrackedEvent('event-2')).toBe(true);
    expect(service.hasRecentTrackedEvent('event-11')).toBe(true);

    const recentEvents = service.recentTrackedEventNames;
    recentEvents.push('mutated-event');

    expect(service.recentTrackedEventNames).not.toContain('mutated-event');

    app.destroy();
  });

  it('consumes the matching recent tracked event name', () => {
    const app = createUserpilotService();
    const service = app.instance;

    ['Int_CRM_logCall', 'event-1', 'Int_CRM_logCall', 'event-2'].forEach(
      (eventName) => service.track(eventName, { appName: 'Test App' }),
    );

    expect(service.consumeRecentTrackedEvent('Int_CRM_logCall')).toBe(true);
    expect(service.recentTrackedEventNames).toEqual(['event-1', 'event-2']);
    expect(service.consumeRecentTrackedEvent('missing-event')).toBe(false);
    expect(service.recentTrackedEventNames).toEqual(['event-1', 'event-2']);

    app.destroy();
  });

  it('sends guide data only when the pending matcher accepts the guide payload', () => {
    const app = createUserpilotService({ appToken: 'test-token' });
    const service = app.instance;
    const send = jest.fn();

    guideDataListenerSubject.next({
      send,
      payload: { eventName: 'settings-rating-show' },
    });

    service.sendGuideData({ action: 'submit' }, (payload) => {
      return (
        !!payload &&
        typeof payload === 'object' &&
        !Array.isArray(payload) &&
        payload.eventName === 'experience-feedback-show'
      );
    });

    expect(send).not.toHaveBeenCalled();

    service.sendGuideData({ action: 'submit' }, (payload) => {
      return (
        !!payload &&
        typeof payload === 'object' &&
        !Array.isArray(payload) &&
        payload.eventName === 'settings-rating-show'
      );
    });

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ action: 'submit' });

    app.destroy();
  });

  it('does not send guide data when the matcher throws', () => {
    const app = createUserpilotService({ appToken: 'test-token' });
    const service = app.instance;
    const send = jest.fn();
    const warnSpy = jest.spyOn(service['logger'], 'warn').mockImplementation();

    guideDataListenerSubject.next({
      send,
      payload: { eventName: 'settings-rating-show' },
    });

    service.sendGuideData({ action: 'submit' }, () => {
      throw new Error('matcher failed');
    });

    expect(send).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to match guide data payload',
      expect.any(Error),
    );

    app.destroy();
  });
});
