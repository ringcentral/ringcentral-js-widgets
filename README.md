# ringcentral-js-integration-commons

Integration common javascript core library.
In this project we aim to:

1. Refactor and converge all integration js code bases into a common package.
2. Utilize official ringcentral js sdk libraries as much as possible.

# Project Init

- [x] Server-side test framework setup
- [x] Browser-side test framework setup
- [x] Coding style guide document
- [x] Eslint check setup
- [ ] Webpack setup for distributing code
- [ ] CI setup

#To start

1. Install dependencies

    ```bash
    npm install
    ```
2. Create accounts.json

    ```json
    {
    "app": {
        "appKey": "${your app key}",
        "appSecret": "${your app secret}"
    },
    "apiServer": "${apiServer address}",
    "brand": {
        "name": "${brand name}",
        "id": "${brand id}"
    },
    "user": {
        "username": "${RingCentral sandbox account username}",
        "extension": "${RingCentral sandbox account extension}",
        "password": "${RingCentral sandbox account password}"
    }
    }
    ```

#Coding Style

Please refer to [airbnb/javascript](https://github.com/airbnb/javascript).
We will use the recommended linter settings and jscs settings, and adjust as we progress.

Also refer to .eslintrc for our own overrides.

#Linting

Run linter from commandline:
---

```bash
npm run eslint
```
Linter in Editors:
---

```bash
npm install -g eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

1. SublimeText

    Install sublime package control from [packagecontrol.io](https://packagecontrol.io/installation)

    Required Packages:
        * SublimeLinter
        * SublimeLinter-contrib-eslint
        * EditorConfig
    Recommended Pakcages:
        * Babel
        * GitGutter

    Linting should happen on file write.

2. VSCode

    Required Extensions:
        * ESLint
        * EditorConfig for VS Code
    Recommended Extensions:
        * Babel ES6/ES7

    The linting errors and warnings should show as ~~~ under the code.


#Tests

Run all tests:
```bash
npm run test
```

Run tests in specific test folder or file:
```bash
npm run test -- --folder folder1 --folder folder2,folder3
npm run test -- --folder test/unit

npm run test -- --file test/unit/enum.js
```
Both multiple --folder/--file declaration, or comma-delimmated list will work too.

#Test in Browsers

```bash
npm run test-Browser
```

Open localhost:8190 in your browser to run the tests.

#Contribution

Please fork and contribute via PR.

