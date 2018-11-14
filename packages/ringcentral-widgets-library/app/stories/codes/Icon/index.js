import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs/react';
import Icon from '../../../elements/Icon';

storiesOf('Icon', module)
  .add('EndIcon', () => <Icon.End showBorder={false} onClick={action('EndIcon clicked')} />)
  .add('AnswerIcon', () => <Icon.Answer showBorder={false} onClick={action('AnswerIcon clicked')} />)
  .add('TransferIcon', () => {
    const props = {
      showBorder: boolean('showBorder', true),
      onClick: action('Transfer clicked'),
      disabled: boolean('disabled', false)
    };
    return <Icon.Transfer {...props} />;
  })
  .add('MergeIcon', () => {
    const props = {
      showBorder: boolean('showBorder', true),
      onClick: action('Merge clicked'),
      disabled: boolean('disabled', false)
    };
    return <Icon.Merge {...props} />;
  });
