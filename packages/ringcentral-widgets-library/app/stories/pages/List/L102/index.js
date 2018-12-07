import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Header from '../../RC/Header';
import Body from '../../RC/Body';
import CallItem from '../../../../components/List/CallItem';
import SearchInput from '../../../../elements/SearchInput';

import styles from './styles.scss';


export default function L101() {
  function Items() {
    return (new Array(6)).fill(undefined).map((i, index) => (
      <div key={index} className={styles.call} onClick={linkTo('Components/List', 'CallItem')} >
        <CallItem
          avatarUrl="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1542096539&di=1b15909917afacfde67df9f1ec893d2c&src=http://b-ssl.duitang.com/uploads/item/201501/25/20150125100619_waZTn.jpeg"
          userName={`test${index}`}
          showExtraInfo
          extraInfo="hello"
          isOnline={!!(Math.random() * 10 > 5)}
        />
      </ div>
    ));
  }
  return (
    <div className="list">
      <Header />
      <Body>
        <SearchInput value="" onChange={() => { }} className={styles.search} />
        <Items />
      </Body>
    </div>
  );
}
