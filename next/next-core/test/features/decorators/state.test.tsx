// TODO:

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import {
  injectable,
  state,
  createSharedApp,
  RcViewModule,
  render,
  App,
  unmountComponentAtNode,
} from '../../..';

let element: Element;
let currentApp: App<any, any, any>;

beforeEach(() => {
  element = document.createElement('div');
  document.body.appendChild(element);
});

afterEach(() => {
  unmountComponentAtNode(element);
  element.remove();
  currentApp?.destroy();
});

@autorun(test)
@title('create a base app, module ${name}')
class Base extends Step {
  @examples([
    {
      name: '@state with undefined',
      getModule: () => {
        @injectable({
          name: 'CounterView',
        })
        class CounterView extends RcViewModule {
          @state
          count = undefined;

          component() {
            return null;
          }
        }
        return CounterView;
      },
    },
    {
      name: '@state with never',
      getModule: () => {
        @injectable({
          name: 'CounterView',
        })
        class CounterView extends RcViewModule {
          @state
          count = undefined;

          component() {
            return null;
          }
        }
        return CounterView;
      },
    },
  ])
  run() {
    let main: any;
    return (
      <Scenario desc="Base Module">
        <When
          desc="get Module ${name}"
          action={() => {
            main = this.example.getModule();
          }}
        />
        <Then
          desc="it should throw error if module ${name}"
          action={async () => {
            await expect(
              createSharedApp({
                modules: [],
                main,
                share: {
                  name: 'Base',
                  type: 'Base',
                },
                render,
              }),
            ).rejects.toThrow(
              'The slice reducer for key "count" returned undefined during initialization.',
            );
          }}
        />
      </Scenario>
    );
  }
}
