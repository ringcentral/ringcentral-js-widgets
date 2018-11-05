/**
 * @file spinner
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import Spinner from '../../components/Spinner';

storiesOf('Spinner', module)
  .add('basic', () => {
    const spinnerProps = {
      ringWidth: number('Border', 8)
    };
    return (
      <div style={{ width: '50px', height: '50px' }}>
        <Spinner {...spinnerProps} />
      </div>
    );
  });
