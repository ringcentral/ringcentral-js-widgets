import register from '../component'
import AutoComplete from './auto-complete'
var DialPad = register({
    actions: {
        init: {
            before: function() {},
            method: function() {},
            after: function() {}
        },
        render: {
            before: function() {},
            method: function() {},
            after: function() {
                var dialPad = this;
                var autoComplete = new AutoComplete({
                    template: '../template/auto-complete.html',
                    actions: {
                        autoComplete: {
                            before: function() {},
                            method: function() {
                                return dialPad.getCandidates();
                            },
                            after: function(d) {
                                console.log(d);
                            }
                        }
                    },
                    handlers: {},
                })
                autoComplete.render(this.props.dom.number, () => this.props.autoComplete = autoComplete);
            }
        },
        dialing: {
            before: function() {},
            method: function(finish) {
                var button = event.target;
                var ac = this.props.autoComplete;
                ac.props.dom.input.value += button.getAttribute('data-value');
                return ac.autoComplete().then(finish);
            },
            after: function() {}
        },
        callout: {
            before: function() {
                this.interval = loading(this.props.dom.callout, 'Call');
            },
            method: function(finish) {
                var ac = this.props.autoComplete;
                this.props.toNumber = ac.props.dom.input.value;
                this.props.fromNumber = localStorage.getItem('username');
                return finish();
            },
            after: function() {
                if (this.interval) {
                    this.interval.cancel('Call');
                    this.interval = null;
                }
            }
        },
        getCandidates: {
            before: function() {},
            method: function(finish) {
                return finish();
            },
            after: function() {}
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
