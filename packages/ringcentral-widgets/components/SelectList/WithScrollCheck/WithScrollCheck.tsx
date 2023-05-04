import React from 'react';

export const WithScrollCheck = (SelectList: any) => {
  const scrollCheck = (
    scrollElmRef: any,
    matchElmRef: any,
    elm: any,
    type: any,
  ) => {
    const scrollElm = scrollElmRef.current;
    const matchElm = matchElmRef.current;
    if (scrollElm && scrollElm.scrollHeight > scrollElm.clientHeight) {
      scrollElm.scrollTop =
        type === 'other'
          ? elm.offsetTop + matchElm.offsetHeight
          : elm.offsetTop;
    }
  };
  return (props: any) => <SelectList scrollCheck={scrollCheck} {...props} />;
};
