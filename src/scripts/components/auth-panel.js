import register from '../component'

var AuthPanel = register({
    actions: {
        init: {
            before: function() {},
            method: function(finish) {
                console.log('dev init');
                finish();
            },
            after: function() {}
        },
        render: {
            before: function() {},
            method: function(finish) {
                console.log('dev render');
                finish();
            },
            after: function() {
                this.props.dom.key.value = localStorage.getItem('key');
                this.props.dom.secret.value = localStorage.getItem('secret');
                this.props.dom.username.value = localStorage.getItem('username');
                this.props.dom.extension.value = localStorage.getItem('extension');
                this.props.dom.password.value = localStorage.getItem('password');
            }
        },
        login: {
            before: function() {
                console.log('wd before');
                this.props.dom.login.disabled = true;
                this.props.dom.error.textContent = '';
                this.interval = loading(this.props.dom.login, 'login');
            },
            method: function(finish) {
                console.log('login');
                return finish();
            },
            after: function() {
                console.log('wd after');
                this.props.dom.login.disabled = false;
                // stop loading animation
                if (this.interval) {
                    this.interval.cancel();
                    this.interval = null;
                }
                localStorage.setItem('server', this.props.dom.server.value || '');
                localStorage.setItem('key', this.props.dom.key.value || '');
                localStorage.setItem('secret', this.props.dom.secret.value || '');
                localStorage.setItem('username', this.props.dom.username.value || '');
                localStorage.setItem('extension', this.props.dom.extension.value || '');
                localStorage.setItem('password', this.props.dom.password.value || '');
            }
        }
    }
});

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

export default AuthPanel;
