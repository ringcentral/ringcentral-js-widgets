import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from 'crius-test';

import { RcModuleV2, state, action, computed } from '../../lib/RcModule';

const generateModule = (
  numberComputedFn: Function,
  listCountComputedFn: Function,
  sumComputedFn: Function,
) => {
  class Foo extends RcModuleV2 {
    @state
    count = 0;

    @state
    list = ['test'];

    @action
    add() {
      this.list.push('text');
    }

    @action
    change() {
      this.list[0] = 'bar';
    }

    @action
    increase() {
      this.count += 1;
    }

    @computed((that: Foo) => [that.count])
    get number() {
      numberComputedFn();
      return this.count + 1;
    }

    @computed((that: Foo) => [that.list])
    get listCount() {
      listCountComputedFn();
      return this.list.length;
    }

    @computed((that: Foo) => [that.count, that.list.length])
    get sum() {
      sumComputedFn();
      return this.count + this.list.length;
    }
  }
  return Foo;
};

@autorun(test)
@title('RcModuleV2::computed check with "${executeFunction}"')
export class ModuleComputedCheck extends Step {
  @examples(`
    | executeFunction | numberComputed      | listCountComputed     | sumComputed         |
    | 'add'           | {time: 1, value: 1} | {time: 2, value: 2}   | {time: 2, value: 2} |
    | 'change'        | {time: 1, value: 1} | {time: 2, value: 1}   | {time: 1, value: 1} |
    | 'increase'      | {time: 2, value: 2} | {time: 1, value: 1}   | {time: 2, value: 2} |
  `)
  run() {
    return (
      <Scenario desc="RcModuleV2::computed check features">
        <Given
          desc="Generic RcModuleV2 instance fooInstance of class Foo"
          action={(_, context) => {
            context.numberComputedFn = jest.fn();
            context.listCountComputedFn = jest.fn();
            context.sumComputedFn = jest.fn();
            context.Foo = generateModule(
              context.numberComputedFn,
              context.listCountComputedFn,
              context.sumComputedFn,
            );
            context.fooInstance = context.Foo.create();
            expect(context.fooInstance instanceof context.Foo).toBeTruthy();
          }}
        />
        <When
          desc="barInstance run '${executeFunction}'"
          action={(_, context) => {
            const {
              fooInstance,
              numberComputedFn,
              listCountComputedFn,
              sumComputedFn,
              example: { executeFunction },
            } = context;
            expect(fooInstance.number).toBe(1);
            expect(fooInstance.sum).toBe(1);
            expect(fooInstance.listCount).toBe(1);
            expect(listCountComputedFn.mock.calls.length).toBe(1);
            expect(sumComputedFn.mock.calls.length).toBe(1);
            expect(numberComputedFn.mock.calls.length).toBe(1);
            fooInstance[executeFunction]();
          }}
        />
        <Then
          desc="barInstance should be computed numberComputed: ${numberComputed}, listCountComputed: ${listCountComputed}, and sumComputed:${sumComputed}"
          action={(_, context) => {
            const {
              fooInstance,
              numberComputedFn,
              listCountComputedFn,
              sumComputedFn,
              example: { numberComputed, listCountComputed, sumComputed },
            } = context;
            expect(fooInstance.listCount).toBe(listCountComputed.value);
            expect(fooInstance.sum).toBe(sumComputed.value);
            expect(fooInstance.number).toBe(numberComputed.value);
            expect(numberComputedFn.mock.calls.length).toBe(
              numberComputed.time,
            );
            expect(listCountComputedFn.mock.calls.length).toBe(
              listCountComputed.time,
            );
            expect(sumComputedFn.mock.calls.length).toBe(sumComputed.time);
          }}
        />
      </Scenario>
    );
  }
}
