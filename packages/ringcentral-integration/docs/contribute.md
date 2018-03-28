# Contribute

Coding Style
---

Please refer to [airbnb/javascript](https://github.com/airbnb/javascript).
We will use the recommended linter settings and jscs settings, and adjust as we progress.

Also refer to .eslintrc for our own overrides.

Linting
---

**Run linter from commandline:**


```bash
npm run eslint
```
**Linter in Editors:**

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


Tests
---

Run all tests:
```bash
npm run test
```

Run tests in specific test folder or file:
```bash
npm run quick-test -- --folder folder1 --folder folder2,folder3
npm run quick-test -- --folder test/lib

npm run quick-test -- --file test/lib/add-module.test.js
```
Both multiple --folder/--file declaration, or comma-delimmated list will work too.

To Contribute
---

1. Fork the project
2. Submit code via PR
3. Make sure to write tests to fully test reducers

At current state, we require all reducers to be tested.

More Guides
---
- [Creating Modules](creating-modules.md)
- [Local Development](local-development.md)


