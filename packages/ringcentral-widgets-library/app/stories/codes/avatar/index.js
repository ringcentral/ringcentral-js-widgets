import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs/react';
import Avatar from '../../../elements/Avatar';
import styles from './styles.scss';

storiesOf('Avatar', module)
  .add('base', () => {
    const props = {
      avatarUrl: text('avatarUrl', 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1542096539&di=1b15909917afacfde67df9f1ec893d2c&src=http://b-ssl.duitang.com/uploads/item/201501/25/20150125100619_waZTn.jpeg'),
      isOnConferenceCall: boolean('isOnConferenceCall', true),
      isOnline: boolean('isOnline', false),
      extraNum: number('extraNum', 2),
      onClick: action('clicked'),
      spinnerMode: boolean('spinnerMode', false)
    };
    return (
      <div className={styles.root}>
        <Avatar {...props} />
      </div>
    );
  });
