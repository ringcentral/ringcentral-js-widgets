var Component = function(options) {
    if (!options.template) {
        // TODO: maybe use default template
        throw new Error('need specifiy a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default option setting
    this.options = options || {};
    this.props = {};
    this.fetchPromise = null;
    this.beforeUpdate('mount');
    this.fetchTemplate(options.template)
        .then(template => this.bindDOM(template))
        .then(template => this.afterUpdate('mount'))
        .catch(err => console.error(err.stack))
};
Component.prototype.fetchTemplate = function(src) {
    this.fetchPromise = fetch(src)
        .then(response => response.text())
        .then(body => {
            var template = document.createElement('template');
            template.innerHTML = body;
            return template;
        })
        .catch(err => console.error(err.stack))
    return this.fetchPromise;
};
Component.prototype.bindDOM = function(template) {
    this.props.dom = {};
    [].forEach.call(template.content.querySelectorAll('[data-info]'), doc => {
        var info = doc.getAttribute('data-info');
        this.props.dom[info] = doc;
    });
    [].forEach.call(template.content.querySelectorAll('[data-action]'), doc => {
        var event = doc.getAttribute('data-event');
        var action = doc.getAttribute('data-action');
        doc.addEventListener(event, this[action].bind(this));
    })
    return template;
}
Component.prototype.beforeUpdate = function(action) {
    if (this.options.beforeUpdate)
        return this.options.beforeUpdate(action, this.props);
    return true;
};
Component.prototype.afterUpdate = function(action) {
    if (this.options.afterUpdate)
        return this.options.afterUpdate(action, this.props);
    return true;
};
Component.prototype.remove = function() {
    while (this.props.targetDOM.firstChild) {
        this.props.targetDOM.removeChild(this.props.targetDOM.firstChild);
    }
};
Component.prototype.render = function(target, callback) {
    if (this.fetchPromise)
        return this.fetchPromise
            .then(template => {
                this.props.targetDOM = document.querySelector(target);
                this.props.targetDOM.appendChild(template.content);
            })
            .then(() => {
                if (callback && typeof callback === 'function')
                    callback.call(this);
            })
            .catch(err => console.error('render err:' + err));
};
export default Component;
