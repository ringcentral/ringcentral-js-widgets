var Component = function(options) {
    if (!options.target) {
        throw new Error('need specifiy a target');
    }
    if (!options.template) {
        // TODO: maybe use default template
        throw new Error('need specifiy a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default option setting
    this.options = options || {};
    this.targetDOM = document.querySelector(options.target);
    this.fetchTemplate(options.template)
        .then(() => this.bindDOM)
        .then(() => this.componentMounted)

};
Component.prototype.fetchTemplate = function(src) {
    return fetch(src)
        .then(response => response.text())
        .then(body => this.targetDOM.innerHTML = body)
};
Component.prototype.bindDOM = function() {
    this.dom = {};
    console.log(document.querySelectorAll('[data-info]'));
    [].forEach.call(document.querySelectorAll('[data-info]'), doc => {
        var info = doc.getAttribute('data-info');
        this.dom[info] = doc;
    });
    [].forEach.call(document.querySelectorAll('[data-event]'), doc => {
        var event = doc.getAttribute('data-event');
        var action = doc.getAttribute('data-action');
        doc.addEventListener(event, this[action].bind(this));
    })
}
Component.prototype.action = function() {}
Component.prototype.componentMounted = function() {};
export default Component;
