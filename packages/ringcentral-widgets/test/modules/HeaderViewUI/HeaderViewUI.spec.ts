import { mockModuleGenerator } from '@ringcentral-integration/commons/test/lib/mockModule';

import { HeaderViewUI } from '../../../modules/HeaderViewUI';
import type { Deps } from '../../../modules/HeaderViewUI/HeaderViewUI.interface';

describe('HeaderViewUI', () => {
  it('onCurrentCallBtnClick', async () => {
    const routerPushMock = jest.fn();
    const userGuideMock = jest.fn();
    const quickAccessMock = jest.fn();
    const webphoneMock = jest.fn();

    const deps = {
      auth: {},
      callMonitor: {},
      routerInteraction: {
        currentPath: '/notActiveCalls',
        push: routerPushMock,
      },
      locale: {},
      webphone: {
        ringSession: {
          id: 'testActiveId',
          minimized: false,
        },
        toggleMinimized: webphoneMock,
      },
      presence: {},
      userGuide: {
        dismiss: userGuideMock,
      },
      quickAccess: {
        exit: quickAccessMock,
      },
    } as unknown as Deps;
    const instance = mockModuleGenerator(new HeaderViewUI(deps));
    instance.getUIFunctions({} as any).onCurrentCallBtnClick();

    expect(routerPushMock).toHaveBeenCalledWith('/calls/active');
    expect(userGuideMock).toHaveBeenCalledWith();
    expect(quickAccessMock).toHaveBeenCalledWith();
    expect(webphoneMock).toHaveBeenCalledWith('testActiveId');
  });

  it('onViewCallBtnClick', async () => {
    const routerPushMock = jest.fn();
    const userGuideMock = jest.fn();
    const quickAccessMock = jest.fn();
    const webphoneMock = jest.fn();

    const deps = {
      auth: {},
      callMonitor: {},
      routerInteraction: {
        currentPath: '/notCalls',
        push: routerPushMock,
      },
      locale: {},
      webphone: {
        ringSession: {
          id: 'testActiveId',
          minimized: false,
        },
        toggleMinimized: webphoneMock,
      },
      presence: {},
      userGuide: {
        dismiss: userGuideMock,
      },
      quickAccess: {
        exit: quickAccessMock,
      },
    } as unknown as Deps;
    const instance = mockModuleGenerator(new HeaderViewUI(deps));
    instance.getUIFunctions({} as any).onViewCallBtnClick();

    expect(routerPushMock).toHaveBeenCalledWith('/calls');
    expect(userGuideMock).toHaveBeenCalledWith();
    expect(quickAccessMock).toHaveBeenCalledWith();
    expect(webphoneMock).toHaveBeenCalledWith('testActiveId');
  });
});
