import { register, Component } from '../component'
var state = {
    'HIDDEN': 0,
    'CALLIN': 1,
    'CALLOUT': 2,
    'ONLINE': 3
}
var currentState = state.HIDDEN;
var CallPanel = register({
    beforeUpdate: function(action, options) {
    },
    afterUpdate: function(action, options) {
        if (action === 'mount') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'answer') {
            currentState = state.ONLINE;
            triggerView(this.props);
        } else if (action === 'ignore') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'cancel') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'hangup') {
            currentState = state.HIDDEN;
            triggerView(this.props);
        } else if (action === 'record') {

        } else if (action === 'hold') {

        } else if (action === 'mute') {

        }
    },
    methods: {
        answer: function(finish) {
            return finish();
        },
        ignore: function(finish) {
            return finish();
        },
        cancel: function(finish) {
            return finish();
        },
        hangup: function(finish) {
            return finish();
        },
        called: function(event) {
            console.log('callin');
            currentState = state.CALLIN;
            triggerView(this.props);
        },
        callStarted: function(event) {
            console.log('call start');
            currentState = state.ONLINE;
            triggerView(this.props);
        },
        callRejected: function(event) {
            console.log('call reject');
            currentState = state.HIDDEN;
            triggerView(this.props);
        },
        callEnded: function(event) {
            console.log('end');
            currentState = state.HIDDEN;
            triggerView(this.props);
        },
        callFailed: function(event) {
            console.log('fail');
            currentState = state.HIDDEN;
            triggerView(this.props);
        }
    }
});


var triggerView = function(props) {
    props.dom['callin-panel'].style.display = 'none';
    props.dom['callout-panel'].style.display = 'none';
    props.dom['online-panel'].style.display = 'none';
    if (currentState === state.CALLIN) {
        props.dom['callin-panel'].style.display = 'block';
    } else if (currentState === state.CALLOUT) {
        props.dom['callout-panel'].style.display = 'block';
    } else if (currentState === state.ONLINE) {
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
