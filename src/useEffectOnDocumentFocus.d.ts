import { type DependencyList, type EffectCallback } from 'react';
/**
 * function same as useEffect method, which will only trigger when the document is focusing
 */
export declare const useEffectOnDocumentFocus: (effect: EffectCallback, deps?: DependencyList) => void;
