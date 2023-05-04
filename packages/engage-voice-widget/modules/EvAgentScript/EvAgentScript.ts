import { EventEmitter } from 'events';
import { clone, reduce } from 'ramda';

import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { SingleTabBroadcastChannel } from '@ringcentral-integration/commons/lib/SingleTabBroadcastChannel';
import {
  action,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';

import {
  agentScriptEvents,
  EV_AGENT_SCRIPT_BROADCAST_KEY,
  EV_AGENT_SCRIPT_PAGE_KEY,
  EV_APP_PAGE_KEY,
} from '../../enums';
import { EvCallData } from '../../interfaces/EvData.interface';
import {
  EvAgentScriptData,
  EvAgentScriptResult,
  EvAgentScriptResultModel,
  EvBaseCall,
  EvCallDispositionItem,
  EvScriptResponseJSON,
} from '../../lib/EvClient';
import {
  AgentScript,
  Deps,
  EvCallScriptResultMapping,
} from './EvAgentScript.interface';

@Module({
  name: 'EvAgentScript',
  deps: [
    'EvClient',
    'EvAuth',
    'EvCall',
    'Storage',
    'TabManager',
    'EvCallMonitor',
    { dep: 'EvAgentScriptOptions', optional: true },
  ],
})
class EvAgentScript<T extends Deps = Deps>
  extends RcModuleV2<T>
  implements AgentScript
{
  private _channel: SingleTabBroadcastChannel;

  protected _eventEmitter = new EventEmitter();
  private _hadResponse = false;

  constructor(deps: T) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvAgentScript',
    });
  }

  // currentChatScripts: any = null;

  @storage
  @state
  currentCallScript: EvAgentScriptData = null;

  @storage
  @state
  isDisplayAgentScript = true;

  @storage
  @state
  callScriptResultMapping: EvCallScriptResultMapping = {};

  @action
  setIsDisplayAgentScript(state: boolean) {
    this.isDisplayAgentScript = state;
  }

  @action
  setCurrentCallScript(script: EvAgentScriptData) {
    this.currentCallScript = script;
  }

  @action
  setCallScriptResult(id: string, data: EvAgentScriptResult) {
    this.callScriptResultMapping[id] = data;
    this._eventEmitter.emit(agentScriptEvents.SET_SCRIPT_RESULT, id, data);
  }

  debouncedSetCallScriptResult = debounce({ fn: this.setCallScriptResult });

  reset() {
    console.log('!!!EvAgentScript reset');
    // this.setIsDisplayAgentScript(false);
  }

  onSetScriptResult(cb: (id: string, data: EvAgentScriptResult) => any) {
    this._eventEmitter.on(agentScriptEvents.SET_SCRIPT_RESULT, cb);
  }

  onUpdateDisposition(cb: (id: string, data: EvCallDispositionItem) => any) {
    this._eventEmitter.on(agentScriptEvents.UPDATE_DISPOSITION, cb);
  }

  override onInitOnce() {
    this._bindChannel();

    // when script change emit that
    watch(
      this,
      () => this.currentCallScript,
      () => {
        this._responseInitScript();
      },
    );

    this._deps.evCallMonitor.onCallAnswered(async (call) => {
      if (this.getIsAgentScript(call)) {
        await this.getScript(
          call.scriptId,
          call.scriptVersion,
          'CALL',
          call.uii,
        );
      }
    });

    this._deps.evAuth.beforeAgentLogout(() => {
      this.reset();
    });
  }

  override onInit() {
    console.log('EvAgentScript!! init');
    this.setIsDisplayAgentScript(true);
  }

  getIsAgentScript(call: EvBaseCall) {
    return !!(this.isDisplayAgentScript && call?.scriptId);
  }

  private _bindChannel() {
    if (
      this._deps.tabManager.enable &&
      !sessionStorage.getItem(EV_AGENT_SCRIPT_BROADCAST_KEY)
    ) {
      sessionStorage.setItem(
        EV_AGENT_SCRIPT_BROADCAST_KEY,
        this._deps.tabManager.id,
      );
    }

    this._channel = new SingleTabBroadcastChannel(
      EV_AGENT_SCRIPT_BROADCAST_KEY,
      {
        from: EV_APP_PAGE_KEY,
        to: EV_AGENT_SCRIPT_PAGE_KEY,
      },
    ).init();

    this._channel.addEventListener(({ data }) => {
      const { key, value } = data;
      const { activityCallId, currentCall } = this._deps.evCall;

      if (
        this.isDisplayAgentScript &&
        activityCallId &&
        currentCall?.scriptId
      ) {
        switch (key) {
          case agentScriptEvents.INIT:
            this._responseInitScript();
            break;
          case agentScriptEvents.SET_SCRIPT_RESULT:
            this.debouncedSetCallScriptResult(activityCallId, value);
            break;
          case agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES:
            this._getKnowledgeBaseGroups(value);
            break;
          case agentScriptEvents.UPDATE_DISPOSITION:
            this._eventEmitter.emit(
              agentScriptEvents.UPDATE_DISPOSITION,
              activityCallId,
              value,
            );
            break;
          default:
            break;
        }
      }
    });

    // if that agent Script is more quick than CTI app, that will need emit that when app init.
    setTimeout(() => {
      if (this.currentCallScript && !this._hadResponse) {
        this._responseInitScript();
      }
    }, 1000);
  }

  private async _getKnowledgeBaseGroups(knowledgeBaseGroupIds: number[]) {
    const value = await this._deps.evClient.getKnowledgeBaseGroups(
      knowledgeBaseGroupIds,
    );

    this._channel.send({
      key: agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
      value,
    });
  }

  private _responseInitScript() {
    this._channel.send({
      key: agentScriptEvents.INIT,
      value: {
        config: this.currentCallScript,
        call: this._deps.evCall.currentCall,
      },
    });

    this._hadResponse = true;
  }

  async getScript(
    scriptId: string,
    version: string = null,
    type: string = 'CALL',
    uii: string = null,
  ) {
    const response = await this._deps.evClient.getScript(scriptId, version);
    // TODO: that will fix in next MR
    const result: EvAgentScriptData = {
      scriptId: response.scriptId,
      // scriptName: response.scriptName,
      // finalResult: null as any, // used for reporting
      // navPosition: null as any,
      // version: response.version,
      data: JSON.parse(response.json) as EvScriptResponseJSON,
    } as any;

    switch (type) {
      // case 'CHAT':
      //   this.currentChatScripts[uii] = result;
      //   break;
      case 'CALL':
        this.setCurrentCallScript(result);
        break;

      default:
        break;
    }

    return result;
  }

  /**
   * @param call - the corresponding chat or call object
   */
  saveScriptResult(call: EvCallData) {
    const scriptResult =
      this.callScriptResultMapping[
        this._deps.evClient.encodeUii({
          uii: call.uii,
          sessionId: call.session.sessionId,
        })
      ];

    if (scriptResult) {
      const result = this._formatScriptResult(scriptResult);
      this._deps.evClient.saveScriptResult(call.uii, call.scriptId, result);
    }
  }

  private _formatScriptResult(scriptResult: EvAgentScriptResult) {
    const resultCopy = clone(scriptResult);

    resultCopy.model = reduce(
      (output, [key, value]) => {
        let result = value;
        if (result.value !== undefined) {
          result = result.value;
        }

        output[key] = {
          value: result,
          leadField: value.leadField ?? '',
        };
        return output;
      },
      {} as EvAgentScriptResultModel,
      Object.entries<any>(resultCopy.model),
    );

    return resultCopy;
  }
}

export { EvAgentScript };
