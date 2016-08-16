const docs = require('react-docgen');
const path = require('path');
const dir = require('node-dir');
const fs = require('fs');

const src2 = `
import React from 'react';
import styles from './AuthPanel.css';

class AuthPanel extends React.Component {

  static propTypes = {
    // type: url
    redirectUri: React.PropTypes.string,
    /* Description of type: url */
    login: React.PropTypes.func,
    authorize: React.PropTypes.func,
    loginUrl: React.PropTypes.func,
    parseLoginUrl: React.PropTypes.func,
  };

  state = {
    isOauthOpened: false,
  }

  componentWillUnmount() {
    if (this.removeEventListener) {
      this.removeEventListener();
    }
  }

  oauth() {
    if (this.removeEventListener) {
      this.removeEventListener();
      this.removeEventListener = null;
    }
    const redirectUri = this.props.redirectUri;
    const oauthChannel = (e) => {
      if (e.data.type === 'oauth') {
        const { code } = this.props.parseLoginUrl(e.data.value);
        console.log(code);
        this.setState({ isOauthOpened: false });
        this.props.authorize({ code, redirectUri });
        window.removeEventListener('message', oauthChannel);
        this.removeEventListener = null;
      }
    };
    this.setState({ isOauthOpened: true });
    window.open(
      this.props.loginUrl({ redirectUri }),
      'oauth-iframe',
      'width=400, height=600'
    );
    window.addEventListener('message', oauthChannel);
    this.removeEventListener = () => window.removeEventListener('message', oauthChannel);
  }

  render() {
    return (
      <div className={styles.auth}>
        <button
          className={styles.loginButton}
          onClick={() => this.oauth()}
        >
          Login
        </button>
      </div>
    );
  }
}

export default AuthPanel;

`;

function genTestData(src) {
  const componentInfo = docs.parse(src);

  function dataGenerator(name, value) {
    const mapping = {
      string: 'randomString',
      array: [],
      func: 'FUNCTION',
      number: 1234567,
      node: 'ELEMENT',
      object: {
        key: 'val',
      },
      bool: true,
      any: 'ANYTHING',
    };
    if (name === 'enum') {
      return value[0].value;
    } else if (name === 'arrayOf') {
      return [dataGenerator(value.name, value.value)];
    } else if (name === 'shape') {
      console.log('shape');
      console.dir(value);
      const obj = {};
      Object.keys(value).forEach(key => {
        obj[key] = dataGenerator(value[key].name, value[key].value);
      });
      console.log(obj);
      return obj;
    }
    return mapping[name];
  }

  const result = Object.keys(componentInfo.props).reduce((accu, prop) => {
    if (componentInfo.props[prop].defaultValue) {
      return accu;
    }
    console.log(componentInfo.props[prop].type);
    return Object.assign({}, accu, {
      [prop]: dataGenerator(
                componentInfo.props[prop].type.name,
                componentInfo.props[prop].type.value
              ),
    });
  }, {});

  return result;
}

function walk(src, callback) {
  const results = {};
  dir.readFiles(src, { match: /.react.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      // console.log(filename);
      results[filename.split('/').pop()] = callback(content);
      next();
    }, (err, files) => {
      if (err) throw err;
      fs.writeFile('test.json', JSON.stringify(results));
      // console.log('----finish----');
    }
  );
}

walk(
  `${path.resolve(__dirname)}/../../src/widgets/modules/auth`,
  genTestData
);
