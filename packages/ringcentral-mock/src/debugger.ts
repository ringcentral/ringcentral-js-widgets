import chalk from 'chalk';
import debug from 'debug';
import type { MockRequest } from 'fetch-mock';

const mockDebug = debug('rc-mock:mock');
const unmockDebug = debug('rc-mock:unmock');

export type Debugger = (debuggerOptions: {
  url: string;
  mock: boolean;
  request?: MockRequest;
  response?: { body?: any; status: number };
}) => void;

export const createDebugger: (options?: { verbose?: boolean }) => Debugger =
  ({ verbose = false } = {}) =>
  ({ url, mock, request = {}, response }) => {
    const now = new Date();
    const { method = 'GET', ...requestOptions } = request;
    const mockDebugger = mock ? mockDebug : unmockDebug;
    const spaceLength = mock ? 31 : 33;
    const shouldBeDebugged =
      new RegExp(process.env.URL ?? '.').test(url) &&
      new RegExp(process.env.METHOD ?? '.').test(method);
    if (!shouldBeDebugged) return;
    mockDebugger(
      `[${now.toTimeString().substring(0, 8)}.${now
        .getMilliseconds()
        .toString()
        .padStart(3, '0')}] `,
      `${
        mock
          ? chalk.green(`${method} ${chalk.underline(response?.status)} ${url}`)
          : chalk.red(`${method} ${url}`)
      }`,
      verbose
        ? `\n<RequestOptions> ${JSON.stringify(requestOptions, null, 2)}`
            .split('\n')
            .map((i) => `\n${' '.repeat(spaceLength)}${i}`)
            .join('')
        : ``,
      verbose && response?.body
        ? `<ResponseBody> ${JSON.stringify(response.body, null, 2)}`
            .split('\n')
            .map((i) => `\n${' '.repeat(spaceLength)}${i}`)
            .join('')
        : ``,
    );
  };
