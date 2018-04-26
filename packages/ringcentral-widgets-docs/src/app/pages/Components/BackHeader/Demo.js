import React from 'react';
// eslint-disable-next-line
import BackHeader from 'ringcentral-widgets/components/BackHeader';

const props = {};

/**
 * A example of `BackHeader`
 */
const BackHeaderDemo = () => (
  <BackHeader
    buttons={[]}
    onBackClick={() => alert('Implement \'onBackClick\'') }>
    {'Back Header'}
  </BackHeader>
);
export default BackHeaderDemo;
