import React from 'react';
import { GROUP_IDS } from './utils/const';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

import Badge from '../../components/Badge';
import styles from './badge.story.scss';

storiesOf('Badge', module)
  .add('Badge Theme', () => {
    const themes = {
      success: 'success',
      danger: 'danger',
    };
    const title = text('title', 'Badge Title', GROUP_IDS.BADGE);
    const draggable = boolean('draggable', false, GROUP_IDS.BADGE);
    const children = text('children', 'Badge Text', GROUP_IDS.BADGE);
    const theme = select('theme', themes, 'success', GROUP_IDS.BADGE);
    return (
      <Badge
        title={title}
        theme={theme}
        draggable={draggable}
        className={styles.badgeDemo}
        onClick={action('clicked')}
      >
        {children}
      </Badge>
    );
  });
