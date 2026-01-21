/* eslint-disable react-hooks/rules-of-hooks */
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { useToastItemView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  computed,
  delegate,
  injectable,
  optional,
  portal,
  RcModule,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { useInterval } from '@ringcentral/juno';
import type { ApiError } from '@ringcentral/sdk';
import React, { useMemo, useState } from 'react';

import { Client } from '../Client';
import { Environment } from '../Environment';

import type { RateLimiterOptions } from './RateLimiter.interface';
import { errorMessages } from './errorMessages';
import { t } from './i18n';

const DEFAULT_THROTTLE_DURATION = 61 * 1000;

function calculateTimeRemaining(duration: number, timestamp: number) {
  return Math.max(Math.floor((duration - (Date.now() - timestamp)) / 1000), 0);
}

@injectable({
  name: 'RateLimiter',
})
export class RateLimiter extends RcModule {
  protected _timeoutId: NodeJS.Timeout | null = null;
  protected _unbindHandlers: (() => void) | null = null;
  protected _ttl: number = DEFAULT_THROTTLE_DURATION;

  @portal
  private rateLimitReachedToast = this._toast.create({
    view: () => {
      const { props } = useToastItemView();

      const initTiming = useMemo(
        () => calculateTimeRemaining(props.ttl, props.timestamp),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
      );

      const [ttl, setTtl] = useState(initTiming);
      const { cancel } = useInterval(() => {
        const newTtl = ttl - 1;
        setTtl(newTtl);
        if (newTtl === 0) {
          cancel();
        }
      }, 1000);

      return <>{t('rateLimitReached', { ttl })}</>;
    },
    props: () => ({
      level: 'warning',
      ttl: this._ttl,
      group: this.identifier,
    }),
  });

  constructor(
    protected _toast: Toast,
    protected _client: Client,
    protected _storage: StoragePlugin,
    @optional() protected _environment?: Environment,
    @optional('RateLimiterOptions')
    protected _rateLimiterOptions?: RateLimiterOptions,
  ) {
    super();

    this._ttl =
      this._rateLimiterOptions?.throttleDuration ?? DEFAULT_THROTTLE_DURATION;
  }

  get _suppressAlerts() {
    return this._rateLimiterOptions?.suppressAlerts ?? false;
  }

  override onInitOnce() {
    if (this._environment) {
      watch(
        this,
        () => this._environment!.changeCounter,
        () => {
          if (this.ready) {
            this._bindHandlers();
          }
        },
      );
    }
  }

  override onInit() {
    this._bindHandlers();
  }

  /**
   * If the app is restricted, an incoming request will lead to an exception
   */
  _beforeRequestHandler = () => {
    if (this.restricted) {
      throw new Error(errorMessages.rateLimitReached);
    }
  };

  @delegate('server')
  async showAlert() {
    if (this._suppressAlerts || this.restricted) {
      return;
    }

    return this._toast.open(this.rateLimitReachedToast);
  }

  _requestErrorHandler = (error: ApiError) => {
    if (
      !(error instanceof Error) ||
      error.message !== 'Request rate exceeded'
    ) {
      return;
    }

    // Get `retry-after` from response headers first
    this._ttl = DEFAULT_THROTTLE_DURATION;
    if (error.response) {
      const retryAfter = error.response.headers.get('retry-after');
      if (retryAfter) {
        this._ttl = 1000 * Number.parseInt(retryAfter, 10);
      }
    }

    this.showAlert();
  };

  @computed
  get restricted() {
    return this._toast.toasts.some((toast) => {
      return toast.group === this.identifier;
    });
  }

  _bindHandlers() {
    if (this._unbindHandlers) {
      this._unbindHandlers();
    }
    const client = this._client.service.client();
    client.on(client.events.requestError, this._requestErrorHandler);
    client.on(client.events.beforeRequest, this._beforeRequestHandler);
    this._unbindHandlers = () => {
      client.removeListener(
        client.events.requestError,
        this._requestErrorHandler,
      );
      client.removeListener(
        client.events.beforeRequest,
        this._beforeRequestHandler,
      );
      this._unbindHandlers = null;
    };
  }

  get throttleDuration() {
    return this._ttl;
  }
}
