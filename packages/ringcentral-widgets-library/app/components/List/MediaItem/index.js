import React from 'react';
import PropTypes from 'prop-types';

import Call from './Call';

import styles from './styles.scss';

function MediaItem({ children }) {
  return (
    <div className={styles.mediaWrapper}>
      {children}
    </div>
  );
}

MediaItem.Call = Call;

MediaItem.propTypes = {
  children: PropTypes.object
};

MediaItem.defaultProps = {
  children: null,
};

export default MediaItem;
