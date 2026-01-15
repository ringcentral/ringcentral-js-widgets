import { type CSSProperties } from 'react';
/**
 * set style with react, important is not able to set in react, so must need to use this hook to set style
 *
 * https://github.com/facebook/react/issues/1881#issuecomment-262257503
 */
export declare const useImportantStyle: (ref: React.MutableRefObject<HTMLElement | null>, style: CSSProperties) => void;
