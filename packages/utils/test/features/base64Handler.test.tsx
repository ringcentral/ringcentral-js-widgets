import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { decodeBase64DataUrl, isBase64DataUrl } from '../../src/utils';

@autorun(test)
@title('DataUrl')
export class Base64Hanlder extends Step {
  @examples(`
    | dataURL                                          | isBase64 | inlineContent      |
    | 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='    | true     | 'Hello, World!'    |
    | 'data:text/html;base64,PGRpdj5oZWxsbzwvZGl2Pg==' | true     | '<div>hello</div>' |
    | 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='     | true     | '<svg></svg>'      |
  `)
  run() {
    return (
      <Scenario desc="DataUrl::decodeBase64DataUrl">
        <When desc="setup" />
        <Then
          desc="should return inline content ${inlineContent} when data URL is ${dataURL}"
          action={({ dataURL, isBase64, inlineContent }: any, { x }: any) => {
            expect(isBase64DataUrl(dataURL)).toBe(isBase64);
            expect(decodeBase64DataUrl(dataURL)).toBe(inlineContent);
          }}
        />
      </Scenario>
    );
  }
}
