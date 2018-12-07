/**
 * @file checkBox
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import CheckBox from '../../../elements/CheckBox';
import { CheckBoxWrapper } from '../helper';

const data = [
  {
    key: 'option1',
    value: 'option1',
  },
  {
    key: 'option2',
    value: 'option2',

  },
  {
    key: 'option3',
    value: 'option3',
  }
];
const selected = 'option1';
const onSelect = ({ key }) => {
  console.log(`selected: ${key}`);
};

storiesOf('Elements/CheckBox', module)
  .add('basic', () => (
    <CheckBoxWrapper>
      <CheckBox
        data={data}
        selected={selected}
        onSelect={onSelect}
        valueField="key"
        textField="value"
      />
    </CheckBoxWrapper>
  ));
