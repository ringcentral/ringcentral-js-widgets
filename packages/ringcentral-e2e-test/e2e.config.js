const fs = require('fs');
const path = require('path');
const { envList: envs } = require('./src/lib/accountManager');
const { accounts } = require('./src/lib/accountManager/accountTypes');

const loginInfoPath = './loginInfo.js';
const isExists = fs.existsSync(path.resolve(__dirname, loginInfoPath));
const loginInfo = isExists ? require(loginInfoPath) : {};

module.exports = {
  selectorLabel: 'data-sign',
  caseServices: {
    originField: 'origin',
    handlerField: 'handler',
    projectIdField: 'projectId',
    urlField: 'url',
    defaultOrigin: 'einstein',
    list: [{
      origin: 'einstein',
      url: 'http://einstein.int.ringcentral.com/',
      handler: './src/lib/caseServices/einstein',
      projectId: loginInfo && loginInfo.caseServices && loginInfo.caseServices.projectId || 1309,
      username: loginInfo && loginInfo.caseServices && loginInfo.caseServices.username || null,
      password: loginInfo && loginInfo.caseServices && loginInfo.caseServices.password || null,
    }]
  },
  exec: {
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'enzyme'],
    levels: ['p0', 'p1'],
    brands: ['rc'],
    envs: ['xmnup'],
    tags: [
      ['widgets'],
      ['salesforce'],
      ['google'],
      ['office'],
    ],
  },
  defaults: {
    drivers: ['enzyme', 'puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'seleniumWebdriverChrome'],
    levels: ['p3'],
    brands: ['rc'],
    accounts: ['CM_RC_US'],
    tags: [
      [
        'salesforce',
        {
          modes: ['lightning', 'classic'],
          accounts: ['SF_RC_US'],
          drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'enzyme', 'seleniumWebdriverChrome']
        }
      ],
    ],
  },
  tester: {
    jest: {
      reporters:["default",
        ['<rootDir>/src/lib/reporter', {
          "pageTitle": "Test Report",
          "outputPath": "test-report.html",
          "includeFailureMsg": true,
          "includeConsoleLog": false,
          "dateFormat": "yyyy-mm-dd HH:MM:ss",
          "theme":"lightTheme",
          "sort": "titleAsc"
        }]
      ],
      testURL: 'http://localhost',
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
              extension: './build/extension/google/rc',
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            bt: {
              extension: './build/extension/google/bt',
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            att: {
              extension: './build/extension/google/att',
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            telus: {
              extension: './build/extension/google/telus',
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            }
          }
        }
      },
      office: {
        type: 'extension',
        source: './src/targets/office',
        params: {
          brands: {
            rc: {
              ...loginInfo.office && loginInfo.office.rc || {},
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            bt: {
              ...loginInfo.office && loginInfo.office.bt || {},
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            att: {
              ...loginInfo.office && loginInfo.office.att || {},
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            telus: {
              ...loginInfo.office && loginInfo.office.telus || {},
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
              ...loginInfo.salesforce || {},
              location: 'https://login.salesforce.com/',
            },
            att: {
              ...loginInfo.salesforce || {},
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
          },
          setting: {
            args: [
              '--disable-dev-shm-usage',
            ]
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
    accounts,
    envs,
  },
  lookupConfig({
    config,
    tag
  }) {
    const project = config.params.projects[tag.project];
    const source = project.source;
    return {
      ...project.params.brands[tag.brands],
      type: project.type,
      source,
    };
  }
};
