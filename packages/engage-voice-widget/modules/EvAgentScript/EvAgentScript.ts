import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { EventEmitter } from 'events';
import { clone, reduce } from 'ramda';
import { Module } from 'ringcentral-integration/lib/di';

import { agentScriptEvents, BROADCAST_KEY } from '../../enums';
import { EvCallData } from '../../interfaces/EvData.interface';
import {
  EvAgentScriptData,
  EvAgentScriptResult,
  EvAgentScriptResultModel,
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
    { dep: 'EvAgentScriptOptions', optional: true },
  ],
})
class EvAgentScript<T = {}> extends RcModuleV2<Deps & T>
  implements AgentScript {
  private broadcastChannel = new BroadcastChannel(BROADCAST_KEY);
  protected _eventEmitter = new EventEmitter();

  constructor(deps: Deps) {
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
  isAgentScript = true;

  @storage
  @state
  callScriptResultMapping: EvCallScriptResultMapping = {};

  @action
  setIsAgentScript(state: boolean) {
    this.isAgentScript = state;
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

  reset() {
    this.setIsAgentScript(false);
  }

  onSetScriptResult(cb: (id: string, data: EvAgentScriptResult) => any) {
    this._eventEmitter.on(agentScriptEvents.SET_SCRIPT_RESULT, cb);
  }

  onInitOnce() {
    this.broadcastChannel.onmessage = ({ data }) => {
      if (this.isAgentScript) {
        switch (data.key) {
          case agentScriptEvents.INIT:
            {
              const { currentCall } = this._deps.evCall;
              if (currentCall?.scriptId) {
                this._sendInitScript();
              }
            }
            break;
          case agentScriptEvents.SET_SCRIPT_RESULT:
            {
              const { currentCall } = this._deps.evCall;

              if (currentCall) {
                this.setCallScriptResult(currentCall.uii, data.data);
              }
            }
            break;
          default:
            break;
        }
      }
    };

    this._deps.evAuth.beforeAgentLogout(() => {
      this.reset();
    });
  }

  private _sendInitScript() {
    this.broadcastChannel.postMessage({
      key: agentScriptEvents.INIT,
      value: this.currentCallScript,
    });
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
        this._sendInitScript();
        break;

      default:
        break;
    }

    return result;
  }

  /**
   * @param call - the corresponding chat or call object
   */
  async saveScriptResult(call: EvCallData) {
    const scriptResult = this.callScriptResultMapping[call.uii];
    if (scriptResult) {
      const result = this._formatScriptResult(scriptResult);

      try {
        const res = await this._deps.evClient.saveScriptResult(
          call.uii,
          call.scriptId,
          result,
        );
        return res;
      } catch (error) {
        console.log('saveScriptResult fail', error);
      }
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
