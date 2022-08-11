import React, { FunctionComponent, ReactNode } from 'react';

import classnames from 'classnames';
import { addIndex, reduce } from 'ramda';

import { Button, ButtonProps } from '../Button';
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
  // @ts-expect-error TS(2339): Property 'leftButtons' does not exist on type 'Cur... Remove this comment to see the full error message
  const { leftButtons, rightButtons } = addIndex<
    ButtonDefinition,
    RenderButtons
  >(reduce)(
    (acc, { hidden, disabled, placement, label, ...props }, idx) => {
      if (!hidden) {
        const button = (
          <Button
            key={idx}
            className={classnames(styles.button, disabled && styles.disabled)}
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
    // @ts-expect-error TS(2345): Argument of type 'ButtonDefinition[] | undefined' ... Remove this comment to see the full error message
    buttons,
  );

  return (
    <header
      className={classnames(styles.root, className)}
      onClick={onClick}
      data-sign="header"
    >
      {children ? (
        <div className={styles.label} data-sign="headerTitle">
          {children}
        </div>
      ) : null}
      {leftButtons.length ? (
        <div className={classnames(styles.buttonGroup, styles.leftButtons)}>
          {leftButtons}
        </div>
      ) : null}
      {rightButtons.length ? (
        <div className={classnames(styles.buttonGroup, styles.rightButtons)}>
          {rightButtons}
        </div>
      ) : null}
    </header>
  );
};

Header.defaultProps = {
  buttons: [],
};
