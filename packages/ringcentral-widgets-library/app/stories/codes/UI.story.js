import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from './UI.story.scss';

const colorsMap = {
  Blue: {
    blue500: {
      backgroundColor: '#0684bd',
    },

    'blue-600': {
      backgroundColor: '#0570a1',
    },

    'blue-400': {
      backgroundColor: '#9bcee5',
    },

    'blue-300': {
      backgroundColor: '#cdeefd',
    },

    'blue-200': {
      backgroundColor: '#e6f2f8',
    },

    'blue-100': {
      backgroundColor: '#f5fafc',
    },
  },
  Orange: {
    orange500: {
      backgroundColor: '#ff8800',
    },

    'orange-600': {
      backgroundColor: '#d97400',
    },

    'orange-400': {
      backgroundColor: '#ffcf99',
    },
  },
  Nature: {
    'nature-500': {
      backgroundColor: '#000000',
    },

    'nature-400': {
      backgroundColor: '#2f2f2f',
    },

    'nature-300': {
      backgroundColor: '#666666',
    },

    'nature-200': {
      backgroundColor: '#999999',
    },

    'nature-100': {
      backgroundColor: '#c7c7c7',
    },

    'nature-50': {
      backgroundColor: '#e2e2e2',
    },

    'nature-20': {
      backgroundColor: '#f9f9f9',
    },

    'nature-10': {
      backgroundColor: '#ffffff',
    },
  },
  Red: {
    'red-500': {
      backgroundColor: '#f95b5c',
    },
    'red-600': {
      backgroundColor: '#ff3703',
    },
  },
  Green: {
    'green-500': {
      backgroundColor: '#5fb95c',
    },
  },
};

storiesOf('UI Pattern', module)
  .add('Colors', () => (
    <div className={styles.module} > {
      Object.keys(colorsMap).map(dominant => (
        <div key={dominant}>
          <div className={styles.title}>{dominant}</div>
          <div className={styles.group}>
            {
            Object.keys(colorsMap[dominant]).map(colorName => (
              <div key={colorName} className={styles.item}>
                <div className={`${styles.legend} ${styles[colorName]}`}>&nbsp;</div>
                <div>{`${colorsMap[dominant][colorName].backgroundColor}`}</div>
              </div>
            ))
            }
          </div>
        </div>
      ))
    }
    </div>
  ));
