import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { CaretLeftMd } from '@ringcentral/spring-icon';
import {
  twMerge,
  IconButton,
  IconButtonProps,
  useResizeObserver,
} from '@ringcentral/spring-ui';
import React, { type FunctionComponent, forwardRef, useRef } from 'react';

import i18n from './i18n';

export interface PageHeaderProps {
  className?: string;
  /**
   * the default back button click handler.
   */
  onBackClick?: () => void;
  /**
   * Start adornment of the header.
   */
  startAdornment?: React.ReactNode;
  /**
   * End adornment of the header.
   */
  endAdornment?: React.ReactNode;
  /**
   * The classes of the header.
   */
  classes?: {
    startAdornment?: string;
  };
  /**
   * Children elements to be rendered within the header.
   */
  children?: React.ReactNode;
}

export const PageHeaderBackButton: FunctionComponent<IconButtonProps> = ({
  TooltipProps,
  ...rest
}) => {
  const { t } = useLocale(i18n);

  return (
    <IconButton
      TooltipProps={{
        title: t('back'),
        ...TooltipProps,
      }}
      symbol={CaretLeftMd}
      color="secondary"
      variant="contained"
      data-sign="backButton"
      size="medium"
      {...rest}
    />
  );
};

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      startAdornment,
      endAdornment,
      onBackClick,
      children,
      classes,
      ...rest
    },
    ref,
  ) => {
    const startRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    useResizeObserver(
      endRef,
      () => {
        if (startRef.current && endRef.current) {
          const startWidth = startRef.current.offsetWidth;
          const endWidth = endRef.current.offsetWidth;
          if (startWidth === endWidth) {
            return;
          }
          const maxWidth = Math.max(startWidth, endWidth);
          if (endWidth > startWidth) {
            startRef.current.style.width = `${maxWidth}px`;
          } else {
            endRef.current.style.width = `${maxWidth}px`;
          }
        }
      },
      {
        mode: 'throttle',
      },
    );
    return (
      <div
        ref={ref}
        className={twMerge(
          'w-full h-[50px] py-0.5 flex items-center gap-3 justify-between flex-none px-2',
          className,
        )}
        {...rest}
      >
        <div
          className={twMerge(
            'flex justify-start items-center h-full flex-none',
            classes?.startAdornment,
          )}
          ref={startRef}
        >
          {onBackClick && <PageHeaderBackButton onClick={onBackClick} />}
          {startAdornment}
        </div>
        {children && (
          <div className="flex justify-center flex-auto overflow-hidden typography-subtitle">
            {children}
          </div>
        )}
        <div
          ref={endRef}
          className="flex justify-end items-center h-full flex-none"
        >
          {endAdornment}
        </div>
      </div>
    );
  },
);
