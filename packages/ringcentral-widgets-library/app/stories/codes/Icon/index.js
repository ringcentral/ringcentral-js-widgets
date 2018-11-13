import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Icon from '../../../elements/Icon';

storiesOf('Icon', module)
  .add('EndIcon', () => <Icon.End showBorder={false} onClick={action('clicked')} />)
  .add('AnswerIcon', () => <Icon.Answer showBorder={false} onClick={action('clicked')} />);
