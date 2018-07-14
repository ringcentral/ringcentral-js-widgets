import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

export function HeaderButton(props) {
  return (
    <div
      className={classnames(
        styles.button,
        props.disabled && styles.disabled,
      )}
      onClick={props.disabled ? undefined : props.onClick}
      title={props.title}
    >
      {props.label}
    </div>
  );
}

HeaderButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

HeaderButton.defaultProps = {
  onClick: undefined,
  label: undefined,
  disabled: false,
  title: undefined,
};

function Header(props) {
  let label = null;
  if (props.children) {
    label = (
      <div className={styles.label}>
        {props.children}
      </div>
    );
  }

  const leftButtons = props.buttons
    .filter(b => b.placement !== 'right' && !b.hidden)
    .map((b, idx) => (
      <HeaderButton key={idx} {...b} />
    ));

  const rightButtons = props.buttons
    .filter(b => b.placement === 'right' && !b.hidden)
    .map((b, idx) => (
      <HeaderButton key={idx} {...b} />
    ));

  return (
    <header className={classnames(styles.root, props.className)}>
      {label}
      {
        leftButtons.length
          ? (
            <div className={styles.leftButtons}>
              {leftButtons}
            </div>
          )
          : null
      }
      {
        rightButtons.length
          ? (
            <div className={styles.rightButtons}>
              {rightButtons}
            </div>
          )
          : null
      }
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.funcs,
    placement: PropTypes.oneOf(['left', 'right']),
  })),
};

Header.defaultProps = {
  className: '',
  children: undefined,
  buttons: [],
};

export default Header;
