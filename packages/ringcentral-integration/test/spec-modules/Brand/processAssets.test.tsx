import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  ut,
  When,
} from '@ringcentral-integration/test-utils';

import { processAssets, type BrandConfig } from '../../../modules/Brand';

interface ExampleItem {
  origin: string;
  assets: BrandConfig['assets'];
  expectedAssets: BrandConfig['assets'];
}

const assets: BrandConfig['assets'] = {
  logo: '/assets/logo.svg',
  icon: '/assets/icon.png',
};

const testExamples: ExampleItem[] = [
  {
    origin: null as any,
    assets,
    expectedAssets: {
      logo: '/assets/logo.svg',
      icon: '/assets/icon.png',
    },
  },
  {
    origin: undefined as any,
    assets,
    expectedAssets: {
      logo: '/assets/logo.svg',
      icon: '/assets/icon.png',
    },
  },
  {
    origin: '',
    assets,
    expectedAssets: {
      logo: '/assets/logo.svg',
      icon: '/assets/icon.png',
    },
  },
  {
    origin: '.',
    assets,
    expectedAssets: {
      $$processed$$: '1',
      logo: './assets/logo.svg',
      icon: './assets/icon.png',
    },
  },
  {
    origin: './',
    assets,
    expectedAssets: {
      $$processed$$: '1',
      logo: './assets/logo.svg',
      icon: './assets/icon.png',
    },
  },
  {
    origin: 'https://fake.com',
    assets,
    expectedAssets: {
      $$processed$$: '1',
      logo: 'https://fake.com/assets/logo.svg',
      icon: 'https://fake.com/assets/icon.png',
    },
  },
  {
    origin: 'https://fake.com//',
    assets,
    expectedAssets: {
      $$processed$$: '1',
      logo: 'https://fake.com/assets/logo.svg',
      icon: 'https://fake.com/assets/icon.png',
    },
  },
];

@autorun(test)
@ut
@title('Unit Test for processAssets - origin "${origin}"')
export class TestProcessAssets extends Step {
  @examples(testExamples)
  run() {
    let result: BrandConfig['assets'];
    return (
      <Scenario desc="Unit Test processAssets">
        <Given
          desc="Function is provided"
          action={() => {
            expect(processAssets).toEqual(expect.any(Function));
          }}
        />
        <When
          desc="Function is called with parameters provided"
          action={(example: ExampleItem) => {
            result = processAssets(example.assets, example.origin);
          }}
        />
        <Then
          desc="Return value should be as expected"
          action={(example: ExampleItem) => {
            expect(result).toEqual(example.expectedAssets);
          }}
        />
      </Scenario>
    );
  }
}
