import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';

import { EventEmitter } from 'events';
import WebSocket from 'isomorphic-ws';
import { Events } from '@rc-ex/ws';
import {
  webSocketReadyStates,
  RingCentralExtensions,
  InactiveTabEventName,
  SyncTokensTabEventName,
} from '../../modules/RingCentralExtensions';
import { mockModuleGenerator } from '../lib/mockModule';

@autorun(test)
@title('RingCentralExtensions')
export class DefaultState extends Step {
  run() {
    return (
      <Scenario desc="RingCentralExtensions">
        <Given
          desc="Create an RingCentralExtensions instance with default value"
          action={(_: any, context: any) => {
            context.instance = new RingCentralExtensions({} as any);
            expect(context.instance.isWebSocketOpen).toEqual(false);
            expect(context.instance.debugMode).toEqual(false);
            expect(context.instance.isTabActive).toEqual(false);
            expect(context.instance.disconnectOnInactive).toEqual(false);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'onInitOnce' action"
          action={async (_: any, context: any) => {
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
          action={(_: any, context: any) => {
            expect(context._setupInfraSpy).toBeCalledTimes(1);
            expect(context._bindEventsSpy).toBeCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'onInitSuccess' action"
          action={async (_: any, context: any) => {
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
          action={(_: any, context: any) => {
            expect(context.recoverWebSocketConnectionSpy).toBeCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setupInfra' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              debugMode: true,
              sdk: { request() {} },
              _deps: {},
              _installWebSocketExtension() {},
              _saveTokens() {},
            });
            context._installWebSocketExtensionSpy = jest.spyOn(
              context.mockModule,
              '_installWebSocketExtension',
            );
            context._saveTokensSpy = jest.spyOn(
              context.mockModule,
              '_saveTokens',
            );
            await context.instance._setupInfra.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule._core).toBeTruthy();
            expect(context.mockModule._webSocketExtension).toBeTruthy();
            expect(context._installWebSocketExtensionSpy).toBeCalledTimes(1);
            context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.newWsc,
            );
            expect(context._saveTokensSpy).toBeCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_bindEvents' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              disconnectOnInactive: true,
              isTabActive: true,
              _deps: {
                sleepDetector: {
                  on(name, handler) {
                    context.sleepDetectorEvent = name;
                    context.sleepDetectorHandler = handler;
                  },
                  events: { detected: 'detected' },
                },
                auth: {
                  addAfterLoggedInHandler(handler) {
                    context.authAfterLoggedInHandler = handler;
                  },
                  addBeforeLogoutHandler(handler) {
                    context.authBeforeLogoutHandler = handler;
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
              _exposeConnectionEvents() {},
              _inactiveOtherTabs() {},
              recoverWebSocketConnection() {},
              revokeWebSocketConnection() {},
            });
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
          action={async (_: any, context: any) => {
            expect(context._inactiveOtherTabsSpy).toBeCalledTimes(1);
            // times 1
            expect(context._exposeConnectionEventsSpy).toBeCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();
            // times 2
            await context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.newWebSocketObject,
              {}, // fake ws obj
            );
            expect(context._exposeConnectionEventsSpy).toBeCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();
            // times 3
            context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.autoRecoverSuccess,
            );
            expect(context._exposeConnectionEventsSpy).toBeCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();
            // times 4
            context.mockModule._webSocketExtension.eventEmitter.emit(
              Events.autoRecoverFailed,
            );
            expect(context._exposeConnectionEventsSpy).toBeCalledTimes(1);
            context._exposeConnectionEventsSpy.mockReset();
            // sleepDetector handler
            expect(context.sleepDetectorEvent).toEqual('detected');
            expect(context.sleepDetectorHandler).toBeTruthy();
            context.sleepDetectorHandler();
            expect(context.recoverWebSocketConnectionSpy).toBeCalledTimes(1);
            // auth handlers
            expect(context.authAfterLoggedInHandler).toBeTruthy();
            expect(context.authBeforeLogoutHandler).toBeTruthy();
            context.authAfterLoggedInHandler();
            context.authBeforeLogoutHandler();
            expect(context.recoverWebSocketConnectionSpy).toBeCalledTimes(2);
            expect(context.revokeWebSocketConnectionSpy).toBeCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_installWebSocketExtension' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _core: {
                installExtension() {},
              },
            });
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
          action={(_: any, context: any) => {
            expect(context.installExtensionSpy).toBeCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_onTabActive' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _deps: {},
              ready: true,
              isTabActive: true,
              _webSocketExtension: {
                options: {
                  autoRecover: {
                    enabled: false,
                  },
                },
              },
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
          action={(_: any, context: any) => {
            expect(
              context.mockModule._webSocketExtension.options.autoRecover
                .enabled,
            ).toEqual(true);
            expect(context._inactiveOtherTabsSpy).toBeCalledTimes(1);
            expect(context.recoverWebSocketConnectionSpy).toBeCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_tabMessageHandler' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              ready: true,
              _webSocketExtension: {
                options: {
                  autoRecover: {
                    enabled: true,
                  },
                },
              },
              _setTokens() {},
            });
            context._setTokensSpy = jest.spyOn(
              context.mockModule,
              '_setTokens',
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
          action={(_: any, context: any) => {
            expect(
              context.mockModule._webSocketExtension.options.autoRecover
                .enabled,
            ).toEqual(false);
            expect(context._setTokensSpy).toBeCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_inactiveOtherTabs' and '_syncTokensToOtherTabs' actions"
          action={(_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _deps: {
                tabManager: {
                  send() {},
                },
              },
            });
            context.sendSpy = jest.spyOn(
              context.mockModule._deps.tabManager,
              'send',
            );
            context.instance._inactiveOtherTabs.call(context.mockModule);
            context.instance._syncTokensToOtherTabs.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.sendSpy).toBeCalledTimes(2);
            expect(context.sendSpy.mock.calls[0][0]).toEqual(
              InactiveTabEventName,
            );
            expect(context.sendSpy.mock.calls[1][0]).toEqual(
              SyncTokensTabEventName,
            );
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setTokens', '_saveTokens' and '_clearTokens' actions"
          action={async (_: any, context: any) => {
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
          action={(_: any, context: any) => {
            expect(context._setTokensSpy).toBeCalledTimes(2);
            expect(context._syncTokensToOtherTabsSpy).toBeCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'recoverWebSocketConnection' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              ready: true,
              disconnectOnInactive: true,
              isTabActive: true,
              _webSocketExtension: {
                rc: null,
                recover() {},
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
            context.mockModule.isTabActive = false;
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule.isTabActive = true;
            // path 4
            context.mockModule._webSocketExtension.rc = {};
            await context.instance.recoverWebSocketConnection.call(
              context.mockModule,
            );
            context.mockModule._webSocketExtension.rc = null;
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.recoverSpy).toBeCalledTimes(1);
            expect(context._installWebSocketExtensionSpy).toBeCalledTimes(1);
            expect(context._exposeConnectionEventsSpy).toBeCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions 'revokeWebSocketConnection' action"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              ready: true,
              isWebSocketOpen: true,
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
          action={(_: any, context: any) => {
            expect(context.revokeSpy).toBeCalledTimes(1);
            expect(context._clearTokensSpy).toBeCalledTimes(1);
            expect(context._exposeConnectionEventsSpy).toBeCalledTimes(1);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_exposeConnectionEvents' action"
          action={async (_: any, context: any) => {
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
          action={(_: any, context: any) => {
            expect(context.mockModule._removeWsListener).toBeTruthy();
            expect(context._syncWsReadyStateSpy).toBeCalledTimes(2);
          }}
        />
        <When
          desc="Call RingCentralExtensions '_setWebSocketReadyState' actions"
          action={async (_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              webSocketReadyState: null,
            });
            // value 1
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              null,
            );
            context.readyState1 = context.mockModule.webSocketReadyState;
            // value 2
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.CONNECTING,
            );
            context.readyState2 = context.mockModule.webSocketReadyState;
            // value 3
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.OPEN,
            );
            context.readyState3 = context.mockModule.webSocketReadyState;
            // value 4
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.CLOSING,
            );
            context.readyState4 = context.mockModule.webSocketReadyState;
            // value 5
            context.instance._setWebSocketReadyState.call(
              context.mockModule,
              WebSocket.CLOSED,
            );
            context.readyState5 = context.mockModule.webSocketReadyState;
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.readyState1).toEqual(null);
            expect(context.readyState2).toEqual(
              webSocketReadyStates.connecting,
            );
            expect(context.readyState3).toEqual(webSocketReadyStates.open);
            expect(context.readyState4).toEqual(webSocketReadyStates.closing);
            expect(context.readyState5).toEqual(webSocketReadyStates.closed);
          }}
        />
      </Scenario>
    );
  }
}
