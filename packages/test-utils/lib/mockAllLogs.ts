export function mockAllLogs() {
  ['debug', 'info', 'warn', 'log', 'error', 'time', 'timeEnd'].forEach(
    (key) => {
      jest.spyOn(console, key as never);
    },
  );
}
