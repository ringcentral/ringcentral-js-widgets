import { useEventCallback, useSleep } from '@ringcentral/spring-ui';
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useRef,
  useState,
} from 'react';
import { noop } from 'rxjs';

/**
 * AppContext is a context that can be used to control the app layout.
 */
export const AppContext = createContext<{
  nav: React.ReactNode;
  setNav: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  // nav related
  title: React.ReactNode;
  setTitle: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  navOverrideMode: boolean;
  setNavOverrideMode: React.Dispatch<React.SetStateAction<boolean>>;
  // footer related
  footer: React.ReactNode;
  setFooter: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  /**
   * set footer height, this will be used to calculate the toast position
   */
  footerHeight: number;
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
  additionalFooterHeightRef: React.MutableRefObject<number>;
  /**
   * reset app header and footer to default
   *
   * by default, we have 100ms delay to prevent flickering, if you want to reset immediately, set resetImmediately to true
   */
  reset: (resetImmediately?: boolean) => void;
  /**
   * cancel reset app header and footer, we have 100ms delay to prevent flickering
   */
  cancelReset: () => void;
  /**
   * top announcement ref for us can put some announcement on top of the page
   */
  announcementRef: React.RefObject<HTMLDivElement>;
  /**
   * the anchor below top announcement
   */
  announcementBottomAnchorRef: React.RefObject<HTMLDivElement>;
  /**
   * ref for render cover at main content
   */
  mainContentRef: React.RefObject<HTMLDivElement>;
  /**
   * ref for expanded area
   */
  expandedContentRef: React.RefObject<HTMLDivElement>;
}>({
  nav: null,
  setNav: noop,
  title: null,
  setTitle: noop,
  navOverrideMode: false,
  setNavOverrideMode: noop,
  footer: null,
  setFooter: noop,
  footerHeight: 0,
  setFooterHeight: noop,
  additionalFooterHeightRef: { current: 0 },
  reset: noop,
  cancelReset: noop,
  announcementBottomAnchorRef: { current: null },
  announcementRef: { current: null },
  mainContentRef: { current: null },
  expandedContentRef: { current: null },
});

export const AppProvider: FunctionComponent<{
  defaultFooterHeight?: number;
}> = ({ children, defaultFooterHeight = 0 }) => {
  const [nav, setNav] = useState<React.ReactNode | null>(null);
  const [title, setTitle] = useState<React.ReactNode | null>(null);
  const [navOverrideMode, setNavOverrideMode] = useState(false);

  const [footerHeight, setFooterHeight] = useState<number>(defaultFooterHeight);
  const [footer, setFooter] = useState<React.ReactNode | null>(null);
  const additionalFooterHeightRef = useRef(0);
  const announcementRef = useRef<HTMLDivElement>(null);
  const announcementBottomAnchorRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  const { sleep, cancel } = useSleep();

  const reset = useEventCallback((resetImmediately = false) => {
    const exec = () => {
      setNav(null);
      setTitle(null);
      setNavOverrideMode(false);
    };
    if (resetImmediately) return exec();

    // when first page have custom nav, and second page also have custom nav that will be value1 => null => value2, so use delay to prevent flickering
    // make that become value1 => value2 if that happens new value immediately
    sleep(100).then(exec).catch(noop);
  });

  const cancelReset = useEventCallback(cancel);

  return (
    <AppContext.Provider
      value={{
        nav,
        setNav,
        title,
        setTitle,
        navOverrideMode,
        setNavOverrideMode,
        footer,
        setFooter,
        footerHeight,
        setFooterHeight,
        additionalFooterHeightRef,
        announcementBottomAnchorRef,
        reset,
        cancelReset,
        announcementRef,
        mainContentRef,
        expandedContentRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContentRef = () => {
  const { mainContentRef, expandedContentRef } = useContext(AppContext);

  return { mainContentRef, expandedContentRef };
};
