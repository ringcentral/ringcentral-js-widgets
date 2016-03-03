import { register, Component } from '../component'

var state;
var CallPanel = register({
    beforeUpdate: function(action, props) {},
    afterUpdate: function(action, props) {
        if (action === 'mount') {} else if (action === 'answer') {
            state = CallPanel.state.ONLINE;
            this.triggerView(this.props);
        } else if (action === 'ignore') {
            state = CallPanel.state.HIDDEN;
            this.triggerView(this.props);
        } else if (action === 'cancel') {
            state = CallPanel.state.HIDDEN;
            this.triggerView(this.props);
        } else if (action === 'hangup') {
            state = CallPanel.state.HIDDEN;
            this.triggerView(this.props);
        } else if (action === 'record') {

        } else if (action === 'hold') {

        } else if (action === 'mute') {

        }
    },
    methods: {
        answer: function() {
            if (this.options.actions && this.options.actions.answer) {
                this.beforeUpdate.bind(this, 'answer')
                    // FIXME: The custom login may not be a Promise
                return this.options.actions.answer(this.props)
                    .then(this.afterUpdate.bind(this, 'answer'))
                    .catch(err => console.error('login error:' + error));
            }
        },
        ignore: function() {
            if (this.options.actions && this.options.actions.ignore) {
                this.beforeUpdate.bind(this, 'ignore')
                    // FIXME: The custom login may not be a Promise
                return this.options.actions.ignore(this.props)
                    .then(this.afterUpdate.bind(this, 'ignore'))
                    .catch(err => console.error('login error:' + error));
            }
        },
        cancel: function() {
            if (this.options.actions && this.options.actions.cancel) {
                this.beforeUpdate.bind(this, 'cancel')
                    // FIXME: The custom login may not be a Promise
                return this.options.actions.cancel(this.props)
                    .then(this.afterUpdate.bind(this, 'cancel'))
                    .catch(err => console.error('login error:' + error));
            }
        },

        hangup: function() {
            if (this.options.actions && this.options.actions.hangup) {
                this.beforeUpdate.bind(this, 'hangup')
                    // FIXME: The custom login may not be a Promise
                return this.options.actions.hangup(this.props)
                    .then(this.afterUpdate.bind(this, 'hangup'))
                    .catch(err => console.error('login error:' + error));
            }
        },

        called: function(event) {
            state = CallPanel.state.CALLIN;
            this.triggerView();
        },

        callStarted: function(event) {
            state = CallPanel.state.ONLINE;
            this.triggerView();
        },

        callRejected: function(event) {
            console.log('call reject');
            state = CallPanel.state.HIDDEN;
            this.triggerView();
        },

        callEnded: function(event) {
            console.log('end');
            state = CallPanel.state.HIDDEN;
            this.triggerView();
        },

        callFailed: function(event) {
            console.log('fail');
            state = CallPanel.state.HIDDEN;
            this.triggerView();
        }
    }
});
CallPanel.state = {
    'HIDDEN': 0,
    'CALLIN': 1,
    'CALLOUT': 2,
    'ONLINE': 3
}

var triggerView = function(props) {
    props.dom['callin-panel'].style.display = 'none';
    props.dom['callout-panel'].style.display = 'none';
    props.dom['online-panel'].style.display = 'none';
    if (callTimeInterval) {
        callTimeInterval.cancel();
        callTimeInterval = null;
    }
    if (state === CallPanel.state.CALLIN) {
        props.dom['callin-panel'].style.display = 'block';
    } else if (state === CallPanel.state.CALLOUT) {
        props.dom['callout-panel'].style.display = 'block';
    } else if (state === CallPanel.state.ONLINE) {
        props.dom['online-panel'].style.display = 'block';
        // this.callTimeInterval = this.updateCallTime(this.line.timeCallStarted);
    }
};
var loading = function(target, text) {
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
};
// var prototype.updateCallTime = function(startTime) {
//     // FIXME: it's not accurate
//     if (!startTime)
//         return;
//     var currentTime = Date.now() - startTime;
//     var callPanel = this;
//     var callTimeInterval = window.setInterval(() => {
//         var sec = currentTime % 60;
//         var min = Math.floor(currentTime / 60);
//         this.element.panel.onlinePanel.callTime.textContent = min + ":" + sec;
//         currentTime++;
//     }, 1000);
//     return {
//         cancel: function() {
//             if (!callTimeInterval)
//                 return;
//             window.clearInterval(callTimeInterval);
//             callPanel.element.panel.onlinePanel.callTime.textContent = "0:0";
//             callTimeInterval = null;
//         }
//     }
// };
export default CallPanel;
