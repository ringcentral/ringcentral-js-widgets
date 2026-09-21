import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { CaretLeftMd } from '@ringcentral/spring-icon';
import {
  twMerge,
  IconButton,
  IconButtonProps,
  useResizeObserver,
} from '@ringcentral/spring-ui';
import React, {
  type FunctionComponent,
  forwardRef,
  useCallback,
  useRef,
} from 'react';

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

const resizeObserverOptions = {
  mode: 'throttle',
  options: {
    trailing: true,
  },
} as const;

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
    const startContentRef = useRef<HTMLDivElement>(null);
    const endContentRef = useRef<HTMLDivElement>(null);

    const syncAdornmentWidth = useCallback(() => {
      const start = startRef.current;
      const end = endRef.current;
      const startContent = startContentRef.current;
      const endContent = endContentRef.current;
      if (!start || !end || !startContent || !endContent) {
        return;
      }
      const maxWidth = Math.max(
        startContent.offsetWidth,
        endContent.offsetWidth,
      );
      start.style.minWidth = `${maxWidth}px`;
      end.style.minWidth = `${maxWidth}px`;
    }, []);

    // observe the unsized content wrappers so the sizing applied on the outer
    // boxes never suppresses further resize notifications
    useResizeObserver(
      startContentRef,
      syncAdornmentWidth,
      resizeObserverOptions,
    );
    useResizeObserver(endContentRef, syncAdornmentWidth, resizeObserverOptions);

    const isTypeOfChildrenString = typeof children === 'string';

    return (
      <div
        ref={ref}
        className={twMerge(
          'w-full min-h-9 py-2 flex items-center justify-between flex-none px-3',
          className,
        )}
        {...rest}
      >
        <div
          className={twMerge(
            'justify-start h-full flex-none',
            classes?.startAdornment,
          )}
          ref={startRef}
        >
          <div ref={startContentRef} className="flex items-center h-full">
            {onBackClick && <PageHeaderBackButton onClick={onBackClick} />}
            {startAdornment}
          </div>
        </div>
        {children && (
          <div className="flex justify-center flex-auto overflow-hidden typography-subtitle min-w-0">
            {isTypeOfChildrenString ? (
              <span className="truncate">{children}</span>
            ) : (
              children
            )}
          </div>
        )}
        <div ref={endRef} className="justify-end h-full flex-none">
          <div ref={endContentRef} className="flex items-center h-full">
            {endAdornment}
          </div>
        </div>
      </div>
    );
  },
);
