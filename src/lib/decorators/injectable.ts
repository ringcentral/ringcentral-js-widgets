/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable as originalInjectable } from 'reactant-share';
import type { ModuleDecoratorOptions } from 'reactant-share';

export const injectable =
  process.env.NODE_ENV !== 'production'
    ? (options?: ModuleDecoratorOptions) => {
        const decorate = originalInjectable(options);
        return (target: any) => {
          if (!options?.name) {
            throw new Error(
              `@injectable() in module ${target} must have a module name`,
            );
          }
          if (options.name !== target.name) {
            console.warn(
              `@injectable(options) module options.name must be '${target.name}', please use @injectable({ name: '${target.name}' })`,
            );
          }
          return decorate(target);
        };
      }
    : originalInjectable;
