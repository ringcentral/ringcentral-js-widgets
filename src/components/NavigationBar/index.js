import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';


function NavigationButton({
  active,
  activeIcon,
  icon,
  label,
  noticeCounts,
  onClick,
  width,
}) {
  let notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = <div className={styles.notices}>99+</div>;
    } else {
      notice = <div className={styles.notice}>{noticeCounts}</div>;
    }
  }
  return (
    <div
      onClick={onClick}
      className={classnames(
        styles.navigationButton,
        active && styles.active,
      )}
      style={{
        width,
      }}
    >
      <div className={styles.iconHolder} title={label}>
        <div className={styles.icon}>
          {active ? activeIcon : icon }
        </div>
        {notice}
      </div>
    </div>
  );
}
NavigationButton.propTypes = {
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  active: PropTypes.bool,
  label: PropTypes.string,
  noticeCounts: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onClick: PropTypes.func,
};
NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
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
  tabs: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
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
