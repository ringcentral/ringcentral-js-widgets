import clsx from 'clsx';
import { addIndex, reduce } from 'ramda';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import type { ButtonProps } from '../Button';
import { Button } from '../Button';

import styles from './styles.scss';

export interface ButtonDefinition extends ButtonProps {
  placement: 'left' | 'right';
  hidden?: boolean;
  label: ReactNode;
}

interface HeaderProps {
  className?: string;
  onClick?(): void;
  buttons?: ButtonDefinition[];
}

interface RenderButtons {
  leftButtons: ReactNode[];
  rightButtons: ReactNode[];
}

export const Header: FunctionComponent<HeaderProps> = ({
  className,
  onClick,
  buttons,
  children,
}) => {
  const { leftButtons, rightButtons } = addIndex<
    ButtonDefinition,
    RenderButtons
  >(reduce)(
    (acc, { hidden, disabled, placement, label, ...props }, idx) => {
      if (!hidden) {
        const button = (
          <Button
            key={idx}
            className={clsx(styles.button, disabled && styles.disabled)}
            disabled={disabled}
            {...props}
          >
            {label}
          </Button>
        );
        if (placement === 'right') {
          acc.rightButtons.push(button);
        } else {
          acc.leftButtons.push(button);
        }
      }
      return acc;
    },
    {
      leftButtons: [],
      rightButtons: [],
    },
    buttons,
  );

  return (
    <header
      className={clsx(styles.root, className)}
      onClick={onClick}
      data-sign="header"
    >
      {children ? (
        <div className={styles.label} data-sign="headerTitle">
          {children}
        </div>
      ) : null}
      {leftButtons.length ? (
        <div className={clsx(styles.buttonGroup, styles.leftButtons)}>
          {leftButtons}
        </div>
      ) : null}
      {rightButtons.length ? (
        <div className={clsx(styles.buttonGroup, styles.rightButtons)}>
          {rightButtons}
        </div>
      ) : null}
    </header>
  );
};

Header.defaultProps = {
  buttons: [],
};
