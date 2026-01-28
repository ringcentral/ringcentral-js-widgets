import { useConnector } from '@ringcentral-integration/next-core';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import {
  useEventListener,
  usePrevious,
  useResultRef,
} from '@ringcentral/spring-ui';
import { useForceUpdate } from 'observable-hooks';
import React, { FunctionComponent, useEffect, useRef } from 'react';

const HIDE_FAKE_BROWSER_URL_KEY = 'hideFakeBrowserURL';

/**
 * for view current route path in fake browser url
 */
export const FakeBrowserURL: FunctionComponent<{
  value: string;
  onCommitted: (value: string) => void;
}> = ({ value: valueProp, onCommitted }) => {
  const [value, setValue] = useAsyncState(valueProp);

  const inputRef = useRef<HTMLInputElement>(null);
  const showRef = useResultRef(
    () => !localStorage.getItem(HIDE_FAKE_BROWSER_URL_KEY),
  );
  const forceUpdate = useForceUpdate();

  const setFakeBrowserUrlDisplay = (display: boolean) => {
    if (display) {
      localStorage.removeItem(HIDE_FAKE_BROWSER_URL_KEY);
    } else {
      localStorage.setItem(HIDE_FAKE_BROWSER_URL_KEY, 'true');
    }
    showRef.current = display;
    forceUpdate();
  };

  const message = `The fake browser URL be hidden, if you show that, exec that in console:

setFakeBrowserUrlDisplay(true)
`;

  useEventListener(inputRef, 'search', (e: any) => {
    if (e.target.value === '') {
      setFakeBrowserUrlDisplay(false);
      // eslint-disable-next-line no-alert
      alert(message);
    }
  });

  const show = showRef.current;
  const prevShow = usePrevious(() => show);

  if (prevShow !== show && !show) {
    // eslint-disable-next-line no-console
    console.warn(message);
  }

  useEffect(() => {
    (window as any).setFakeBrowserUrlDisplay = setFakeBrowserUrlDisplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMainTab = useConnector(() => app.modules.PortManager.isMainTab);

  return show ? (
    <div className="w-full flex">
      <input
        data-sign="fakeBrowserURL"
        type="search"
        ref={inputRef}
        className="border-neutral-b2 border-2 px-4 py-2 bg-neutral-b4 w-full"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onCommitted(value);
          }
        }}
      />
      {isMainTab && (
        <div
          className="border-neutral-b2 border-2 bg-neutral-b4 p-2"
          title="main tab"
        >
          👑
        </div>
      )}
    </div>
  ) : null;
};
