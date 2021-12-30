import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { RcModuleV2, state, action, createApp } from '../../lib/RcModule';
import { sleep } from '../lib/sleep';

class Foo extends RcModuleV2 {
  onInit() {
    return new Promise<void>(() => {});
  }
}

class Bar extends RcModuleV2 {}

class Counter extends RcModuleV2<{ foo: Foo; bar: Bar }> {
  constructor(deps: { foo: Foo; bar: Bar }) {
    super({ deps });
  }

  changeTime = 0;

  onStateChange() {
    this.changeTime += 1;
  }

  @state
  count = { sum: 0 };
}

class Root extends RcModuleV2<{ counter: Counter }> {
  constructor(deps: { counter: Counter }) {
    super({ deps });
  }

  get counter() {
    return this._deps.counter;
  }
}

@autorun(test)
@title('_depsCheck::basic')
export class DepsCheckBasic extends Step {
  run() {
    let counter: Counter;
    let foo: Foo;
    let bar: Bar;
    let root: Root;
    let rootCheckResult: RcModuleV2[];
    let counterCheckResult: RcModuleV2[];
    let fooCheckResult: RcModuleV2[];
    let barCheckResult: RcModuleV2[];
    return (
      <Scenario desc="">
        <Given
          desc="Define modules and create instances"
          action={() => {
            bar = new Bar();
            foo = new Foo();
            counter = new Counter({
              bar,
              foo,
            });
            root = new Root({
              counter,
            });
          }}
        />
        <When
          desc="Create app with modules instances and execute '_depsCheck'"
          action={async () => {
            createApp({
              main: root,
              modules: {
                counter,
                foo,
                bar,
              },
            });
            await sleep(0);
            rootCheckResult = root._depsCheck();
            counterCheckResult = counter._depsCheck();
            fooCheckResult = foo._depsCheck();
            barCheckResult = bar._depsCheck();
          }}
        />
        <Then
          desc="_depsCheck() results should be expected"
          action={async () => {
            expect(rootCheckResult.length).toBe(1);
            expect(rootCheckResult[0]).toBe(foo);
            expect(counterCheckResult.length).toBe(1);
            expect(counterCheckResult[0]).toBe(foo);
            expect(fooCheckResult).toEqual([]);
            expect(barCheckResult).toEqual([]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('_changeState::basic')
export class ChangeStateBasic extends Step {
  run() {
    let counter: Counter;
    let foo: Foo;
    let bar: Bar;
    let root: Root;
    return (
      <Scenario desc="">
        <Given
          desc="Define modules and create instances"
          action={() => {
            bar = new Bar();
            foo = new Foo();
            counter = new Counter({
              bar,
              foo,
            });
            root = new Root({
              counter,
            });
          }}
        />
        <When
          desc="Create app with modules instances and execute '_changeState'"
          action={async () => {
            createApp({
              main: root,
              modules: {
                counter,
                foo,
                bar,
              },
            });
            await sleep(0);
            expect(counter.changeTime).toBe(3);
            expect(counter.count.sum).toBe(0);
            counter._changeState(() => {
              counter.count.sum += 1;
            });
          }}
        />
        <Then
          desc="The count should be updated"
          action={async () => {
            expect(counter.changeTime).toBe(4);
            expect(counter.count.sum).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
