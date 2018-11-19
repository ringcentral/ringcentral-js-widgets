import React from 'react';
import PropsTypes from 'prop-types';
import classnames from 'classnames';
import LinkLine from '../../../elements/LinkLine';
import Switch from '../../../elements/Switch';
import IconLine from '../../../elements/IconLine';

import styles from './styles.scss';

const LINE = 'line';
const SWITCH = 'switch';

function NormalItem({
  type,
  label,
  switchProps,
  lineProps,
  className,
}) {
  const cls = classnames(styles.normalWrapper, className);
  switch (type) {
    case LINE: {
      return <LinkLine className={cls} {...lineProps}>{label}</LinkLine>;
    }
    case SWITCH: {
      return <IconLine className={cls} icon={<Switch {...switchProps} />}>{label}</IconLine>;
    }
    default: {
      return null;
    }
  }
}

NormalItem.propsTypes = {
  type: PropsTypes.string.isRequired,
  label: PropsTypes.string,
  switchProps: PropsTypes.object,
  lineProps: PropsTypes.object,
};

NormalItem.defaultProps = {
  label: '',
  switchProps: null,
  lineProps: null,
};

export default NormalItem;
