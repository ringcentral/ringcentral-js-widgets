import React, {
  FunctionComponent,
  useContext,
  useLayoutEffect,
  useMemo,
} from 'react';

import { AppContext } from './AppContext';
import { ToastPositionAdjustor } from './ToastPositionAdjustor';

const empty = <></>;

/**
 * render content at the footer navigation area.
 *
 * by default will render the app nav, if you not want show the, just put `<AppFooterNav />` in the component.
 */
export const AppFooterNav: FunctionComponent<{
  additionalHeight?: number;
  children?: React.ReactNode;
}> = ({ children = empty, additionalHeight = 0 }) => {
  // for non spring-ui project, just return the children
  if (process.env.THEME_SYSTEM !== 'spring-ui') {
    return children as any;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setFooter, additionalFooterHeightRef } = useContext(AppContext);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    additionalFooterHeightRef.current = additionalHeight;
    setFooter(children);

    return () => {
      additionalFooterHeightRef.current = 0;
      setFooter(null);
    };
  }, [additionalHeight, children, additionalFooterHeightRef, setFooter]);

  return null;
};

type UseAppFooterProps = {
  defaultFooter: React.ReactNode;
  calculateHeight?: boolean;
  additionalFooterHeight?: number;
};

export const useAppFooter = ({
  defaultFooter,
  calculateHeight = true,
  additionalFooterHeight,
}: UseAppFooterProps) => {
  const { footer } = useContext(AppContext);

  const footerElement = useMemo(
    () => <footer>{footer || defaultFooter}</footer>,
    [defaultFooter, footer],
  );

  return {
    footer: calculateHeight ? (
      <ToastPositionAdjustor additionalFooterHeight={additionalFooterHeight}>
        {footerElement}
      </ToastPositionAdjustor>
    ) : (
      footerElement
    ),
  };
};

export const useFooterHeight = () => {
  const { footerHeight } = useContext(AppContext);
  return footerHeight;
};
