/* eslint-disable @typescript-eslint/no-use-before-define */
import { CriusNode, Children, StepFunction, CriusElement } from 'crius';
import {
  isCriusNode,
  isCriusStep,
  isCriusStepClass,
  isCriusStepFunction,
} from 'crius-is';
import { runWithLifecycle } from './lifecycle';
import { handleContext } from './context';

async function iterateChildren<C>(
  children: Children,
  context?: C,
): Promise<void> {
  for (const child of children) {
    if (isCriusStepFunction(child)) {
      const result = await child({}, context!);
      if (isCriusNode(result)) {
        await run(result as CriusNode, context);
      }
    } else if (isCriusNode(child)) {
      await run(child as CriusNode, context);
    } else if (Array.isArray(child)) {
      await iterateChildren(child, context);
    } else if (typeof child !== 'undefined') {
      console.warn(
        `Unexpected Error Crius Step Type: ${child} in ${children.map(
          (i) => i?.key,
        )}.`,
      );
      // throw new Error(
      //   `Unexpected Error Crius Step Type: ${child} in ${children}.`,
      // );
    }
  }
}

/**
 * Run A CriusNode
  Run flow with Crius Fragment.
  For example:
  <>
    <Bar bar='bar' />
    <FooBar fooBar='fooBar' />
  </>
  It will parser to:
  {
    key: '',
    props: {
      children: [
        {
          key: '',
          props: { children: [], bar: 'bar' },
          step: Bar
        },
        {
          key: '',
          props: { children: [], fooBar: 'fooBar' },
          step: FooBar
        }
      ]
    }
    step: undefined
  }
 * @param CriusNode
 */
async function run<P = {}, C = {}>(
  {
    step: Step,
    // key: Key,
    props,
  }: CriusNode<P, C>,
  _context?: C,
) {
  const context = handleContext(_context);
  if (isCriusStep(Step)) {
    let nextStep: CriusElement;
    let afterLifecycleAction;
    if (isCriusStepClass(Step)) {
      const step = new Step(props, context);
      await context.beforeEach?.(props, context, Step);
      [nextStep, afterLifecycleAction] = await runWithLifecycle(step);
    } else {
      const step: StepFunction = Step;
      await context.beforeEach?.(props, context, step);
      nextStep = await Step(props, context);
    }
    if (nextStep) {
      if (typeof nextStep === 'function') {
        await nextStep();
      } else if (isCriusNode(nextStep)) {
        await run(nextStep, context);
      } else if (Array.isArray(nextStep)) {
        await iterateChildren(nextStep, context);
      } else {
        // Ignore other type
      }
    }
    if (isCriusStepClass(Step) && typeof afterLifecycleAction === 'function') {
      await afterLifecycleAction();
    }
    await context.afterEach?.(props, context, Step);
  } else if (Array.isArray(props.children)) {
    await iterateChildren(props.children as Children, context);
  }
}

export { run };
