import React from 'react';
import { parse } from 'react-docgen';
import CodeExample from '../../../components/CodeExample';
import ComponentHeader from '../../../components/ComponentHeader';
import PropTypeDescription from '../../../components/PropTypeDescription';

import Demo from './Demo';
// eslint-disable-next-line
import demoCode from '!raw-loader!./Demo';
// eslint-disable-next-line
import badgeCode from '!raw-loader!ringcentral-widgets/components/Badge';

const AppBarPage = () => {
  const info = parse(badgeCode);
  return (
    <div>
      <ComponentHeader name="Badge" description={info.description} />
      <CodeExample
        code={demoCode}
        title="Badge Example"
      >
        <Demo />
      </CodeExample>
      <PropTypeDescription componentInfo={info} />
    </div>
  );
};

export default AppBarPage;
