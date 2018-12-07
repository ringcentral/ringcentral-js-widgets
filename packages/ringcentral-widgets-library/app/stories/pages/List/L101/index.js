import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Header from '../../RC/Header';
import Body from '../../RC/Body';
import NormalItem from '../../../../components/List/NormalItem';

const Line = ({ label }) => (
  <div onClick={linkTo('Components/List', 'NormalItem.line')}>
    <NormalItem>
      <NormalItem.Line
        label={label}
      />
    </NormalItem>
  </div>
);

const Switch = ({ label, checked = false }) => (
  <div onClick={linkTo('Components/List', 'NormalItem.switch')}>
    <NormalItem>
      <NormalItem.Switch
        label={label}
        checked={checked}
      />
    </NormalItem>
  </div>
);

export default function L101() {
  return (
    <div className="list">
      <Header />
      <Body>
        <Line label="Calling" />
        <Line label="Region" />
        <Switch label="Accept call queue calls" checked />
        <Switch label="Click to Dial/SMS" />
      </Body>
    </div>
  );
}
