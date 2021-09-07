import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Call } from '../../interfaces/Call.interface';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { Deps } from './CallLogTasks.interface';

@Module({
  name: 'CallLogTasks',
  deps: ['Storage', 'ActivityMatcher', 'ContactMatcher'],
})
export class CallLogTasks<T extends Deps = Deps> extends RcModuleV2<Deps & T> {
  constructor(deps: Deps & T) {
    super({ deps, storageKey: 'CallLogTask', enableCache: true });
  }

  @storage
  @state
  logInfoMapping: Record<string, any> = {};

  @proxify
  async fetchAndUpdateTask(
    call: Call,
    func?: (sessionId: string) => Promise<void>,
  ) {
    try {
      const newLogInfo = await this.fetchLogInfo(call);
      const previousLogInfo = this.getLogInfo(call.sessionId);
      const currentLogInfo = {
        [call.sessionId]: {
          ...previousLogInfo,
          ...newLogInfo,
          task: {
            ...previousLogInfo.task,
            ...newLogInfo.task,
          },
        },
      };
      this.updateLogInfo(currentLogInfo);
      func && (await func(call.sessionId));
    } catch (error) {
      console.error(error);
    }
  }

  fetchLogInfo(call: Call) {
    throw new Error('Method not implemented.');
  }

  getLogInfo(sessionId: string) {
    return this.logInfoMapping[sessionId] || {};
  }

  @action
  updateLogInfo(logInfo: any) {
    this.logInfoMapping = {
      ...this.logInfoMapping,
      ...logInfo,
    };
  }
}
