# Widget templates
### Auth-panel ([template](auth-panel.html))
Used for login, can either be a login RingCentral WebRTC phone or other third party SDK. Basic supports include:

1. Countries selector for phone number
2. phone number and password record (`localStorage`)

##### Default property

###### actions

  - `init`
  - `render(target, callback)`
  - `remove`
  - `login`
  - `showCountry(event)`
  - `switchCountry(event)`

###### props

  `dom` `username` `extension` `password` `country`

##### Default service

[`login-service`](../src/scripts/service/login-service.js)


##### Example code

```javascript
var authPanel = w('auth-panel', {
    actions: {
        login: {
            method: function() {
                // Custom login logic happened here, you can also integrate with third party SDK

                // The default RingCentral login service:
                // var loginService = w.service()['loginService'];
                // return loginService.login(
                //     this.props.username,
                //     this.props.extension,
                //     this.props.password
                // );
            },
            after: function() {
                // UI intaraction after login success
                authPanel.remove();
            },
            error: function(e) {
                // Any errors will be handled by this function
                console.error(e.message);
            }
        }
    },
})

authPanel.render('#target-dom', /* callback */);

```

### Dial-pad
### Call-panel
### Call-log
