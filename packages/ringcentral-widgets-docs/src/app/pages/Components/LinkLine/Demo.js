import React from 'react';
// eslint-disable-next-line
import LinkLine from '@ringcentral-integration/widgets/components/LinkLine';

/**
 * A example of `LinkLine`
 */
const LinkLineDemo = () => (
  <LinkLine to="test string" onClick={() => null}>
    <span>Line</span>
  </LinkLine>
);
export default LinkLineDemo;
