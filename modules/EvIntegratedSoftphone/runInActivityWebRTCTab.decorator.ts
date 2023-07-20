import type { IntegratedSoftphone } from './EvIntegratedSoftphone.interface';

export function runInActivityWebRTCTab() {
  return function (target: any, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      if ((this as IntegratedSoftphone).isWebRTCTab) {
        return originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
