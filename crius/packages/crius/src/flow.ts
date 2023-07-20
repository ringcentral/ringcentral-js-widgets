import { Props, Key, Children, StepType } from './step';
import { StepClass } from './stepClass';

type Config<P> = { key?: Key } & P;
interface Options<P, C> {
  step: StepType<P, C>;
  key: Key;
  props: Props<P>;
}
class CriusNode<P = {}, C = {}> {
  public step: StepType<P, C>;
  public key: Key;
  public props: Props<P>;

  constructor({ step, key, props }: Options<P, C>) {
    this.step = step;
    this.key = key;
    this.props = props;
  }
}

const checkStepClass = <P, C>(
  step: StepType<P, C>,
): step is StepClass<P, C> => {
  if (typeof step !== 'function') {
    return false;
  }
  return !!step.prototype?.isCriusStep;
};

function createFlow<P extends {}, C extends {}>(
  step: StepType<P>,
  config: Config<P>,
  ...children: Children
) {
  let defaultProps: Partial<P>;
  let key = '';
  if (typeof step === 'function') {
    if (checkStepClass(step)) {
      key = step.name || step.prototype.constructor.name;
      defaultProps = step.prototype.defaultProps;
    } else {
      key =
        step.name ||
        (step.prototype ? step.prototype.constructor.name : 'anonymous');
      defaultProps = Object.getOwnPropertyDescriptor(
        step,
        'defaultProps',
      )?.value;
    }
  }
  key = config && config.key ? config.key : key;
  const props: Props<P> = {
    ...defaultProps!,
    children,
    ...config,
  };
  return new CriusNode({
    step,
    key,
    props,
  });
}

export { createFlow, CriusNode };
