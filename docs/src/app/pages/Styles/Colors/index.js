import React from 'react';

import Markdown from '../../../components/Markdown';
import styles from './styles.scss';

const COLORS_LIST1 = [
  [
    { name: 'Marine', value: '#0570A1' },
    { name: 'RC Blue', value: '#0684BD' },
    { name: 'Sea', value: '#389DCA' },
    { name: 'Water', value: '#9BCEE5' },
  ],
  [
    { name: 'Rust', value: '#D44E4E' },
    { name: 'Tomato', value: '#F95B5C' },
    { name: 'Rouge', value: '#FDCACA' },
  ],
  [
    { name: 'Brass', value: '#CC9922' },
    { name: 'Gold', value: '#FFBF2A' },
    { name: 'Sunny', value: '#FFE5AA' },
  ],
];

const COLORS_LIST2 = [
  [
    { name: 'Carmel', value: '#D97400' },
    { name: 'Orange', value: '#FF8800' },
    { name: 'Apricot', value: '#FFCF99' },
  ],
  [
    { name: 'Envy', value: '#4C944C' },
    { name: 'Leaf', value: '#5FB95C' },
    { name: 'Mint', value: '#BFE3BE' },
  ],
  [
    { name: 'Night', value: '#2F2F2F' },
    { name: 'Ash', value: '#666666' },
    { name: 'Coin', value: '#999999' },
    { name: 'Smoke', value: '#C7C7C7' },
    { name: 'Sliver', value: '#E2E2E2', fontColor: '#000000' },
    { name: 'Egg', value: '#F9F9F9', fontColor: '#000000' },
    { name: 'Snow', value: '#FFFFFF', fontColor: '#000000' },
  ]
];

function ColorsBlock({ colors }) {
  return (
    <div className={styles.colorsBlock}>
      {
        colors.map(color => (
          <div
            key={color.value}
            className={styles.colorLine}
            style={{ background: color.value, color: color.fontColor }}
          >
            <span className={styles.colorName}>
              {color.name}
            </span>
            <span className={styles.colorValue}>
              {color.value}
            </span>
          </div>
        ))
      }
    </div>
  );
}

function ColorsPage() {
  return (
    <div>
      <Markdown
        text="# Colors"
      />
      <div className={styles.colorsList}>
        {
          COLORS_LIST1.map((colors, index) => <ColorsBlock colors={colors} key={index} />)
        }
      </div>
      <div className={styles.colorsList}>
        {
          COLORS_LIST2.map((colors, index) => <ColorsBlock colors={colors} key={index} />)
        }
      </div>
    </div>
  );
}

export default ColorsPage;
