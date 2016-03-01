var AuthPanel = function(options) {
    if (!options.target) {
        throw new Error('need specifiy a target for auth panel');
    }
    // TODO: use Object.extend or somewhat
    this.options = options || {};
    this.targetDOM = document.querySelector(options.target);
    this.bindDOM();
};

AuthPanel.prototype.bindDOM = function() {
    this.dom = {
        server: document.querySelector('[data-info=server]'),
        key: document.querySelector('[data-info=key]'),
        secret: document.querySelector('[data-info=secret]'),
        username: document.querySelector('[data-info=username]'),
        extension: document.querySelector('[data-info=extension]'),
        password: document.querySelector('[data-info=password]'),

        login: document.querySelector('[data-action=login]'),
        error: document.querySelector('[data-show=error]')
    }
    this.dom.login.addEventListener('click', this.login.bind(this));
    this.dom.key.value = localStorage.getItem('key');
    this.dom.secret.value = localStorage.getItem('secret');
    this.dom.username.value = localStorage.getItem('username');
    this.dom.extension.value = localStorage.getItem('extension');
    this.dom.password.value = localStorage.getItem('password');
};
AuthPanel.prototype.beforeLogin = function() {
    localStorage.setItem('server', this.dom.server.value || '');
    localStorage.setItem('key', this.dom.key.value || '');
    localStorage.setItem('secret', this.dom.secret.value || '');
    localStorage.setItem('username', this.dom.username.value || '');
    localStorage.setItem('extension', this.dom.extension.value || '');
    localStorage.setItem('password', this.dom.password.value || '');
    this.dom.login.disabled = true;
    this.dom.error.textContent = '';
    this.interval = this.loading(this.dom.login, 'login');
    if (this.options.listeners.beforeLogin) {
        this.options.listeners.beforeLogin();
        // if (!this.options.listeners.afterLogin) {
        //     console.warn('you may encounter UI problems because you overrided one of login lifecycle.');
        // }
    }
};


AuthPanel.prototype.afterLogin = function() {
    this.dom.login.disabled = false;
    // stop loading animation
    if (this.interval) {
        this.interval.cancel();
        this.interval = null;
    }
    if (this.options.listeners.afterLogin) {
        this.options.listeners.afterLogin();
        // if (!this.options.listeners.beforeLogin) {
        //     console.warn('you may encounter UI problems because you overrided one of login lifecycle.');
        // }
    }
};

AuthPanel.prototype.login = function() {
    var loginPromise;
    this.beforeLogin();
    if (this.options.actions && this.options.actions.login) {
        // FIXME: The custom login may not be a Promise
        loginPromise = this.options.actions.login(this.dom)
            // bind the lexical env to the function, otherwise will be 'window' scope
            .then(this.afterLogin.bind(this))
            .catch(err => console.error('login error:' + error));
    }
    return loginPromise || null;
};
AuthPanel.prototype.signup = function() {
    this.options.actions && this.options.signup && this.options.signup();
};
AuthPanel.prototype.close = function() {};
AuthPanel.prototype.loading = function(target, text) {
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
