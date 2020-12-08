import { EventEmitter } from 'events';
import { SingleTabBroadcastChannel } from 'ringcentral-integration/lib/SingleTabBroadcastChannel';

import {
  agentScriptEvents,
  EV_AGENT_SCRIPT_BROADCAST_KEY,
  EV_AGENT_SCRIPT_PAGE_KEY,
  EV_APP_PAGE_KEY,
} from '../enums';

class AgentScriptApp {
  private _channel: SingleTabBroadcastChannel;
  eventEmitter = new EventEmitter();

  toAngularKey = 'to_angular';
  fromAngularKey = 'from_angular';

  eventKeys = {
    updateScript: agentScriptEvents.INIT,
    setScriptResult: agentScriptEvents.SET_SCRIPT_RESULT,
    updateDisposition: agentScriptEvents.UPDATE_DISPOSITION,
    getKnowledgeBaseArticles: agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
  };

  constructor() {
    this.bindAngularEventAndSend([
      this.eventKeys.setScriptResult,
      this.eventKeys.updateDisposition,
    ]);

    this.bindAngularEvent(
      this.eventKeys.getKnowledgeBaseArticles,
      async (value: any) => {
        const knowledgeBaseArticles = await this._channel.request({
          key: agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
          value,
        });

        this.sendToAngular(
          this.eventKeys.getKnowledgeBaseArticles,
          knowledgeBaseArticles,
        );
      },
    );
  }

  // that init method call from angular.
  async init() {
    this._channel = await new SingleTabBroadcastChannel(
      EV_AGENT_SCRIPT_BROADCAST_KEY,
      {
        from: EV_AGENT_SCRIPT_PAGE_KEY,
        to: EV_APP_PAGE_KEY,
      },
    ).onTabIdExist();

    const value = (await this._channel.request({
      key: agentScriptEvents.INIT,
    })) || {
      config: null,
      call: null,
    };

    this.sendToAngular(this.eventKeys.updateScript, value);

    this._bindBroadCastEvent();
  }

  private _bindBroadCastEvent() {
    this._channel.addEventListener(({ data }) => {
      const { key, value } = data;
      switch (key) {
        case agentScriptEvents.INIT:
          this.sendToAngular(this.eventKeys.updateScript, value);
          break;
        default:
          break;
      }
    });
  }

  bindAngularEventAndSend(keys: string[]) {
    keys.forEach((key) => {
      this.eventEmitter.on(this.fromAngularKey + key, (value) =>
        this._channel.send({ key, value }),
      );
    });
    return this;
  }

  bindAngularEvent(key: string, cb: (...args: any[]) => void) {
    this.eventEmitter.on(this.fromAngularKey + key, cb);
    return this;
  }

  sendToAngular(key: string, value: any) {
    this.eventEmitter.emit(this.toAngularKey + key, value);
  }
}

// Here just assertion as any, that only for using in angular.
(window as any).app = new AgentScriptApp();
