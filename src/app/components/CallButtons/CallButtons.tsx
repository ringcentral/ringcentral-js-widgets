/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Tooltip } from '@ringcentral-integration/next-widgets/components/Tooltip';
import { CallFilledMd, HoldFilledMd } from '@ringcentral/spring-icon';
import {
  IconButton,
  IconButtonProps,
  twMerge,
  useA11yKeyEvent,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

export type EndAndHoldProps = {
  size: 'large' | 'xlarge' | 'small' | 'medium';
} & Omit<IconButtonProps, 'size'>;

export const CallButtonContainer: FunctionComponent<EndAndHoldProps> = ({
  children,
  size,
  label,
  TooltipProps,
  className,
  onMouseOver,
  onMouseLeave,
}) => {
  // TODO: spring-ui issue focus inside on children should also show the tooltip
  return (
    <Tooltip {...TooltipProps}>
      <div
        onMouseOver={onMouseOver as any}
        onMouseLeave={onMouseLeave as any}
        data-button-container
        className={twMerge(
          'inline-flex items-center justify-start flex-col',
          size === 'small' && 'gap-1',
          size === 'large' && 'gap-1',
          size === 'xlarge' && 'gap-2 w-20',
          className,
        )}
      >
        {children}

        {label && (
          <div className="typography-descriptorMini text-center">{label}</div>
        )}
      </div>
    </Tooltip>
  );
};

const CUSTOM_SIZE_MAP = {
  small: {
    answer: 'size-7',
    action: 'size-5',
  },
  medium: {
    answer: 'size-6',
    action: 'size-4',
  },
  large: null,
  xlarge: null,
};

const ICON_MAP = {
  small: { size: 'small' as const, iconSize: 'xsmall' as const },
  medium: { size: 'small' as const, iconSize: 'xsmall' as const },
  large: { size: 'small' as const, iconSize: 'xsmall' as const },
  xlarge: { size: 'medium' as const, iconSize: 'small' as const },
};
const ICON_CONTAINER_MAP = {
  small: 'size-9',
  medium: 'size-8',
  large: 'size-[48px]',
  xlarge: 'size-16',
};

const GroupButton: FunctionComponent<EndAndHoldProps> = ({
  size,
  children,
  onClick,
  ...rest
}) => {
  const handleKeyDown = useA11yKeyEvent(onClick);

  return (
    <div
      {...(rest as any)}
      tabIndex={0}
      role="button"
      onClick={onClick as any}
      onKeyDown={handleKeyDown}
      className={clsx(
        'relative focus-visible:focus-ring-normal outline-none',
        ICON_CONTAINER_MAP[size],
      )}
    >
      <div className="pointer-events-none">{children}</div>
      <div className="hover:bg-neutral-base/20 active:bg-neutral-base/30 absolute top-0 left-0 size-full"></div>
    </div>
  );
};

export const EndAndAnswerButton: FunctionComponent<EndAndHoldProps> = ({
  onClick,
  disabled,
  size,
  ...rest
}) => {
  const iconSizes = ICON_MAP[size];
  const customClasses = CUSTOM_SIZE_MAP[size];

  const icon = (
    <GroupButton
      size={size}
      onClick={onClick}
      data-sign={(rest as any)['data-sign']}
    >
      <IconButton
        tabIndex={-1}
        className={clsx(
          customClasses?.action,
          'absolute top-0 left-0 rotate-[135deg]',
        )}
        {...iconSizes}
        symbol={CallFilledMd}
        color="danger"
        variant="contained"
        disabled={disabled}
      />
      <IconButton
        tabIndex={-1}
        className={clsx(customClasses?.answer, 'absolute bottom-0 right-0')}
        size={size}
        symbol={CallFilledMd}
        color="success"
        variant="contained"
        disabled={disabled}
      />
    </GroupButton>
  );

  return (
    <CallButtonContainer size={size} {...rest}>
      {icon}
    </CallButtonContainer>
  );
};

export const AnswerAndHoldButton: FunctionComponent<EndAndHoldProps> = ({
  onClick,
  disabled,
  size,
  ...rest
}) => {
  const iconSizes = ICON_MAP[size];
  const customClasses = CUSTOM_SIZE_MAP[size];

  const icon = (
    <GroupButton
      size={size}
      onClick={onClick}
      data-sign={(rest as any)['data-sign']}
    >
      <IconButton
        tabIndex={-1}
        className={clsx(customClasses?.action, 'absolute top-0 left-0')}
        {...iconSizes}
        symbol={HoldFilledMd}
        color="primary"
        variant="contained"
        disabled={disabled}
      />
      <IconButton
        tabIndex={-1}
        className={clsx(customClasses?.answer, 'absolute bottom-0 right-0')}
        size={size}
        symbol={CallFilledMd}
        color="success"
        variant="contained"
        disabled={disabled}
      />
    </GroupButton>
  );

  return (
    <CallButtonContainer size={size} {...rest}>
      {icon}
    </CallButtonContainer>
  );
};
