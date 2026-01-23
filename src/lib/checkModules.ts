/* eslint-disable @typescript-eslint/no-explicit-any */
import { notReadyModulesKey } from '../constant';

if (process.env.NODE_ENV !== 'production') {
  globalThis.checkModules = (
    needCheckModules = null,
    checkedModules: any[] = [],
    pickedModules: any[] = [],
  ) => {
    const isObject = toString.call(needCheckModules) === '[object Object]';
    const _needCheckModules: any[] = isObject
      ? [needCheckModules]
      : needCheckModules ?? Object.values(globalThis.app.modules ?? {});
    _needCheckModules.forEach((module) => {
      if (module && typeof module.ready === 'boolean' && !module.ready) {
        const notReadyModules = module[notReadyModulesKey];
        if (notReadyModules.length > 0 && !checkedModules.includes(module)) {
          checkedModules.push(module);
          globalThis.checkModules(notReadyModules, checkedModules, pickedModules);
          return;
        } else if (
          !pickedModules.includes(module) &&
          notReadyModules.length === 0
        ) {
          pickedModules.push(module);
        }
      }
    });
    if (!needCheckModules || isObject) {
      let error = 0;
      // please check `_shouldInit()`, `onInit()` or `onInitOnce`.
      pickedModules.forEach((module: any) => {
        if (!module._shouldInit() && module.pending) {
          console.warn(
            `Please check the ${module.constructor.name}._shouldInit method.`,
          );
          console.log(module._shouldInit);
          error++;
        } else {
          if (module.onInit) {
            console.warn(
              `Please check the ${module.constructor.name}.onInit method.`,
            );
            error++;
          }
          if (module.onInitOnce) {
            console.warn(
              `Please check the ${module.constructor.name}.onInitOnce method.`,
            );
            error++;
          }
        }
      });

      if (error === 0) {
        console.log('✨✨✨✨✨ All modules pass check ✨✨✨✨✨');
      } else if (!needCheckModules) {
        return Object.entries(
          (globalThis.app.modules ?? {}) as Record<string, any>,
        ).reduce((obj, [key, value]) => {
          if (value.ready === false) {
            obj[key] = () => globalThis.checkModules(value);
          }
          return obj;
        }, {} as Record<string, any>);
      }
    }
  };
}
