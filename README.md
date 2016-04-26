# ringcentral-js-unity
Extensible sdk wrapper framework around ringcentral-js sdk and ringcentral-web-phone.

The goal of this project is to create an extensible wrapper around the current ringcentral-js and ringcentral-web-phone.
The result should be an UI agnostic rc phone unit that can easily be custominzed. It should therefore be easy to fit any UI to the phone system, be it jQuery based UI implementation, Angular, or React.


## Project Init

- [x] Server-side test framework setup
- [ ] Browser-side test framework setup
- [x] Coding style guide document
- [x] Eslint check setup
- [ ] jscs check setup
- [ ] Webpack setup for distributing code
- [ ] CI setup

To start
---

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
3. Run test

    ```bash
    npm run test
    ```

Coding Style
---

Please refer to [airbnb/javascript](https://github.com/airbnb/javascript).
We will use the recommended linter settings and jscs settings, and adjust as we progress.

Also refer to .eslintrc for our own overrides.

Linting
---

```bash
npm run eslint
```




Please fork and contribute via PR.
