module.exports = {
  caseServices: [{
    name: 'Einstein1',
    url: 'http://www.einstein.com',
    handler: './einstein.js'
  }],
  exec: {
    drivers: ['puppeteer'],
    levels: [
      'p0',
      'p1'
    ],
    brands: [
      'rc',
      'att'
    ],
    tags: [
      ['widgets'],
      ['salesforce'],
    ],
  },
  defaults: {
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari'],
    levels: ['p3'],
    brands: ['rc'],
    tags: [
      ['salesforce', { modes: ['lightning'], drivers: ['puppeteer'] }],
    ],
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
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari'],
    levels: ['p0', 'p1', 'p2', 'p3'],
    brands: ['rc', 'bt', 'telus', 'att'],
  },
  lookupConfig({ config, tag }) {
    const project = config.params.projects[tag.project];
    return {
      ...project.params.brands[tag.brands],
      type: project.type,
    };
  }
};
