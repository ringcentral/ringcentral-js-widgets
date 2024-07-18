/* eslint-disable @typescript-eslint/no-empty-function */
import { Events } from '@rc-ex/ws';
import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  ut,
  When,
} from '@ringcentral-integration/test-utils';
import { EventEmitter } from 'events';
import WebSocket from 'isomorphic-ws';

import {
  webSocketReadyStates,
  RingCentralExtensions,
  InactiveTabEventName,
  SyncTokensTabEventName,
} from '../../modules/RingCentralExtensions';
import { mockModuleGenerator } from '../lib/mockModule';

@autorun(test)
@ut
@title('RingCentralExtensions Test')
export class RingCentralExtensionsTest extends Step {
  run() {
    return (
      <Scenario desc="RingCentralExtensions">
        <Given
          desc="Create an RingCentralExtensions instance with default value"
          action={(_: unknown, context: any) => {
            context.instance = new RingCentralExtensions({} as any);
            expect(context.instance.isWebSocketReady).toEqual(false);
            expect(context.instance.debugMode).toEqual(false);
            expect(context.instance.isTabActive).toEqual(false);
            expect(context.instance.disconnectOnInactive).toEqual(false);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'onInitOnce' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _setupInfra() {},
              _bindEvents() {},
            });
            context._setupInfraSpy = jest.spyOn(
              context.mockModule,
              '_setupInfra',
            );
            context._bindEventsSpy = jest.spyOn(
              context.mockModule,
              '_bindEvents',
            );
            await context.instance.onInitOnce.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context._setupInfraSpy).toHaveBeenCalledTimes(1);
            expect(context._bindEventsSpy).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'onInitSuccess' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              recoverWebSocketConnection() {},
            });
            // normal path
            context.recoverWebSocketConnectionSpy = jest.spyOn(
              context.mockModule,
              'recoverWebSocketConnection',
            );
            await context.instance.onInitSuccess.call(context.mockModule);
            // error path
            context.recoverWebSocketConnectionSpy.mockImplementation(() => {
              throw new Error();
            });
            await context.instance.onInitSuccess.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.recoverWebSocketConnectionSpy).toHaveBeenCalledTimes(
              2,
            );
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setupInfra' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _wsConnectionReady: undefined,
              debugMode: true,
              sdk: { request() {} },
              _deps: {
                auth: { loggedIn: true },
              },
              _exposeConnectionEvents() {},
              _syncWsReadyState() {},
              _installWebSocketExtension() {},
              _saveTokens() {},
              _useTokens: (RingCentralExtensions.prototype as any)._useTokens,
            });
            context._exposeConnectionEventsSpy = jest.spyOn(
              context.mockModule,
              '_exposeConnectionEvents',
            );
            context._syncWsReadyStateSpy = jest.spyOn(
              context.mockModule,
              '_syncWsReadyState',
            );
            context._installWebSocketExtensionSpy = jest.spyOn(
              context.mockModule,
              '_installWebSocketExtension',
            );
            context._saveTokensSpy = jest.spyOn(
              context.mockModule,
              '_saveTokens',
            );
            context._useTokensSpy = jest.spyOn(
              context.mockModule,
              '_useTokens',
            );
            await context.instance._setupInfra.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={async (_: unknown, context: any) => {
            expect(context.mockModule._core).toBeTruthy();
            expect(context.mockModule._webSocketExtension).toBeTruthy();

            // on install
            expect(context._useTokensSpy).toHaveBeenCalledTimes(1);
            expect(context._exposeConnectionEventsSpy).toHaveBeenCalledTimes(0);
            context._exposeConnectionEventsSpy.mockReset();

            // on newWebSocketObject
            await context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.newWebSocketObject,
              {}, // fake ws obj
            );
            expect(context._exposeConnectionEventsSpy).toHaveBeenCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();

            // on connectionReady
            await context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.connectionReady,
              {}, // fake ws obj
            );
            expect(context.mockModule._wsConnectionReady).toEqual(true);
            expect(context._syncWsReadyStateSpy).toHaveBeenCalledTimes(1);
            context._syncWsReadyStateSpy.mockReset();

            // installWebSocketExtension
            expect(context._installWebSocketExtensionSpy).toHaveBeenCalledTimes(
              1,
            );
            context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.newWsc,
            );
            expect(context._saveTokensSpy).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_bindEvents' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              disconnectOnInactive: true,
              isTabActive: true,
              _deps: {
                sleepDetector: {
                  on(name: string, handler: () => void) {
                    context.sleepDetectorEvent = name;
                    context.sleepDetectorHandler = handler;
                  },
                  events: { detected: 'detected' },
                },
                auth: {
                  addAfterLoggedInHandler(handler: () => void) {
                    context.authAfterLoggedInHandler = handler;
                  },
                  addBeforeLogoutHandler(handler: () => void) {
                    context.authBeforeLogoutHandler = handler;
                  },
                  addRefreshErrorHandler(handler: () => void) {
                    context.authRefreshErrorHandler = handler;
                  },
                },
                tabManager: {},
              },
              _webSocketExtension: {
                options: {
                  autoRecover: {
                    enabled: true,
                  },
                },
                eventEmitter: new EventEmitter(),
              },
              _setSharedState() {},
              _exposeConnectionEvents() {},
              _inactiveOtherTabs() {},
              recoverWebSocketConnection() {},
              revokeWebSocketConnection() {},
            });
            context._setSharedStateSpy = jest.spyOn(
              context.mockModule,
              '_setSharedState',
            );
            context._exposeConnectionEventsSpy = jest.spyOn(
              context.mockModule,
              '_exposeConnectionEvents',
            );
            context._inactiveOtherTabsSpy = jest.spyOn(
              context.mockModule,
              '_inactiveOtherTabs',
            );
            context.recoverWebSocketConnectionSpy = jest.spyOn(
              context.mockModule,
              'recoverWebSocketConnection',
            );
            context.revokeWebSocketConnectionSpy = jest.spyOn(
              context.mockModule,
              'revokeWebSocketConnection',
            );
            await context.instance._bindEvents.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={async (_: unknown, context: any) => {
            expect(context._setSharedStateSpy).toHaveBeenCalledTimes(1);
            expect(context._inactiveOtherTabsSpy).toHaveBeenCalledTimes(1);

            // on autoRecoverSuccess
            context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.autoRecoverSuccess,
            );
            expect(context._exposeConnectionEventsSpy).toHaveBeenCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();

            // on autoRecoverFailed
            context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.autoRecoverFailed,
            );
            expect(context._exposeConnectionEventsSpy).toHaveBeenCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();

            // sleepDetector handler
            expect(context.sleepDetectorEvent).toEqual('detected');
            expect(context.sleepDetectorHandler).toBeTruthy();
            context.sleepDetectorHandler();
            expect(context.recoverWebSocketConnectionSpy).toHaveBeenCalledTimes(
              1,
            );

            // auth handlers
            expect(context.authAfterLoggedInHandler).toBeTruthy();
            expect(context.authBeforeLogoutHandler).toBeTruthy();
            expect(context.authRefreshErrorHandler).toBeTruthy();
            context.authAfterLoggedInHandler();
            context.authBeforeLogoutHandler();
            context.authRefreshErrorHandler(false);
            expect(context.recoverWebSocketConnectionSpy).toHaveBeenCalledTimes(
              2,
            );
            expect(context.revokeWebSocketConnectionSpy).toHaveBeenCalledTimes(
              2,
            );
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setSharedState' action"
          action={async (_: unknown, context: any) => {
            context.currentTabId = 'fake-tab-id';
            context.mockModule = mockModuleGenerator({
              isWebSocketReady: true,
              _deps: {
                tabManager: {
                  id: context.currentTabId,
                },
                availabilityMonitor: {
                  setSharedState() {},
                },
              },
            });
            context.setSharedStateSpy = jest.spyOn(
              context.mockModule._deps.availabilityMonitor,
              'setSharedState',
            );
            await context.instance._setSharedState.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={async (_: unknown, context: any) => {
            expect(context.setSharedStateSpy).toHaveBeenCalledWith(
              `ws-${context.currentTabId}`,
              { webSocketReady: true },
            );
          }}
        />
        <When
          desc="Call RingCentralExtensions '_installWebSocketExtension' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              allowSwitchConnection: true,
              _core: {
                installExtension() {},
              },
            });
            // cancelled path
            context.mockModule.allowSwitchConnection = false;
            await context.instance._installWebSocketExtension.call(
              context.mockModule,
            );
            context.mockModule.allowSwitchConnection = true;
            // normal path
            context.installExtensionSpy = jest.spyOn(
              context.mockModule._core,
              'installExtension',
            );
            await context.instance._installWebSocketExtension.call(
              context.mockModule,
            );
            // error path
            context.installExtensionSpy.mockImplementation(() => {
              throw new Error();
            });
            await context.instance._installWebSocketExtension.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.installExtensionSpy).toHaveBeenCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_onTabActive' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _deps: {},
              ready: true,
              isTabActive: true,
              _inactiveOtherTabs() {},
              recoverWebSocketConnection() {},
            });
            context._inactiveOtherTabsSpy = jest.spyOn(
              context.mockModule,
              '_inactiveOtherTabs',
            );
            context.recoverWebSocketConnectionSpy = jest.spyOn(
              context.mockModule,
              'recoverWebSocketConnection',
            );
            // path 1
            context.mockModule.isTabActive = false;
            await context.instance._onTabActive.call(context.mockModule);
            context.mockModule.isTabActive = true;
            // path 2
            await context.instance._onTabActive.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context._inactiveOtherTabsSpy).toHaveBeenCalledTimes(1);
            expect(context.recoverWebSocketConnectionSpy).toHaveBeenCalledTimes(
              1,
            );
          }}
        />
        <When
          desc="Call RingCentralExtensions '_tabMessageHandler' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _deps: {},
              ready: true,
              _webSocketExtension: {
                options: {
                  autoRecover: {
                    enabled: true,
                  },
                },
              },
              _setWsAutoRecover:
                RingCentralExtensions.prototype._setWsAutoRecover,
              _setTokens() {},
              _useTokens() {},
            });
            context._setTokensSpy = jest.spyOn(
              context.mockModule,
              '_setTokens',
            );
            context._useTokensSpy = jest.spyOn(
              context.mockModule,
              '_useTokens',
            );
            context.instance._tabMessageHandler.call(context.mockModule);
            context.instance._tabMessageHandler.call(context.mockModule, {
              name: InactiveTabEventName,
            });
            context.instance._tabMessageHandler.call(context.mockModule, {
              name: SyncTokensTabEventName,
              args: [],
            });
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(
              context.mockModule._webSocketExtension.options.autoRecover
                .enabled,
            ).toEqual(false);
            expect(context._setTokensSpy).toHaveBeenCalledTimes(1);
            expect(context._useTokensSpy).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_inactiveOtherTabs' and '_syncTokensToOtherTabs' actions"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _setWsAutoRecover:
                RingCentralExtensions.prototype._setWsAutoRecover,
              _deps: {
                tabManager: {
                  send() {},
                },
              },
              _webSocketExtension: {
                options: {
                  autoRecover: {
                    enabled: false,
                  },
                },
              },
              allowSwitchConnection: true,
            });
            context.sendSpy = jest.spyOn(
              context.mockModule._deps.tabManager,
              'send',
            );
            // cancelled path
            context.mockModule.allowSwitchConnection = false;
            await context.instance._inactiveOtherTabs.call(context.mockModule);
            context.mockModule.allowSwitchConnection = true;
            // normal path
            context.instance._inactiveOtherTabs.call(context.mockModule);
            context.instance._syncTokensToOtherTabs.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.sendSpy).toHaveBeenCalledTimes(2);
            expect(context.sendSpy.mock.calls[0][0]).toEqual(
              InactiveTabEventName,
            );
            expect(context.sendSpy.mock.calls[1][0]).toEqual(
              SyncTokensTabEventName,
            );
            expect(
              context.mockModule._webSocketExtension.options.autoRecover
                .enabled,
            ).toEqual(true);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setTokens', '_saveTokens' and '_clearTokens' actions"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _webSocketExtension: {},
              disconnectOnInactive: true,
              _setTokens: context.instance._setTokens,
              _syncTokensToOtherTabs() {},
            });
            context._setTokensSpy = jest.spyOn(
              context.mockModule,
              '_setTokens',
            );
            context._syncTokensToOtherTabsSpy = jest.spyOn(
              context.mockModule,
              '_syncTokensToOtherTabs',
            );
            context.instance._saveTokens.call(context.mockModule);
            context.instance._clearTokens.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context._setTokensSpy).toHaveBeenCalledTimes(2);
            expect(context._syncTokensToOtherTabsSpy).toHaveBeenCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'recoverWebSocketConnection' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              ready: true,
              disconnectOnInactive: true,
              isTabActive: true,
              allowSwitchConnection: true,
              _webSocketExtension: {
                rc: null,
                recover() {},
                enable() {},
              },
              _deps: {
                auth: { loggedIn: true },
              },
              _installWebSocketExtension() {},
              _exposeConnectionEvents() {},
            });
            context.recoverSpy = jest.spyOn(
              context.mockModule._webSocketExtension,
              'recover',
            );
            context._installWebSocketExtensionSpy = jest.spyOn(
              context.mockModule,
              '_installWebSocketExtension',
            );
            context._exposeConnectionEventsSpy = jest.spyOn(
              context.mockModule,
              '_exposeConnectionEvents',
            );
            // path 1
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            // path 2
            context.mockModule.ready = false;
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule.ready = true;
            // path 3
            context.mockModule._deps.auth.loggedIn = false;
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule._deps.auth.loggedIn = true;
            // path 4
            context.mockModule.isTabActive = false;
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule.isTabActive = true;
            // path 5
            context.mockModule.allowSwitchConnection = false;
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule.allowSwitchConnection = true;
            // path 6
            context.mockModule._webSocketExtension.rc = {};
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule._webSocketExtension.rc = null;
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.recoverSpy).toHaveBeenCalledTimes(1);
            expect(context._installWebSocketExtensionSpy).toHaveBeenCalledTimes(
              1,
            );
            expect(context._exposeConnectionEventsSpy).toHaveBeenCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'revokeWebSocketConnection' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              ready: true,
              disconnectOnInactive: true,
              isTabActive: true,
              _webSocketExtension: {
                revoke() {},
              },
              _clearTokens() {},
              _exposeConnectionEvents() {},
            });
            context.revokeSpy = jest.spyOn(
              context.mockModule._webSocketExtension,
              'revoke',
            );
            context._clearTokensSpy = jest.spyOn(
              context.mockModule,
              '_clearTokens',
            );
            context._exposeConnectionEventsSpy = jest.spyOn(
              context.mockModule,
              '_exposeConnectionEvents',
            );
            // path 1
            await context.instance.revokeWebSocketConnection.call(
              context.mockModule,
            );
            // path 2
            context.mockModule.ready = false;
            await context.instance.revokeWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule.ready = true;
            // path 3
            context.mockModule.isTabActive = false;
            await context.instance.revokeWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule.isTabActive = true;
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.revokeSpy).toHaveBeenCalledTimes(1);
            expect(context._clearTokensSpy).toHaveBeenCalledTimes(1);
            expect(context._exposeConnectionEventsSpy).toHaveBeenCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_exposeConnectionEvents' action"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              _webSocketExtension: {
                ws: {
                  addEventListener() {},
                  removeEventListener() {},
                },
              },
              _removeWsListener: null,
              _syncWsReadyState() {},
            });
            context._syncWsReadyStateSpy = jest.spyOn(
              context.mockModule,
              '_syncWsReadyState',
            );
            await context.instance._exposeConnectionEvents.call(
              context.mockModule,
            );
            await context.instance._exposeConnectionEvents.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.mockModule._removeWsListener).toBeTruthy();
            expect(context._syncWsReadyStateSpy).toHaveBeenCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setWebSocketReadyState' actions"
          action={async (_: unknown, context: any) => {
            context.mockModule = mockModuleGenerator({
              webSocketReadyState: null,
              _wsConnectionReady: undefined,
            });

            // readyState: null
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              null,
            );
            context.readyState_null = context.mockModule.webSocketReadyState;

            // readyState: connecting
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.CONNECTING,
            );
            context.readyState_connecting =
              context.mockModule.webSocketReadyState;

            // readyState: open
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.OPEN,
            );
            context.readyState_open = context.mockModule.webSocketReadyState;

            // readyState: ready
            context.mockModule._wsConnectionReady = true;
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.OPEN,
            );
            context.readyState_ready = context.mockModule.webSocketReadyState;

            // readyState: closing
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.CLOSING,
            );
            context.readyState_closing = context.mockModule.webSocketReadyState;

            // readyState: closed
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.CLOSED,
            );
            context.readyState_closed = context.mockModule.webSocketReadyState;
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: unknown, context: any) => {
            expect(context.readyState_null).toEqual(null);
            expect(context.readyState_connecting).toEqual(
              webSocketReadyStates.connecting,
            );
            expect(context.readyState_open).toEqual(webSocketReadyStates.open);
            expect(context.readyState_ready).toEqual(
              webSocketReadyStates.ready,
            );
            expect(context.readyState_closing).toEqual(
              webSocketReadyStates.closing,
            );
            expect(context.readyState_closed).toEqual(
              webSocketReadyStates.closed,
            );
          }}
        />
      </Scenario>
    );
  }
}
