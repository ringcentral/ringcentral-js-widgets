# ringcentral-js-widget
This is the personal repository to do some experimental implementation of UI widget based on RingCentral JS SDK

## Development
#### Installation process
`npm install`
`bower install`
#### Development process
`gulp`
#### Test process
`npm test`

## Create widget
#### Development process
`npm run compile`

[Demo](http://lingforcc.github.io/ringcentral-js-widget/demo/fancy.html)

## Widgets document

###  Auth-panel 
[Source](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html)/[Demo](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html)

#### Overview
Auth panel provides an authorization interface to the targeted service. Default view contains of a dropdown list for displaying countries, a login button, and a 'Remember me' checkbox.


#### props
1. country
2. username
3. extension
4. password

#### data
1. lang
2. color
3. logo

#### actions
1. `remove()`

   Fade out (hide) the whole panel.
2. `login()`

   Assign the following  `props` based on the DOM input value.
```javascript
   this.props.username = this.dom.username.value
   this.props.extension = this.dom.extension.value
   this.props.password = this.dom.password.value
```
1. `showCountry(event)`

   Display the country list.    
2. `switchCountry(event)`

    Switch the selected country base on `event.target`.
3. `focus(event)`

    Focus the panel.
4. `blur(event)`

    Blur the panel.

#### Relevant services
1. loginService


###  Dial-pad
[Source](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/dial-pad.html)/[Demo](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/dial-pad.html)

#### Overview
Dial-pad provides a way to callout, it contains of a input field with auto-complete support, a set of dialing buttons and a callout button.


#### props
1. toNumber
2. fromNumber

#### data
1. lang
2. color
3. logo

#### actions
1. `dialing(event)`
    Action for the number buttons. Default action will be add specific number to the input field.
2. `callout(event)`
    Action for the callout button. Will set `props.fromNumber` and `props.toNumber`, widgets users need to provide a callout action using these two props.
3. `disable()`
    Disable the panel, will add a mask above whole panel.
4. `getOutboundCallerID()`
    Used by the nested `dropdown` widget, reference [`getData`]().
5. `queryContacts()`
    Used by the nested `contact-picker` widget, reference [`autoComplete`]().
6. `setNumber(value)`
    Manually fill the input field based on the value.
#### Relevant services
1. phoneService


