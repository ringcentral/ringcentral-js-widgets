module.exports = {
  selectorLabel: 'data-sign',
  caseServices: [{
    name: 'einstein',
    url: 'http://einstein.int.ringcentral.com/',
    handler: './einstein.js'
  }],
  exec: {
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverChrome'],
    levels: [
      'p0',
      'p1'
    ],
    brands: [
      'rc'
    ],
    tags: [
      ['widgets'],
      ['salesforce'],
      ['google'],
    ],
  },
  defaults: {
    drivers: ['enzyme', 'puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'seleniumWebdriverChrome'],
    levels: ['p3'],
    brands: ['rc'],
    tags: [
      ['salesforce', { modes: ['classic'], drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'enzyme', 'seleniumWebdriverChrome'] }],
    ],
  },
  tester: {
    jest: {
      moduleNameMapper: {
        'assets/images/.+?\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js'
      },
      transformIgnorePatterns: [
        '.*?/node_modules/(?!(ringcentral-integration|ringcentral-widgets|ringcentral-widgets-demo|locale-loader|babel-settings)/).*/'
      ],
      transform: {
        'loadLocale\\.js$': '<rootDir>/src/__mocks__/loadLocale.js',
        '^.+\\.js$': 'babel-jest'
      },
    }
  },
  params: {
    projects: {
      google: {
        type: 'extension',
        source: './src/targets/google',
        params: {
          brands: {
            rc: {
              extension: '/Users/jackson.lin/workspace/jackzong/googlechrome/build/extension/google/rc',
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            att: {
              extension: './resources/extension/google/att',
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            }
          }
        }
      },
      salesforce: {
        type: 'uri',
        source: './src/targets/widgets',
        params: {
          modes: [
            'lightning',
            'classic'
          ],
          brands: {
            rc: {
              location: 'https://login.salesforce.com/',
            },
            att: {
              username: '',
              password: '',
              location: 'https://login.salesforce.com/',
            }
          },
        }
      },
      widgets: {
        type: 'uri',
        source: './src/targets/widgets',
        driver: {
          viewport: {
            height: 518,
            width: 300,
          }
        },
        params: {
          brands: {
            rc: {
              location: 'http://localhost:8080/',
            },
            att: {
              location: 'http://localhost:8080/',
            },
          },
        }
      }
    },
    drivers: ['enzyme', 'puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'seleniumWebdriverChrome'],
    levels: ['p0', 'p1', 'p2', 'p3'],
    brands: ['rc', 'bt', 'telus', 'att'],
  },
  lookupConfig({ config, tag }) {
    const project = config.params.projects[tag.project];
    const source = project.source;
    return {
      ...project.params.brands[tag.brands],
      type: project.type,
      source,
    };
  }
};
