import { createContext, MutableRefObject } from 'react';

export type SelectListContextValue = {
  scrollElmRef: MutableRefObject<any>;
};

export const SelectListContext = createContext<SelectListContextValue>({
  scrollElmRef: null,
});

SelectListContext.displayName = 'SelectListContext';
