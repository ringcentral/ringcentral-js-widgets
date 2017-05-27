import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Collapse from '../Collapse';
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
              <Collapse
                collapsed={false}
                button={'Components'}
              >
                <ul>
                  <li>
                    <Link to="/test">
                      Test1
                    </Link>
                  </li>
                  <li>
                    <Link to="/test">
                      Test2
                    </Link>
                  </li>
                </ul>
              </Collapse>
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
