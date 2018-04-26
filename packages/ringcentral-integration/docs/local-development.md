# Local Development

Dev-Server
---
Dev server is a quick server setup for testing code.

**Start Dev Server**
```bash
npm run dev-server
```

This will copy the dev-server-template to dev-server folder and start the server. Notice that `./config` cannot be found for the server. You have to manually create the file for some demo code in the template to work.


```javascript
// dev-server/config.js
export default {
  api: {
    appKey: `${your_ringcentral_appKey}`,
    appSecret: `${your_ringcentral_AppSecret}`,
    server: `${your_ringcentral_api_url}`,
  },
  user: {
    username: `${your_username}`,
    extension: `${your_extension}`,
    password: `${your_password}`,
  },
};

```

The dev-server folder is ignore in git, so you can do whatever you want to test your code here.

Further Reading
---

- [Dev Build](dev-build.md)
