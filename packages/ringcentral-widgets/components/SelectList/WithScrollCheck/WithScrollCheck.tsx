import React from 'react';

export const WithScrollCheck = (SelectList) => {
  const scrollCheck = (scrollElmRef, matchElmRef, elm, type) => {
    const scrollElm = scrollElmRef.current;
    const matchElm = matchElmRef.current;
    if (scrollElm && scrollElm.scrollHeight > scrollElm.clientHeight) {
      scrollElm.scrollTop =
        type === 'other'
          ? elm.offsetTop + matchElm.offsetHeight
          : elm.offsetTop;
    }
  };
  return (props) => <SelectList scrollCheck={scrollCheck} {...props} />;
};
