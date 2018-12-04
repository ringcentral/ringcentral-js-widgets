import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links'

import Header from '../RC/Header';
import Body from '../RC/Body';
import NormalItem from '../../../components/List/NormalItem';

storiesOf('Pages/List', module)
  .add('L101', () => {
    const Line = ({ label }) => (
      <NormalItem>
        <NormalItem.Line
          label={label}
          onClick={linkTo('Components/List', 'NormalItem.line')}
        />
      </NormalItem>
    );

    return (
      <div className="list">
        <Header />
        <Body>
          <Line label="Calling" />
          <Line label="Region" />
          <Line label="test" />
        </Body>
      </div>
    );
  });
