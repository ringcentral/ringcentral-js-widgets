import { CriusNode } from './flow';
import { StepClass } from './stepClass';
import { StepFunction } from './stepFunction';

export type StepType<P = {}, C = {}> = StepClass<P, C> | StepFunction<P, C>;

// TODO: fix type

// type Element = void | CriusNode | (() => any | Promise<any>) | Children;
type Element = any;

export type CriusElement = Promise<Element> | Element;

export type Key = string | undefined | null;

// export type Children = ReadonlyArray<
//   CriusNode<any, any> | StepType | undefined | null
// >;

export type Children = ReadonlyArray<
  CriusNode<any, any> | StepType | undefined | null | Element
>;

export type Props<P> = Readonly<P> &
  Readonly<{ children?: Children; key?: Key }>;
