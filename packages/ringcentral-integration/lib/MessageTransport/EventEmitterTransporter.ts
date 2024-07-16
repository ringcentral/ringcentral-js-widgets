import { EventEmitter } from 'events';

import BasicTransporter from './BasicTransporter';

declare global {
  interface Window {
    _transporterEventEmitter: EventEmitter;
  }
}

export const TRANSPORTER_DIRECTION = {
  TO_INTERNAL: 'toInternal',
  TO_EXTERNAL: 'toExternal',
} as const;

export type TransporterDirection =
  (typeof TRANSPORTER_DIRECTION)[keyof typeof TRANSPORTER_DIRECTION];

/**
 * @param direction if direction is 'toExternal', meaning this instance is created in internal adapter, need in eventEmitter
 */
export class EventEmitterTransporter extends BasicTransporter {
  private _direction: TransporterDirection;

  constructor({ direction }: { direction: TransporterDirection }) {
    super();
    if (!window._transporterEventEmitter) {
      window._transporterEventEmitter = new EventEmitter();
    }
    this._direction = direction;
  }

  addReceiver = (onMessage: any) => {
    window._transporterEventEmitter.on(
      this._direction === TRANSPORTER_DIRECTION.TO_EXTERNAL
        ? TRANSPORTER_DIRECTION.TO_INTERNAL
        : TRANSPORTER_DIRECTION.TO_EXTERNAL,
      (data) => {
        onMessage({
          data,
        });
      },
    );
  };

  createEmitter =
    () =>
    (emitterData: Object, { callback }: { callback?: () => any } = {}) => {
      window._transporterEventEmitter.emit(
        this._direction === TRANSPORTER_DIRECTION.TO_EXTERNAL
          ? TRANSPORTER_DIRECTION.TO_EXTERNAL
          : TRANSPORTER_DIRECTION.TO_INTERNAL,
        emitterData,
      );
      if (typeof callback === 'function') callback();
    };
}
