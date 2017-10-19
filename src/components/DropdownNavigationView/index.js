import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../NavigationBar';
import DropdownNavigationItem from '../DropdownNavigationItem';
import styles from './styles.scss';

export default class DropdownNavigationView extends Component {
  constructor(props) {
    super(props);
    this.removeChildNavBar = this.removeChildNavBar.bind(this);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setChildNavigationElement(el) {
    setTimeout(() => {
      this.childNavigationElement = el;
      if (this.childNavigationElement) {
        this.addListener();
      } else {
        this.removeListener();
      }
    }, 0);
  }

  addListener() {
    window.addEventListener('click', this.removeChildNavBar);
  }

  removeListener() {
    window.removeEventListener('click', this.removeChildNavBar);
  }

  removeChildNavBar(ev) {
    if (
      !this.childNavigationElement ||
      this.childNavigationElement === ev.target ||
      this.childNavigationElement.contains(ev.target)
    ) {
      return;
    }
    this.removeListener();
    this.props.goTo({
      virtualPath: '',
    });
  }

  render() {
    const {
      tabs,
      goTo,
      currentPath,
      currentVirtualPath,
    } = this.props;

    const activeTab = tabs.find(tab =>
      tab.childTabs &&
      (
        (tab.isActive && tab.isActive(currentPath, currentVirtualPath)) ||
        (tab.path && tab.path === currentPath) ||
        (tab.virtualPath && tab.virtualPath === currentVirtualPath)
      )
    );

    return (
      activeTab && activeTab.childTabs.length ? (
        <div
          className={styles.root}
          ref={(el) => { this.setChildNavigationElement(el); }}
        >
          {
            activeTab.childTabs.map((tab, index) => {
              const Icon = tab.icon;
              const icon = typeof Icon === 'function' ? <Icon /> : Icon;
              const ActiveIcon = tab.activeIcon;
              const activeIcon = typeof ActiveIcon === 'function' ? <ActiveIcon /> : ActiveIcon;
              return (
                <DropdownNavigationItem
                  {...tab}
                  key={index}
                  onClick={() => {
                    goTo(tab);
                  }}
                  active={
                    (tab.isActive && tab.isActive(currentPath, currentVirtualPath)) ||
                    (tab.path && tab.path === currentPath) ||
                    (tab.virtualPath && tab.virtualPath === currentVirtualPath)
                  }
                  icon={icon}
                  activeIcon={activeIcon}
              />
              );
            })
          }
        </div>
      ) : null
    );
  }
}

DropdownNavigationView.propTypes = {
  tabs: NavigationBar.propTypes.tabs.isRequired,
  goTo: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  currentVirtualPath: PropTypes.string,
};

DropdownNavigationView.defaultProps = {
  currentVirtualPath: undefined,
};
