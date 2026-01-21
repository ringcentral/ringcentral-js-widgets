/* eslint-disable @typescript-eslint/no-explicit-any */
import { moduleInitTimeKey } from '../constant';

if (process.env.NODE_ENV !== 'production') {
  globalThis.traceModules = () => {
    const arr: [object, (...args: any) => any, number][] = [];
    Object.values((globalThis.app.modules ?? {}) as Record<string, any>).forEach(
      (module) => {
        const moduleInitTime = module[moduleInitTimeKey];
        if (typeof moduleInitTime !== 'undefined') {
          arr.push([module, module.constructor, moduleInitTime]);
        }
      },
    );
    return arr.sort((a, b) => b[2] - a[2]);
  };
}
