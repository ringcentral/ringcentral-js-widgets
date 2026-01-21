import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import { screen } from '@ringcentral-integration/test-utils';
import { getTranslateFn } from '@ringcentral-integration/utils';
import React from 'react';

import { renderViewPanel } from '../../steps/renderView';

import { Example } from './Example';
import i18n, { t } from './Example/i18n';
import i18n2, { t as t2 } from './Example/i18n2';
import i18n3 from './Example/i18n3';

describe('renderViewPanel method', () => {
  it('renderViewPanel work correctly', async () => {
    const [app, renderResult] = await renderViewPanel(<div>View Element</div>);

    const { queryByText, asFragment } = renderResult;

    expect(screen.queryByText('View Element')).toBeInTheDocument();
    // make sure renderResult work correctly
    expect(queryByText('View Element')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderViewPanel with useLocale and Theme work correctly', async () => {
    const [app, renderResult] = await renderViewPanel(
      <div>
        <Example />
      </div>,
    );

    const locale = app.container.got(Locale)!;

    expect(locale.currentLocale).toBe('en-US');

    expect(screen.queryByText('en-US')).toBeInTheDocument();
    expect(
      screen.queryByText('Hello world John Show message'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Hello world John Show message2'),
    ).toBeInTheDocument();

    await locale.setLocale('zh-TW', false);

    expect(locale.currentLocale).toBe('zh-TW');

    expect(screen.queryByText('zh-TW')).toBeInTheDocument();
    expect(screen.queryByText('Hello world John 顯示訊息')).toBeInTheDocument();
    expect(
      screen.queryByText('Hello world John 顯示訊息2'),
    ).toBeInTheDocument();

    expect(renderResult.container).toMatchSnapshot();
  });

  it('Use i18n t directly in module service', async () => {
    const [app, renderResult] = await renderViewPanel(
      <div>
        <Example />
      </div>,
    );

    const locale = app.container.got(Locale)!;

    expect(locale.currentLocale).toBe('en-US');
    expect(
      t('showMessage', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John Show message');
    expect(
      t2('showMessage2', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John Show message2');

    await locale.setLocale('zh-TW', false);

    expect(locale.currentLocale).toBe('zh-TW');
    expect(
      t('showMessage', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John 顯示訊息');
    expect(
      t2('showMessage2', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John 顯示訊息2');

    // also make sure group T work correctly
    const groupT = getTranslateFn(i18n, i18n2);

    expect(
      groupT('showMessage', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John 顯示訊息');
    expect(
      groupT('showMessage2', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John 顯示訊息2');

    await locale.setLocale('en-US', false);

    expect(locale.currentLocale).toBe('en-US');
    expect(
      t('showMessage', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John Show message');
    expect(
      t2('showMessage2', {
        hello: 'Hello world',
        name: 'John',
      }),
    ).toBe('Hello world John Show message2');

    let argResult: any[] = [];
    const fn = jest.spyOn(console, 'warn').mockImplementation((...args) => {
      argResult = args;
    });
    // check i18n i18n3
    const groupT2 = getTranslateFn(i18n, i18n3);

    expect(fn).toHaveBeenCalled();

    expect(argResult).toMatchSnapshot();
  });
});
