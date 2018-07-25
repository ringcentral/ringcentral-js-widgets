import React from 'react';
import { parse } from 'react-docgen';
import CodeExample from '../../../components/CodeExample';
import ComponentHeader from '../../../components/ComponentHeader';
import PropTypeDescription from '../../../components/PropTypeDescription';

import Demo from './Demo';
// eslint-disable-next-line
import demoCode from '!raw-loader!./Demo';
// eslint-disable-next-line
import componentCode from '!raw-loader!ringcentral-widgets/components/ConferenceAlert';

const ConferenceAlertPage = () => {
  const info = parse(componentCode);
  return (
    <div>
      <ComponentHeader name="ConferenceAlert" description={info.description} />
      <CodeExample
        code={demoCode}
        title="ConferenceAlert Example"
      >
        <Demo />
      </CodeExample>
      <PropTypeDescription componentInfo={info} />
    </div>
  );
};

export default ConferenceAlertPage;
