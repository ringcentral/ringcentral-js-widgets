jest.mock('@ringcentral/juno/components/Virtuoso', () => {
  const { Virtuoso } = jest.requireActual(
    '@ringcentral/juno/components/Virtuoso',
  );
  const { VirtuosoMock } = jest.requireActual('./mock-virtuoso');
  const React = jest.requireActual('react');

  return {
    __esModule: true,
    ...jest.requireActual('@ringcentral/juno/components/Virtuoso'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Virtuoso: React.forwardRef((props: any, ref) => {
      return <VirtuosoMock Virtuoso={Virtuoso} {...props} ref={ref} />;
    }),
  };
});

// spring-ui not clone react-virtuoso any more, jupiter use patched react-virtuoso, so we can mock that directly
jest.mock('react-virtuoso', () => {
  const React = jest.requireActual('react');
  const { VirtuosoMock } = jest.requireActual('./mock-virtuoso');
  const reactVirtuoso = jest.requireActual('react-virtuoso');

  return {
    __esModule: true,
    ...reactVirtuoso,
    Virtuoso: React.forwardRef((props, ref) => (
      <VirtuosoMock {...props} ref={ref} />
    )),
  };
});
