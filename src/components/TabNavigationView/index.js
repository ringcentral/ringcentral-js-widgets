import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import NavigationBar from '../NavigationBar';

function TabNavigationView(props) {
  const navBar = (
    <NavigationBar
      tabs={props.tabs}
      currentPath={props.currentPath}
    />
  );
  return (
    <div className={classnames(styles.root, props.className)} >
      {
        props.navigationPosition === 'top' ?
          navBar :
          null
      }
      <div className={styles.main}>
        {props.children}
      </div>
      {
        props.navigationPosition === 'bottom' ?
          navBar :
          null
      }
    </div>
  );
}

TabNavigationView.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  tabs: NavigationBar.propTypes.tabs,
  currentPath: PropTypes.string.isRequired,
  navigationPosition: PropTypes.oneOf(['top', 'bottom']),
};

TabNavigationView.defaultProps = {
  navigationPosition: 'top',
};

export default TabNavigationView;
