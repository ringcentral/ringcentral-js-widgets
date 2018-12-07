import React from 'react';

import { storiesOf } from '@storybook/react';
import { number, text, boolean } from '@storybook/addon-knobs/react';

import SearchInput from '../../../elements/SearchInput';
import styles from './styles.scss';


storiesOf('Elements/SearchInput', module)
  .add('basic', () => {
    const props = {
      value: text('value', 'search input'),
      onChange() { },
      maxLenght: number('maxLength', 18),
      placeholder: text('placeholder', 'searching...'),
      disabled: boolean('disabled', false),
      className: styles.wrapper
    };
    return (
      <SearchInput {...props} />
    );
  });
