import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SideBarView from '../SideBarView';
import Search from '../Search';

import LogoImg from '../../assets/images/logo_beta.svg';

import styles from './styles.scss';

function Footer() {
  return (
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
  );
}

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixSidebar: false,
    };
    this.onScroll = () => {
      if (!this.rootBody) {
        return;
      }
      const scrollTop = this.rootBody.scrollTop;
      if (scrollTop > 180) {
        this.setState({ fixSidebar: true });
      } else {
        this.setState({ fixSidebar: false });
      }
    };
  }

  render() {
    return (
      <div
        className={styles.root}
        onScroll={this.onScroll}
        ref={(rootBody) => { this.rootBody = rootBody; }}
      >
        <div className={styles.mainBody}>
          <header className={styles.header}>
            <div className={styles.wrapper}>
              <div className={styles.logo}>
                <LogoImg />
              </div>
            </div>
          </header>
          <div className={classnames(styles.wrapper, styles.content)}>
            <h1 className={styles.title}>
              RingCentral Widget
            </h1>
            <Search components={this.props.components} />
            <SideBarView
              components={this.props.components}
              fixed={this.state.fixSidebar}
            >
              {this.props.children}
            </SideBarView>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

MainView.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.array.isRequired,
};

export default MainView;
