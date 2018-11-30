import React from 'react';
import PropsTypes from 'prop-types';

import Switch from '../../../../elements/Switch';
import IconLine from '../../../../elements/IconLine';

function SwitchItem({
  label,
  title,
  checked,
  onChange,
  disable
}) {
  const icon = (
    <Switch
      title={title}
      checked={checked}
      disable={disable}
      onChange={onChange}
    />
  );
  return (
    <IconLine icon={icon}>
      {label}
    </IconLine>
  );
}

SwitchItem.propTypes = {
  title: PropsTypes.string,
  label: PropsTypes.string,
  checked: PropsTypes.bool,
  onChange: PropsTypes.func,
  disable: PropsTypes.bool
};

SwitchItem.defaultProps = {
  title: '',
  label: '',
  checked: false,
  onChange() { },
  disable: false
};

export default SwitchItem;
