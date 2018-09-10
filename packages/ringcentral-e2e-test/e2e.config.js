module.exports = {
  selectorLabel: 'data-sign',
  caseServices: [{
    name: 'einstein',
    url: 'http://einstein.int.ringcentral.com/',
    handler: './einstein.js'
  }],
  exec: {
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'enzyme'],
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
    ],
  },
  defaults: {
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'enzyme'],
    levels: ['p3'],
    brands: ['rc'],
    tags: [
      ['salesforce', { modes: ['lightning'], drivers: ['puppeteer', 'seleniumWebdriverFirefox'] }],
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
        params: {
          brands: {
            rc: {
              location: '../../../resources/google/rc',
            },
            att: {
              location: '../../../resources/google/att',
            }
          }
        }
      },
      salesforce: {
        type: 'uri',
        params: {
          modes: [
            'lightning',
            'classic'
          ],
          brands: {
            rc: {
              username: '',
              password: '',
              location: 'http://localhost:8080/',
            },
            att: {
              username: '',
              password: '',
              location: 'http://localhost:8080/',
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
    drivers: ['enzyme', 'puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari'],
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
