/**
 * @file button
 */
import React from 'react';

import { storiesOf } from '@storybook/react';

import SlideMenu from '../../../elements/SlideMenu';

storiesOf('Elements/SlideMenu', module)
  .add('basic', () => {
    const props = {
      onToggle() {
        alert('hello');
      }
    };
    return (
      <SlideMenu {...props}>
        basic
      </SlideMenu>
    );
  });
