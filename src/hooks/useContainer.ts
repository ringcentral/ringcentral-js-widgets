import { useContext } from 'react';
import { ContainerContext, PortDetector, getRef } from 'reactant-share';

/**
 * Get the container from the context.
 *
 * @param optional is that instance can be optional
 *
 * ### ☢️☢️☢️ if you want get some service from container, try use view module system at first, if there are cross too many modules and use in very deep level, try to use this hook.
 *
 * ### !!! if you want to get state via the hook, you should also use `useConnector` hook.
 */
export const useContainer = <T, K extends boolean = false>(
  moduleKey: string,
): K extends true ? T | undefined : T => {
  const container = useContext(ContainerContext);
  if (process.env.NODE_ENV !== 'production' && !container) {
    throw new Error('Container is not found');
  }
  const portDetector = container!.got(PortDetector);
  if (!portDetector) {
    throw new Error('PortDetector is not found');
  }
  const instance = getRef(portDetector!).modules![moduleKey] as T;
  return instance;
};
