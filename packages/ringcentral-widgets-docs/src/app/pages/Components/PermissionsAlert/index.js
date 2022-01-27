import React from 'react';
import { parse, resolver } from 'react-docgen';
import CodeExample from '../../../components/CodeExample';
import ComponentHeader from '../../../components/ComponentHeader';
import PropTypeDescription from '../../../components/PropTypeDescription';

import Demo from './Demo';
// eslint-disable-next-line
import demoCode from '!raw-loader!./Demo';
// eslint-disable-next-line
import componentCode from '!raw-loader!@ringcentral-integration/widgets/components/AlertRenderer/PermissionsAlert';

const PermissionsAlertPage = () => {
  const info = parse(componentCode, resolver.findAllComponentDefinitions);
  console.log(info);
  return (
    <div>
      <ComponentHeader name="PermissionsAlert" description={info.description} />
      <CodeExample code={demoCode} title="PermissionsAlert Example">
        <Demo />
      </CodeExample>
      <PropTypeDescription componentInfo={info} />
    </div>
  );
};

export default PermissionsAlertPage;