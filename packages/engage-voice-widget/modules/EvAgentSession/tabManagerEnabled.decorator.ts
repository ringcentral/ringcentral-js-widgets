import type { AgentSession } from './EvAgentSession.interface';

export function tabManagerEnabled() {
  return function (target: any, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if ((this as AgentSession).tabManagerEnabled) {
        return originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
