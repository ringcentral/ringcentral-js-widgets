import type RestException from '@rc-ex/core/lib/RestException';
import type GetRingOutStatusResponse from '@rc-ex/core/lib/definitions/GetRingOutStatusResponse';
import {
  Auth,
  Client,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  action,
  delegate,
  injectable,
  logger,
  optional,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';

import type { MakeCallOptions, RingoutOptions } from './Ringout.interface';
import { ringoutErrors } from './ringoutErrors';
import { ringoutStatus } from './ringoutStatus';

const DEFAULT_MONITOR_INTERVAL = 2500;
const DEFAULT_TIME_BETWEEN_CALLS = 10000;

@injectable({
  name: 'Ringout',
})
export class Ringout extends RcModule {
  protected _monitorInterval: number;
  protected _timeBetweenCalls: number;

  constructor(
    protected _auth: Auth,
    protected _client: Client,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional('RingoutOptions') protected _ringoutOptions?: RingoutOptions,
  ) {
    super();

    this._monitorInterval =
      this._ringoutOptions?.monitorInterval ?? DEFAULT_MONITOR_INTERVAL;
    this._timeBetweenCalls =
      this._ringoutOptions?.timeBetweenCalls ?? DEFAULT_TIME_BETWEEN_CALLS;
  }

  @state
  ringoutStatus: string = ringoutStatus.idle;

  @action
  setRingoutStatus(ringoutStatus: string) {
    this.ringoutStatus = ringoutStatus;
  }

  override _shouldInit() {
    return this._auth.loggedIn && this.pending;
  }

  override _shouldReset() {
    return !this._auth.loggedIn && this.ready;
  }

  @delegate('server')
  async makeCall({ fromNumber, toNumber, prompt }: MakeCallOptions) {
    if (this.ready) {
      this.setRingoutStatus(ringoutStatus.connecting);
      try {
        const resp: GetRingOutStatusResponse = await this._client
          .account()
          .extension()
          .ringOut()
          .post({
            from: { phoneNumber: fromNumber },
            to: { phoneNumber: toNumber },
            playPrompt: prompt,
          });
        try {
          this._contactMatcher?.forceMatchBatchNumbers({
            phoneNumbers: [fromNumber, toNumber],
          });
        } catch (error) {
          logger.error('makeCall forceMatchBatchNumbers error', error);
        }

        const startTime = Date.now();
        await this._monitorRingout(resp.id, startTime);

        this.setRingoutStatus(ringoutStatus.idle);
      } catch (e: unknown) {
        this.setRingoutStatus(ringoutStatus.idle);
        if ((e as Error).message !== ringoutErrors.pollingCancelled) {
          throw e;
        }
      }
    } else {
      // TODO: Need to dispatch a generic error action
    }
  }

  @delegate('server')
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

  @delegate('server')
  async _fetchRingoutStatus(ringoutId: GetRingOutStatusResponse['id']) {
    try {
      let callStatus;
      const resp = await this._client
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
      return callStatus || resp!.status!.callerStatus;
    } catch (e) {
      throw new Error(ringoutErrors.pollingFailed);
    }
  }
}
