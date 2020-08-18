declare module 'format-message' {
  function formatMessage(
    source: string,
    arg: Record<string | number, string | number>,
  ): string;
  export = formatMessage;
}
