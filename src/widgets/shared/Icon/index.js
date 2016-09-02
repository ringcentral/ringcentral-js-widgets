import React from 'react';

import prefix from '../../../utils/style';
import classNames from 'classnames';

const { icon } = prefix(['icon'], 'Icon');

function iconClass(iconId) {
  return classNames(
          prefix([iconId], 'Icon')[iconId],
          icon
        );
}

const Icon = (props) => (
  <span className={iconClass(props.id)}></span>
);

export default Icon;
