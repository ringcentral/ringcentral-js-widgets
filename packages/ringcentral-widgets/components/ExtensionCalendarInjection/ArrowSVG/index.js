import PropTypes from 'prop-types';
import React from 'react';
import { ThemeConsumer } from '../commons/themeContext';
import iconStyles from '../commons/icons.scss';

function ArrowSVG({ theme }) {
  if (theme.isOldUI) {
    return <i role="presentation" className={iconStyles.msIconCaretSolidDown} />;
  }

  return <i role="presentation" className={iconStyles.msIconChevronDown} />;
}

ArrowSVG.propTypes = {
  theme: PropTypes.object.isRequired
};

export default ThemeConsumer(ArrowSVG);
