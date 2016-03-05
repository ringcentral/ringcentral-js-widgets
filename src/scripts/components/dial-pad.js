import { Component, register } from '../component'
import AutoComplete from './auto-complete'
var DialPad = register({
    beforeUpdate: function(action, options) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            console.log('div before callout');
            this.interval = loading(this.props.dom.callout, 'Call');
        }
    },
    afterUpdate: function(action, options) {
        if (action === 'mount') {
            console.log('init autocomplete');
            var autoComplete = new AutoComplete({
                template: '../template/auto-complete.html',
                actions: {
                    autoComplete: function() {
                        console.log(this.props);
                        // todo
                        return rcHelper.autoComplete(this.props);
                    },
                    input: function() {}
                },
                handlers: {},
                beforeUpdate: function(action) {},
                afterUpdate: function(action) {}
            })
            autoComplete.render(this.props.dom.number, () => {
                // TODO: The manual binding is annoying, can be done by Component?
                this.props.autoComplete = autoComplete;
            });
        } else if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            if (this.interval) {
                this.interval.cancel('Call');
                this.interval = null;
            }
        }
    },
    methods: {
        dialing: function(finish, event) {
            var button = event.target;
            var ac = this.props.autoComplete;
            ac.input(button.getAttribute('data-value'));
            return finish(this.props);
        },
        callout: function(finish) {
            var ac = this.props.autoComplete;
            this.props.toNumber = ac.props.dom.input.value;
            this.props.fromNumber = localStorage.getItem('username');
            return finish(this.props);
        }
    }
})

function loading(target, text) {
    var dotCount = 1;
    var interval = window.setInterval(() => {
        var dot = '';
        var dotCountTmp = dotCount;
        while (dotCount--)
            dot += '.';
        target.textContent = text + dot;
        dotCount = (dotCountTmp + 1) % 4;
    }, 500)
    return {
        cancel: function(text) {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
                if (typeof text !== 'undefined')
                    target.textContent = text;
            }
        }
    }
}
export default DialPad;
