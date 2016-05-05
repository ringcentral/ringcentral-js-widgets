#  Dial-pad
[Source](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/dial-pad.html)/[Demo](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html)

#### Overview
Dial-pad provides a way to callout, it contains of a input field with auto-complete support, a set of dialing buttons and a callout button.

#### Example

```javascript
w('dial-pad', {
  data : phone.data,
  actions: {
    mount: {
      after: function() {
        if (!accountService.hasServiceFeature("VoipCalling"))
          this.disable();
      }
    },
    callout: {
      method: function(fromNo, toNo) {
        return phoneService.callout(this.props.fromNumber, this.props.toNumber);
      },
      after: function() {
        
      },
    },
    queryContacts: {
      method: function() {
        //
      }
    },
    getOutboundCallerID: {
      method: function() {
        //
      }
    }
  }
})
```



#### Styling

| Class                  | Usage              | Default |
| ---------------------- | ------------------ | ------- |
| **dial-button--color** | dial button color  |         |
| **call-button--color** | call button colour |         |

See styles at the bottom of [auth-panel.html](https://github.com/LingForCC/ringcentral-js-widget/blob/master/template/auth-panel.html).


#### props

| Name       | Type     | Usage                                   | Default |
| ---------- | :------- | --------------------------------------- | ------- |
| toNumber   | *String* | The phone number used to call out.      |         |
| fromNumber | *String* | The phone number as outbound caller id. |         |

#### data

| Name | Type     | Usage                                    | Default |
| ---- | -------- | ---------------------------------------- | ------- |
| lang | *String* | L11N support. The value should be language codes, such as **en-us**. | en-us   |



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
2. accountService





