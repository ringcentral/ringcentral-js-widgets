import type { MutableRefObject } from 'react';
import { createContext } from 'react';

export type SelectListContextValue = {
  scrollElmRef: MutableRefObject<any>;
};

export const SelectListContext = createContext<SelectListContextValue>({
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'MutableRefO... Remove this comment to see the full error message
  scrollElmRef: null,
});

SelectListContext.displayName = 'SelectListContext';
