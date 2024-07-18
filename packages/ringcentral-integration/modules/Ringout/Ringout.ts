import type RestException from '@rc-ex/core/lib/RestException';
import type GetRingOutStatusResponse from '@rc-ex/core/lib/definitions/GetRingOutStatusResponse';
import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import { sleep } from '@ringcentral-integration/utils';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps, MakeCallOptions } from './Ringout.interface';
import { ringoutErrors } from './ringoutErrors';
import { ringoutStatus } from './ringoutStatus';

const DEFAULT_MONITOR_INTERVAL = 2500;
const DEFAULT_TIME_BETWEEN_CALLS = 10000;

@Module({
  name: 'Ringout',
  deps: [
    'Auth',
    'Client',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'RingoutOptions', optional: true },
  ],
})
export class Ringout extends RcModuleV2<Deps> {
  protected _monitorInterval: number;
  protected _timeBetweenCalls: number;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._monitorInterval =
      this._deps.ringoutOptions?.monitorInterval ?? DEFAULT_MONITOR_INTERVAL;
    this._timeBetweenCalls =
      this._deps.ringoutOptions?.timeBetweenCalls ?? DEFAULT_TIME_BETWEEN_CALLS;
  }

  @state
  ringoutStatus: string = ringoutStatus.idle;

  @action
  setRingoutStatus(ringoutStatus: string) {
    this.ringoutStatus = ringoutStatus;
  }

  override _shouldInit() {
    return this._deps.auth.loggedIn && this.pending;
  }

  override _shouldReset() {
    return !this._deps.auth.loggedIn && this.ready;
  }

  @proxify
  async makeCall({ fromNumber, toNumber, prompt }: MakeCallOptions) {
    if (this.ready) {
      this.setRingoutStatus(ringoutStatus.connecting);
      try {
        const resp: GetRingOutStatusResponse = await this._deps.client
          .account()
          .extension()
          .ringOut()
          .post({
            from: { phoneNumber: fromNumber },
            to: { phoneNumber: toNumber },
            playPrompt: prompt,
          });

        try {
          this._deps.contactMatcher?.forceMatchBatchNumbers({
            phoneNumbers: [fromNumber, toNumber],
          });
        } catch (error) {
          console.error('makeCall forceMatchBatchNumbers error', error);
        }

        const startTime = Date.now();
        await this._monitorRingout(resp.id, startTime);

        this.setRingoutStatus(ringoutStatus.idle);
      } catch (e: any /** TODO: confirm with instanceof */) {
        this.setRingoutStatus(ringoutStatus.idle);
        if (e.message !== ringoutErrors.pollingCancelled) {
          throw e;
        }
      }
    } else {
      // TODO: Need to dispatch a generic error action
    }
  }

  @proxify
  async _monitorRingout(
    ringoutId: GetRingOutStatusResponse['id'],
    startTime: number,
  ) {
    let callerStatus = await this._fetchRingoutStatus(ringoutId);
    while (callerStatus === 'InProgress') {
      if (Date.now() - startTime > this._timeBetweenCalls) {
        throw new Error(ringoutErrors.pollingCancelled);
      }
      await sleep(this._monitorInterval);
      callerStatus = await this._fetchRingoutStatus(ringoutId);
    }
    if (callerStatus !== 'Success' && callerStatus !== 'NoAnswer') {
      throw new Error(ringoutErrors.firstLegConnectFailed);
    }
  }

  @proxify
  async _fetchRingoutStatus(ringoutId: GetRingOutStatusResponse['id']) {
    try {
      let callStatus;
      const resp = await this._deps.client
        .account()
        .extension()
        .ringOut(ringoutId)
        .get()
        .catch((error: RestException | Error) => {
          if (
            error &&
            (error as RestException).response &&
            (error as RestException).response.status === 404
          ) {
            callStatus = 'Success';
          }
        });
      return callStatus || resp.status.callerStatus;
    } catch (e: any /** TODO: confirm with instanceof */) {
      throw new Error(ringoutErrors.pollingFailed);
    }
  }
}
