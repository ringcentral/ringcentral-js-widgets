// https://test_it_domain/test-cases/RCI-4591

import React from 'react';

import { render } from '@testing-library/react';
import { SubjectRender } from '../../../components/ConversationMessageList/SubjectRender';

describe('test conversation page message item will show url and email content as links', () => {
  test.each([
    {
      textContent:
        'This is a link: https://www.ringcentral.com/legal/emergency-services.html',
      expectLinkLength: 1,
      expectLinks: [
        'https://www.ringcentral.com/legal/emergency-services.html',
      ],
    },
    {
      textContent: 'Here are some links: baidu.cn, baidu.com',
      expectLinkLength: 2,
      expectLinks: ['baidu.cn', 'baidu.com'],
    },
    {
      textContent: 'hello harry@rc.com world',
      expectLinkLength: 1,
      expectLinks: ['harry@rc.com'],
    },
    {
      textContent: 'this is a normal text message',
      expectLinkLength: 0,
      expectLinks: [],
    },
    {
      textContent: 'https://www.ringcentral.com is cool',
      expectLinkLength: 1,
      expectLinks: ['https://www.ringcentral.com'],
    },
    {
      textContent: 'pls send email to: klay@company.com',
      expectLinkLength: 1,
      expectLinks: ['klay@company.com'],
    },
    {
      textContent: `You can reach Klay at:
      - Website: https://example.com
      - Email: klay@example.com
      Thanks.`,
      expectLinkLength: 2,
      expectLinks: ['https://example.com', 'klay@example.com'],
    },
    {
      textContent: `中文域名也是一个网站 腾讯qq.com, 空格会当作间隔标识,例如腾讯 qq.com`,
      expectLinkLength: 2,
      expectLinks: ['腾讯qq.com', 'qq.com'],
    },
  ])(
    'Enable auto hyperlink for conversation detail page. \n\t Test text: => $textContent',
    ({ textContent, expectLinkLength, expectLinks }) => {
      const { container } = render(<SubjectRender subject={textContent} />);
      const links = container.querySelectorAll('a') as any;
      const aLinks = [...links].map((node) => node.textContent);
      expect(links.length).toBe(expectLinkLength);
      expect(aLinks).toEqual(expectLinks);
    },
  );
});
