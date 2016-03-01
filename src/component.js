var Component = function(options) {
    if (!options.target) {
        throw new Error('need specifiy a target');
    }
    // TODO: use Object.extend or somewhat (es6) for default option setting
    this.options = options || {};
    this.targetDOM = document.querySelector(options.target);
    this.bindDOM();
};
Component.prototype.bindDOM = function() {
    console.log(this);
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
Component.prototype.action = function() {

}
export default Component;
