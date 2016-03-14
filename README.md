# ringcentral-js-widget
This is the personal repository to do some experimental implementation of UI widget based on RingCentral JS SDK


#### Installation process
`npm install`
`bower install`
#### Development process
`gulp`
#### Test process
`npm test`
[Demo](http://lingforcc.github.io/ringcentral-js-widget/demo/)

# How to build a widget?
## 1. Define a HTML template
#### HTML tag attributes
* Elements with `data-info` will be stored as widgets `this.props.dom` references.
* Elements with `data-event` will be bound a widgets actions.

The example templates can be found in `template` folder.

## 2. Define a widget
```javascript
import { Component, register } from '../component'
// [Step.1] Register a component
var DialPad = register({
    /*
    * [Step.2] Define UI interaction
    * Define beforeUpdate method for 'UI' update,
    * this method will be called whenever an action is triggered,
    * actions are registered below
    */
    beforeUpdate: function(action, props) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            this.interval = loading(this.props.dom.callout, 'Call');
        }
    },
    /*
    * Define afterUpdate method for 'UI' update,
    * this method will be called whenever an action is triggered,
    * actions are registered below
    */
    afterUpdate: function(action, props) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            if (this.interval) {
                this.interval.cancel('Call');
                this.interval = null;
            }
        }
    },
    /*
    * [Step.3] Define UI interaction
    * Define methods for this widget,
    * this finish param will trigger users' custom actions.
    */
    methods: {
        dialing: function(finish, event) {
            var button = event.target;
            this.props.dom.number.value += button.getAttribute('data-value');
            return finish(this.props);
        },
        callout: function(finish) {
            this.props.toNumber = this.props.dom.number.value;
            this.props.fromNumber = localStorage.getItem('username');
            return finish(this.props);
        }
    }
})
```

#### Widgets lifecycle
1. beforeUpdate from users
2. beforeUpdate from widgets (can be disabled from users)
3. action from users
4. action from widgets (be triggered from 3)
5. afterUpdate from users
6. afterUpdate from widgets (can be disabled from users)

# TODO
- [ ] Localization
- [ ] Demo
- [x] Component state and property
- [ ] Seperate helpers
- [ ] Documentation
- [ ] Debug mode
