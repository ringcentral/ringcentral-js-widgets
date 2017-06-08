import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import NavigationBar from '../NavigationBar';

function TabNavigationView(props) {
  const navBar = (
    <NavigationBar
      tabs={props.tabs}
      goTo={props.goTo}
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
  children: PropTypes.node,
  className: PropTypes.string,
  currentPath: PropTypes.string.isRequired,
  goTo: PropTypes.func.isRequired,
  navigationPosition: PropTypes.oneOf(['top', 'bottom']),
  tabs: NavigationBar.propTypes.tabs,
};

TabNavigationView.defaultProps = {
  children: null,
  className: null,
  navigationPosition: 'top',
  tabs: null,
};

export default TabNavigationView;
