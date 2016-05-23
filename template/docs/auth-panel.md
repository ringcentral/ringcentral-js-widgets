#  Auth-panel
[Source](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html)/[Demo](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html)

#### Overview
Auth panel provides an authorization interface to the targeted service. Default view contains of a dropdown list for displaying countries, a login button, and a 'Remember me' checkbox.

#### Example

```javascript
w('auth-panel', {
  data : {
    // provide a custom brand color.
    color: '#878787'
  },
  actions: {
    login: {
      method: function() {
        // loginService handle the bussiness logic of login process. 
        // For example, can be replaced with Facebook login.
        return loginService.login(
          this.props.username,
          this.props.extension,
          this.props.password
        )
      },
      after: function() {
        this.unmount()
      }
    }
  }
});
```



#### Styling

| Class                             | Usage                         | Default |
| --------------------------------- | ----------------------------- | ------- |
| **rc-auth-panel__content--color** | content background color      |         |
| **rc-auth-panel__content**        | content layout                |         |
| **rc-auth-panel__header—color**   | header background color       |         |
| **rc-auth-panel__header**         | header layout                 |         |
| **rc-auth-panel__button—color**   | login button background color |         |

See styles at the bottom of [auth-panel.html](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html).


#### props

| Name      | Type                | Usage                                    | Default |
| --------- | :------------------ | ---------------------------------------- | ------- |
| country   | *String*            | Transform the format of phone numbers based on this language code, such as **en-us**. | en-us   |
| username  | *String*            | The username (id, phone number) used to login. |         |
| extension | *String \| Integer* | Optional.                                |         |

#### data

| Name     | Type     | Usage                                    | Default |
| -------- | -------- | ---------------------------------------- | ------- |
| lang     | *String* | L11N support. The value should be language codes, such as **en-us**. | en-us   |
| external | Boolean  | Used for third-party login or Oauth 2.0. Hide the default input fields. |         |

#### actions

##### `login()`

 Use following `props` to log in the targeted service.
```javascript
   this.props.username
   this.props.extension
   this.props.password
```
##### `externalLogin()`



##### `disable()`



##### `country(value)`



##### `warn(message)`
