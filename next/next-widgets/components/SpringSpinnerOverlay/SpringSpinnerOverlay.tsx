import { twMerge, CircularProgressIndicator } from '@ringcentral/spring-ui';
import React, { type FunctionComponent, type HTMLAttributes } from 'react';

export type SpringSpinnerOverlayProps = {
  size?: number;
  /**
   * show loading mask
   */
  loading: boolean;
  /**
   * Always keep the children in the DOM when `loading`
   *
   * @default true
   * */
  keepMounted?: boolean;
  /**
   * show backdrop or not
   *
   * @default true
   */
  backdrop?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const SpringSpinnerOverlay: FunctionComponent<
  SpringSpinnerOverlayProps
> = ({
  loading,
  children = null,
  className,
  backdrop = true,
  keepMounted = true,
  ...rest
}) => {
  return (
    <>
      {loading ? (
        <>
          {keepMounted ? children : null}
          <div
            className={twMerge(
              'flex justify-center items-center fixed h-full w-full top-0 left-0 z-snackbar',
              className,
              !backdrop && 'pointer-events-none',
            )}
            data-sign="spinnerOverlay"
            {...rest}
          >
            {backdrop ? (
              <div className="bg-neutral-b3/40 h-full w-full absolute left-0 top-0" />
            ) : null}
            <CircularProgressIndicator />
          </div>
        </>
      ) : (
        children
      )}
    </>
  );
};
