import React from 'react';

import Markdown from '../../components/Markdown';
import readme from './README.md';

function OverView() {
  return (
    <Markdown
      text={readme}
    />
  );
}

export default OverView;
