import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { dataUrlToInline, isBase64DataUrl } from '../../lib/dataUrl';

@autorun(test)
@title('DataUrl')
export class DataUrl extends Step {
  @examples(`
    | dataURL                                           | isBase64 | inlineContent |
    | 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='     | true     | 'Hello, World!' |
    | 'data:text/html;base64,PGRpdj5oZWxsbzwvZGl2Pg=='  | true     | '<div>hello</div>' |
    | 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='      | true     | '<svg></svg>' |
  `)
  run() {
    return (
      <Scenario desc="DataUrl::dataUrlToInline">
        <When
          desc="setup"
          action={(_: any, context: any) => {
            context.isBase64DataUrl = isBase64DataUrl;
            context.dataUrlToInline = dataUrlToInline;
            expect(typeof dataUrlToInline).toBe('function');
          }}
        />
        <Then
          desc="should return inline content ${inlineContent} when data URL is ${dataURL}"
          action={(
            _: any,
            { isBase64DataUrl, dataUrlToInline, example }: any,
          ) => {
            expect(isBase64DataUrl(example.dataURL)).toBe(example.isBase64);
            expect(dataUrlToInline(example.dataURL)).toBe(
              example.inlineContent,
            );
          }}
        />
      </Scenario>
    );
  }
}
