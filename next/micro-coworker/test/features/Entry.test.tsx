import {
  autorun,
  Given,
  p2,
  Scenario,
  Step,
  Then,
  title,
  ut,
} from '@ringcentral-integration/test-utils';

import { Entry } from '../steps/Entry';

@autorun(test)
@ut
@p2
@title('App run correctly')
class AppReady extends Step {
  run() {
    return (
      <Scenario desc="App run">
        <Given desc="App run" action={<Entry />} />
        <Then
          desc="key prop be expected"
          action={() => {
            expect(Object.keys(this.context)).toEqual([
              'title',
              'example',
              'beforeEach',
              'afterEach',
              'phone',
              'rcMock',
              'app',
              'mockServer',
              'payload',
            ]);
          }}
        />
      </Scenario>
    );
  }
}
