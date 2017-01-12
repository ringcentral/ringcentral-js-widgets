import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './styles.scss';


function NavigationButton(props) {
  return (
    <Link
      to={props.path}
      className={classnames(
        styles.navigationButton,
        props.active && styles.active,
      )}
      style={{
        width: props.width,
      }}
    >
      <div className={styles.iconHolder}>
        <div className={styles.icon}>
          {props.icon}
        </div>
      </div>
      <div className={styles.labelHolder}>
        <div className={styles.label}>
          {props.label}
        </div>
      </div>
    </Link>
  );
}
NavigationButton.propTypes = {
  icon: PropTypes.node,
  path: PropTypes.string,
  active: PropTypes.bool,
  label: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

function NavigationBar(props) {
  const tabWidth = props.tabs.length > 0 ?
    `${(1 / props.tabs.length) * 100}%` :
    0;
  return (
    <nav className={classnames(styles.root, props.className)}>
      {
        props.tabs.map((t, idx) => (
          <NavigationButton
            {...t}
            key={idx}
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
  tabs: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node.isRequired,
    label: PropTypes.string,
    path: PropTypes.string.isRequired,
    isActive: PropTypes.func,
  })),
  currentPath: PropTypes.string.isRequired,
};
NavigationBar.defaultProps = {
  tabs: [],
};

export default NavigationBar;
