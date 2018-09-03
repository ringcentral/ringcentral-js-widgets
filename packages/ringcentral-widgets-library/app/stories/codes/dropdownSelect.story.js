/**
 * @file DropdownSelect
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import DropdownSelect from '../../components/DropdownSelect';
import { select } from '@storybook/addon-knobs/dist/react';

storiesOf('DropdownSelect', module)
  .add('basic', () => {
    const dropdownAlign = {
      left: 'left',
      center: 'center',
      right: 'right',
    };
    const dropdownSelectProps = {
      options: [{
        key: 'option1',
        value: 'option1'
      }, {
        key: 'option2',
        value: 'option2'
      }],
      valueFunction: option => option.key,
      renderFunction: option => option.value,
      disabled: boolean('Disabled', false),
      value: 'option1',
      label: text('Label', 'label text'),
      titleEnabled: boolean('TitleEnabled', true),
      dropdownAlign: select('DropdownAlign', dropdownAlign)
    };
    return (
      <div style={{ width: '250px' }}>
        <DropdownSelect {...dropdownSelectProps} />
      </div>
    );
  });
