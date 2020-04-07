import React, { Component } from 'react';

import DropdownNavigationItem from '../DropdownNavigationItem';
import styles from './styles.scss';
import { TabPropTypes } from '../NavigationBar';

type DropdownNavigationViewProps = {
  tabs: TabPropTypes[];
  goTo: (...args: any[]) => any;
  currentPath: string;
  currentVirtualPath?: string;
};
export default class DropdownNavigationView extends Component<
  DropdownNavigationViewProps
> {
  childNavigationElement: HTMLElement;

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
    const { tabs, goTo, currentPath, currentVirtualPath } = this.props;
    return tabs.length ? (
      <div
        className={styles.root}
        ref={(el) => {
          this.setChildNavigationElement(el);
        }}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const ActiveIcon = tab.activeIcon;
          const active =
            (tab.isActive && tab.isActive(currentPath, currentVirtualPath)) ||
            (tab.path && tab.path === currentPath) ||
            (tab.virtualPath && tab.virtualPath === currentVirtualPath);
          const isReverseFillIcon = tab.path === '/contacts' && !active;
          return (
            <DropdownNavigationItem
              {...tab}
              key={index}
              onClick={() => {
                goTo(tab);
              }}
              active={active}
              icon={typeof Icon === 'function' ? <Icon /> : Icon}
              isReverseFillIcon={isReverseFillIcon}
              activeIcon={
                typeof ActiveIcon === 'function' ? <ActiveIcon /> : ActiveIcon
              }
            />
          );
        })}
      </div>
    ) : null;
  }
}
