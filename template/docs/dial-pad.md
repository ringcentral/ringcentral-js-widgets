#  Dial-pad
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
