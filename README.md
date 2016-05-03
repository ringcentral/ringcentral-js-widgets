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
1. remove()
   Fade out (hide) the whole panel.
2. login()
   Assign the following  `props` based on the DOM input value.
   `this.props.username = this.dom.username.value`
   `this.props.extension = this.dom.extension.value`
   `this.props.password = this.dom.password.value`
3. showCountry(event)
   Display the country list.    
4. switchCountry(event)
    Switch the selected country base on `event.target`.
5. focus(event)
    Focus the panel.
6. blur(event)
    Blur the panel.

#### Relevant service
1. loginService
