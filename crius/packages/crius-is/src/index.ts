import { StepClass, StepFunction, Children, StepType, CriusNode } from 'crius';

const isCriusStepClass = (target: any): target is StepClass => {
  return !!(typeof target === 'function' && target.prototype?.isCriusStep);
};

const isCriusStepFunction = (target: any): target is StepFunction => {
  return !!(typeof target === 'function' && !target.prototype?.isCriusStep);
};

const isCriusStepFragment = (target: any): target is Children => {
  return (
    toString.call(target) === '[object Object]' &&
    target.key === '' &&
    target.props &&
    Array.isArray(target.props.children) &&
    (typeof target.step === 'undefined' || target.step === null)
  );
};

const isCriusStep = (target: any): target is StepType => {
  return isCriusStepClass(target) || isCriusStepFunction(target);
};

const isCriusNode = (target: any): target is CriusNode => {
  return (
    toString.call(target) === '[object Object]' &&
    Object.hasOwnProperty.call(target, 'key') &&
    target.props &&
    Array.isArray(target.props.children)
  );
};

export {
  isCriusStepClass,
  isCriusStepFunction,
  isCriusStep,
  isCriusNode,
  isCriusStepFragment,
};
