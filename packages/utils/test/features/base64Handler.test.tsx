import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  decodeBase64DataUrl,
  isBase64DataUrl,
  fileToBase64,
  fileToBinary,
  base64ToBlob,
  base64ToFile,
} from '../../src/utils';

@autorun(test)
@title('DataUrl')
class Base64Hanlder extends Step {
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

@autorun(test)
@title('File to Base64')
class FileToBase64Test extends Step {
  run() {
    return (
      <Scenario desc="fileToBase64">
        <When desc="setup" />
        <Then
          desc="should convert File to base64 data URL"
          action={async () => {
            const file = new File(['Hello, World!'], 'test.txt', {
              type: 'text/plain',
            });
            const result = await fileToBase64(file);
            expect(result).toMatch(/^data:text\/plain;base64,/);
            expect(result).toContain('SGVsbG8sIFdvcmxkIQ==');
          }}
        />
        <Then
          desc="should convert Blob to base64 data URL"
          action={async () => {
            const blob = new Blob(['<div>hello</div>'], { type: 'text/html' });
            const result = await fileToBase64(blob);
            expect(result).toMatch(/^data:text\/html;base64,/);
            expect(result).toContain('PGRpdj5oZWxsbzwvZGl2Pg==');
          }}
        />
        <Then
          desc="should reject on FileReader error"
          action={async () => {
            const file = new File(['test'], 'test.txt', { type: 'text/plain' });
            // Mock FileReader to simulate error
            const originalFileReader = global.FileReader;
            const mockReader = {
              readAsDataURL: jest.fn(),
              onload: null,
              onerror: null,
            };
            global.FileReader = jest.fn(() => mockReader) as any;

            const promise = fileToBase64(file);

            // Simulate error immediately
            setTimeout(() => {
              if (mockReader.onerror) {
                (mockReader.onerror as any)(new Error('FileReader error'));
              }
            }, 0);

            await expect(promise).rejects.toThrow();

            // Restore original FileReader
            global.FileReader = originalFileReader;
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('File to Binary')
class FileToBinaryTest extends Step {
  run() {
    return (
      <Scenario desc="fileToBinary">
        <When desc="setup" />
        <Then
          desc="should be a function that accepts File or Blob"
          action={() => {
            expect(typeof fileToBinary).toBe('function');
            const file = new File(['Hello, World!'], 'test.txt', {
              type: 'text/plain',
            });
            const blob = new Blob(['<div>hello</div>'], { type: 'text/html' });

            // Test that the function can be called (returns a Promise)
            expect(fileToBinary(file)).toBeInstanceOf(Promise);
            expect(fileToBinary(blob)).toBeInstanceOf(Promise);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Base64 to Blob')
class Base64ToBlobTest extends Step {
  @examples(`
    | base64DataUrl                                                      | expectedType    |
    | 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='                     | 'text/plain'    |
    | 'data:text/html;base64,PGRpdj5oZWxsbzwvZGl2Pg=='                  | 'text/html'     |
    | 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='                      | 'image/svg+xml' |
    | 'data:application/json;base64,eyJ0ZXN0IjoidmFsdWUifQ=='           | 'application/json' |
  `)
  run() {
    return (
      <Scenario desc="base64ToBlob">
        <When desc="setup" />
        <Then
          desc="should convert base64 data URL to Blob with type ${expectedType}"
          action={({ base64DataUrl, expectedType }: any) => {
            const blob = base64ToBlob(base64DataUrl);
            expect(blob).toBeInstanceOf(Blob);
            expect(blob.type).toBe(expectedType);
            expect(blob.size).toBeGreaterThan(0);
          }}
        />
        ｈ
      </Scenario>
    );
  }
}

@autorun(test)
@title('Base64 to File')
class Base64ToFileTest extends Step {
  @examples(`
    | base64DataUrl                                                      | filename    | expectedType    |
    | 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='                     | 'test.txt'  | 'text/plain'    |
    | 'data:text/html;base64,PGRpdj5oZWxsbzwvZGl2Pg=='                  | 'test.html' | 'text/html'     |
    | 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='                      | 'test.svg'  | 'image/svg+xml' |
    | 'data:application/json;base64,eyJ0ZXN0IjoidmFsdWUifQ=='           | 'test.json' | 'application/json' |
  `)
  run() {
    return (
      <Scenario desc="base64ToFile">
        <When desc="setup" />
        <Then
          desc="should convert base64 data URL to File with name ${filename} and type ${expectedType}"
          action={({ base64DataUrl, filename, expectedType }: any) => {
            const file = base64ToFile(base64DataUrl, filename);
            expect(file).toBeInstanceOf(File);
            expect(file.name).toBe(filename);
            expect(file.type).toBe(expectedType);
            expect(file.size).toBeGreaterThan(0);
          }}
        />
      </Scenario>
    );
  }
}
