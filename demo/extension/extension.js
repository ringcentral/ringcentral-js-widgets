var container = document.querySelector('div.tNsA5e-nUpftc.nUpftc.mP').parentNode;
var template = `
<div id='rc-phone' class='rc-phone'>
<div id="auth-panel"></div>
<div id="dial-pad"></div>
<div id="call-panel"></div>
<div id="call-log-panel"></div>
</div>
`
var phone = document.createElement('div');
phone.innerHTML = template;
phone.style = `
border-left: 1px solid #e5e5e5;
    z-index: 2;
    width: 250px;
    position: fixed;
    margin-top: 60px;
    top: 0px;
    bottom: 0;
    right: 0;
    overflow: auto;
    background: #fff;
    transition: all 0.3s ease;`
container.appendChild(phone);
w.config({
    path: localStorage.getItem('base-path') + 'template/',
    preload: {
        "auth-panel": 'auth-panel',
        "dial-pad": 'dial-pad',
        "call-panel": 'call-panel'
    }
}, init)
var phoneService = w.service()['phoneService'];
var loginService = w.service()['loginService'];
var callLogService = w.service()['callLogService'];
function init() {
    var authPanel = w('auth-panel', {
        actions: {
            login: {
                method: function() {
                    return loginService.login(
                        this.props.username,
                        this.props.extension,
                        this.props.password
                    );
                },
                after: function() {
                    var authPanel = this;
                    dialPad.render('#dial-pad', function() {
                        authPanel.remove();
                    });
                    callPanel.render('#call-panel');
                }
            }
        },
        handlers: {},
    })
    var dialPad = w('dial-pad', {
        actions: {
            getCandidates: {
                method: function() {
                    return CallLogService.getCallLogs();
                }
            },
            callout: {
                method: function(fromNo, toNo) {
                    return phoneService.callout(fromNo, toNo);
                }
            }
        }
    })
    var callPanel = w('call-panel', {
        actions: {
            init: {
                after: function() {
                    phoneService.listen();
                    phoneService.on('called', this.called);
                    phoneService.on('callStarted', this.callStarted);
                    phoneService.on('callRejected', this.callRejected);
                    phoneService.on('callEnded', this.callEnded);
                    phoneService.on('callFailed', this.callFailed);
                }
            },
            answer: {
                method: function() {
                    phoneService.answer();
                }
            },
            hangup: {
                method: function() {
                    phoneService.hangup();
                }
            }
        }
    })
    loginService.checkLoginStatus().then(
        isLoggedIn => {
            if (isLoggedIn) {
                dialPad.render('#dial-pad');
                callPanel.render('#call-panel');
            } else
                authPanel.render('#auth-panel');
        }
    );
}
loginService.registerLoginHandler(function() {
    phoneService.registerSIP();
    callLogService.getCallLogs();
});
