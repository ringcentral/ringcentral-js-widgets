import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import NavigationBar from '../NavigationBar';
import TabNavigationButton from '../TabNavigationButton';
import DropdownNavigationView from '../DropdownNavigationView';

function TabNavigationView(props) {
  const navBar = (
    <NavigationBar
      button={TabNavigationButton}
      childNavigationView={DropdownNavigationView}
      tabs={props.tabs}
      goTo={props.goTo}
      currentPath={props.currentPath}
      currentVirtualPath={props.currentVirtualPath}
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
  currentVirtualPath: PropTypes.string,
  goTo: PropTypes.func.isRequired,
  navigationPosition: PropTypes.oneOf(['top', 'bottom']),
  tabs: NavigationBar.propTypes.tabs,
};

TabNavigationView.defaultProps = {
  children: null,
  className: null,
  currentVirtualPath: undefined,
  navigationPosition: 'top',
  tabs: null,
};

export default TabNavigationView;
