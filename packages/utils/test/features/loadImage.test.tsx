import {
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { loadImage } from '../../src/utils';

const saveImage = global.Image;

@autorun(test)
@title('DataUrl')
export class LoadImage extends Step {
  @examples(`
    | success |
    | true    |
    | false   |
  `)
  run() {
    return (
      <Scenario desc="loadImage work correctly">
        <When
          desc="add global Image mock"
          action={({ success }: any, context: any) => {
            global.Image = class extends Image {
              constructor(width?: number, height?: number) {
                super(width, height);

                Promise.resolve().then(() => {
                  if (success) {
                    this.onload?.({} as any);
                  } else {
                    this.onerror?.({} as any);
                  }
                });
              }
            };
          }}
        />
        <Then
          desc="loadImage should return image data"
          action={async ({ success }: any) => {
            if (success) {
              const img = await loadImage('example.png');
              expect(img).toBeDefined();
              expect(img instanceof HTMLImageElement).toBeTruthy();
            } else {
              let error: Error | undefined;

              try {
                await loadImage('example.png');
              } catch (e) {
                if (e instanceof Error) {
                  error = e;
                }
              }

              expect(error).toBeDefined();
              expect(error?.message).toBe('Load image failed');
            }
          }}
        />
        <Then
          desc="restore global Image mock"
          action={() => {
            global.Image = saveImage;
          }}
        />
      </Scenario>
    );
  }
}
