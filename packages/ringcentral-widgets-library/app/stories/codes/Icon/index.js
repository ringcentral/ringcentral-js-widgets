import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select } from '@storybook/addon-knobs/react';
import styles from './styles.scss';
import Icon from '../../../elements/Icon';

storiesOf('Icon', module)
  .add('Icon', () => {
    const label = 'types';
    const options = [
      'FaxOutBound',
      'VoiceMail',
      'Message',
      'Unlogged',
      'Logged',
      'ActivityCall',
    ];
    const defaultValue = 'VoiceMail';
    const value = select(label, options, defaultValue);
    return <Icon type={value} className={styles.iconSize} />;
  })
  .add('EndIcon', () => <Icon.End showBorder={false} className={styles.iconSize} onClick={action('EndIcon clicked')} />)
  .add('AnswerIcon', () => <Icon.Answer showBorder={false} className={styles.iconSize} onClick={action('AnswerIcon clicked')} />)
  .add('TransferIcon', () => {
    const props = {
      showBorder: boolean('showBorder', true),
      onClick: action('Transfer clicked'),
      disabled: boolean('disabled', false),
      className: styles.iconSize
    };
    return <Icon.Transfer {...props} />;
  })
  .add('MergeIcon', () => {
    const props = {
      showBorder: boolean('showBorder', true),
      onClick: action('Merge clicked'),
      disabled: boolean('disabled', false),
      className: styles.iconSize
    };
    return <Icon.Merge {...props} />;
  });
