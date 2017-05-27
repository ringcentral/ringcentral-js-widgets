import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

function SideBarView(props) {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <div className={styles.navigation}>
          <ul>
            <li>
              <Link to="/">
                OverView
              </Link>
            </li>
            <li>
              <Link to="/test">
                Components
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.main}>
        {props.children}
      </div>
    </div>
  );
}

SideBarView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBarView;
