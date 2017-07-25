import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function NavigationBar(props) {
  const tabWidth = props.tabs.length > 0 ?
    `${(1 / props.tabs.length) * 100}%` :
    0;
  const NavigationButton = props.button;
  return (
    <nav className={classnames(styles.root, props.className)}>
      {
        props.tabs.map((t, idx) => (
          <NavigationButton
            {...t}
            key={idx}
            onClick={() => {
              props.goTo(t.path);
            }}
            active={
              (t.isActive && t.isActive(props.currentPath)) ||
              t.path === props.currentPath
            }
            width={tabWidth}
          />
        ))
      }
    </nav>
  );
}
NavigationBar.propTypes = {
  className: PropTypes.string,
  button: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node,
    label: PropTypes.string,
    path: PropTypes.string.isRequired,
    isActive: PropTypes.func,
    noticeCounts: PropTypes.number,
  })),
  goTo: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};
NavigationBar.defaultProps = {
  className: undefined,
  tabs: [],
};

export default NavigationBar;
