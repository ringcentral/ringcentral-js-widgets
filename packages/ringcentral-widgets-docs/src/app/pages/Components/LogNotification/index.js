import React from 'react';
import { parse } from 'react-docgen';
import CodeExample from '../../../components/CodeExample';
import ComponentHeader from '../../../components/ComponentHeader';
import PropTypeDescription from '../../../components/PropTypeDescription';

import Demo from './Demo';
// eslint-disable-next-line
import demoCode from '!raw-loader!./Demo';
// eslint-disable-next-line
import componentCode from '!raw-loader!@ringcentral-integration/widgets/components/LogNotification';

const LogNotificationPage = () => {
  const info = parse(componentCode);
  return (
    <div>
      <ComponentHeader name="LogNotification" description={info.description} />
      <CodeExample code={demoCode} title="LogNotification Example">
        <Demo />
      </CodeExample>
      <PropTypeDescription componentInfo={info} />
    </div>
  );
};

export default LogNotificationPage;
