/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, useImperativeHandle } from 'react';

const MockVirtuoso = forwardRef((props: any, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: () => {
        //
      },
      scrollIntoView: () => {
        //
      },
      scrollTo: () => {
        //
      },
      scrollBy: () => {
        //
      },
      adjustForPrependedItems: () => {
        //
      },
    }),
    [],
  );

  const Footer = props.components?.Footer;
  const Header = props.components?.Header;
  return (
    <ul {...props}>
      {Header && <Header />}
      {props.data?.map((value, index) =>
        props.itemContent?.(index, value, undefined),
      )}
      {Footer && <Footer />}
    </ul>
  );
});

/**
 * a mock component for fix react-virtuoso in test environment not re-rendered issue
 * https://github.com/petyosi/react-virtuoso
 *
 * TODO: temporary fix, should look source code to know what happened
 * https://github.com/petyosi/react-virtuoso/blob/master/src/List.tsx
 * https://github.com/petyosi/react-virtuoso/issues/26
 *
 * TODO: update juno virtuoso version
 * https://virtuoso.dev/mocking-in-tests/
 */
export const VirtuosoMock = forwardRef<any, any>(
  ({ Virtuoso, ...props }, ref) => {
    return <MockVirtuoso {...props} ref={ref} />;
  },
);
