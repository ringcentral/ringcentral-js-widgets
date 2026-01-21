import type { RcBadgeProps, RcIconProps } from '@ringcentral/juno';
import {
  combineClasses,
  RcBadge,
  RcClasses,
  RcIcon,
  styled,
} from '@ringcentral/juno';
import type { ComponentProps } from 'react';
import React, { forwardRef, useMemo } from 'react';

import type { TooltipProps } from '../../Tooltip';
import { Tooltip } from '../../Tooltip';

import { navButtonStyle } from './styles';

export type NavButtonProps = {
  /**
   * emit path when button click
   */
  to: string;
  /**
   * tooltip title
   */
  title: string;
  /**
   * display icon component
   */
  symbol: RcIconProps['symbol'];
  /**
   * active icon component
   */
  activeSymbol: RcIconProps['symbol'];
  /**
   * event with click button, follow up with current `path`
   */
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    path: string,
  ) => void;
  /**
   * active state
   */
  active?: boolean;
  /**
   * props pass to tooltip
   */
  TooltipProps?: TooltipProps;
  /**
   * props pass to badge
   */
  BadgeProps?: Partial<RcBadgeProps>;
  width?: string;
  height?: string;
  dataSign?: string;
} & Omit<ComponentProps<'button'>, 'onClick' | 'ref'>;

const IntBadgeClasses = RcClasses<RcBadgeProps>(['badge'], 'Int');

const _NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  (
    {
      active,
      activeSymbol,
      symbol,
      title,
      dataSign,
      onClick,
      className,
      id,
      to,
      BadgeProps,
      TooltipProps,
      ...rest
    },
    ref,
  ) => {
    const currentIcon = active ? activeSymbol : symbol;

    const badgeClasses = useMemo(
      () =>
        combineClasses(
          {
            ...IntBadgeClasses,
            // TODO: wait Juno fix, then that can be removed
            badge: `RcBadge-badge ${IntBadgeClasses.badge}`,
          },
          {
            ...BadgeProps?.classes,
          },
        ),
      [BadgeProps],
    );

    return (
      <Tooltip title={title} {...TooltipProps}>
        <button
          ref={ref}
          type="button"
          onClick={(e) => onClick?.(e, to)}
          className={className}
          id={id}
          data-sign={dataSign}
          {...rest}
        >
          <RcBadge color="danger.b03" {...BadgeProps} classes={badgeClasses}>
            <RcIcon symbol={currentIcon} size="medium" />
          </RcBadge>
        </button>
      </Tooltip>
    );
  },
);

export const NavButton = styled(_NavButton)`
  ${navButtonStyle};

  ${RcBadge} {
    .${IntBadgeClasses.badge} {
      height: 1.4em;
      min-width: 1.4em;
      margin-top: 3px;
    }
  }
`;
