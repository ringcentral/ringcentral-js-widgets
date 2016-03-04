import { Component, register } from '../component'
import AutoComplete from './auto-complete'
var DialPad = register({
    beforeUpdate: function(action) {
        if (action === 'dialing') {
            // ...
        } else if (action === 'callout') {
            console.log('div before callout');
            this.interval = loading(this.props.dom.callout, 'Call');
        }
    },
    afterUpdate: function(action) {
        console.log(action);
        if (action === 'mount') {
            console.log('init autocomplete');
            var autoComplete = new AutoComplete({
                template: '../template/auto-complete.html',
                actions: {
                    autocomplete: function() {
                        console.log(this.props);
                        // todo
                        return rcHelper.autocomplete(this.props);
                    }
                },
                handlers: {},
                beforeUpdate: function(action) {},
                afterUpdate: function(action) {}
            })
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
