import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import withBackgrounds from '@storybook/addon-backgrounds';
import List from '../../components/List';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

storiesOf('List', module)
  .addDecorator(withBackgrounds([
    { name: 'listBackground', value: '#f9f9f9', default: true }
  ]))
  .add('basic', () => {
    const onChange = action('onChange');
    const switchProps = {
      title: text('Title', 'Switch Title'),
      checked: boolean('Checked', false),
      onChange,
      disable: boolean('Disabled', false),
    };
    return (<div style={{ width: '300px' }}>
      <List type="L01" />
      <List type="L02" switchProps={switchProps} />
    </div>);
  }
  );
