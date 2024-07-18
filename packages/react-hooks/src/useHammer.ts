import { getRefElement, RefOrElementOrCallback } from '@ringcentral/juno';
import { useEffect, useRef } from 'react';

export const useHammer = (
  target: RefOrElementOrCallback | EventTarget,
  callback: (manager: HammerManager) => void,
) => {
  const hammerRef = useRef<HammerManager>();

  useEffect(() => {
    const targetRefElm = getRefElement(target as HTMLElement)!;

    (async () => {
      await import('hammerjs');

      const hammer = new Hammer.Manager(targetRefElm);

      hammerRef.current = hammer;
      callback(hammer);
    })();

    return () => {
      hammerRef.current?.destroy();
    };
  }, []);
};
