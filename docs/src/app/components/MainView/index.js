import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SideBarView from '../SideBarView';
import logoImg from '../../assets/images/logo_beta.svg';

import styles from './styles.scss';

function MainView(props) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src={logoImg} alt={'RingCentral Logo Beta'} />
          </div>
        </div>
      </header>
      <div className={classnames(styles.wrapper, styles.content)}>
        <h1 className={styles.title}>
          RingCentral Widget
        </h1>
        <SideBarView>
          {props.children}
        </SideBarView>
      </div>
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <div className={styles.footerRow}>
            <div className={styles.footerRowLeft}>
              <div className={styles.footerLogo}>
                <a href="http://www.ringcentral.com">
                  <span>Back to the main site</span>
                </a>
              </div>
            </div>
            <div className={styles.footerRowRight}>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="http://www.ringcentral.com/legal.html" target="_blank">Legal</a>
                </li>
                <li>
                  <a href="http://www.ringcentral.com/security-statement.html" target="_blank">
                    Security Policy
                  </a>
                </li>
                <li>
                  <a href="http://www.ringcentral.com/legal/privacy-policy.html" target="_blank">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://devcommunity.ringcentral.com" target="_blank">
                    Community
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/ringcentral-developers" target="_blank">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={classnames(styles.footerRow, styles.footerRowLast)}>
            <div className={styles.footerRowLeft}>
              <span className={styles.copyright}>
                &copy 1999-2017 RingCentral, Inc. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

MainView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainView;
