import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Emojify from 'react-emojione';

import emojiones from '../../assets/images/emojione.png';

import emojis from './emojis.json';
import styles from './styles.scss';

export default function EmojiSelect({
  onSelect,
  className,
}) {
  return (
    <div className={classnames(styles.root, className)}>
      {
        emojis.map((emoji) => {
          const emojsStr = `:${emoji}:`;
          return (
            <span
              key={emoji}
              className={styles.emoji}
              onClick={() => onSelect(emojsStr)}
            >
              <Emojify
                style={{
                  width: 25,
                  height: 25,
                  backgroundImage: `url("${emojiones}")`,
                }}
              >
                {emojsStr}
              </Emojify>
            </span>
          );
        })
      }
    </div>
  );
}

EmojiSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};

EmojiSelect.defaultProps = {
  className: undefined,
};
