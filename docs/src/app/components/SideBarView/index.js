import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Collapse from '../Collapse';
import styles from './styles.scss';

function ComponentList(props) {
  return (
    <ul>
      {
        props.components.map(component => (
          <li key={component.name}>
            <Link to={`/componets/${component.name}`}>
              {component.name}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

ComponentList.propTypes = {
  components: PropTypes.array.isRequired,
};

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
                <ComponentList components={props.components} />
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
  components: PropTypes.array.isRequired,
};

export default SideBarView;
