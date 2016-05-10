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

1. `number(String)`
    Set the targeted number to call. Will also set the `props.fromNumber`
2. `callout()`
    Hook for callout logic.
3. `disable()`
    Disable the panel, will add a mask above whole panel.
4. `getOutboundCallerID(Array)`
    Get the list of outbound caller id.
5. `queryContacts(Array[{name, value}])`
    Get the list of contacts who can be called.

#### Relevant services

1. phoneService
2. accountService
