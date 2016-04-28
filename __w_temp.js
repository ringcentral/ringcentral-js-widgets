'use strict';

w.register(function () {
    var slideDown = w.transition('slide-down');
    this.actions = Object.assign(w.action('interaction'), {
        init: {
            method: function method() {
                this.state = [];
                this.itemCount = 0;
            }
        },
        mount: {
            after: function after() {
                var _this = this;

                slideDown.init(this.props.dom.menu);
                window.addEventListener('click', function (e) {
                    _this.hideMenu();
                }, false);
                this.props.root.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            }
        },
        adjustMenuButton: {
            after: function after() {
                Array.from(this.props.dom['toolbar'].childNodes).forEach(function (node) {
                    if (node.nodeType === 3) node.parentNode.removeChild(node);
                });
                var mid = Math.floor((Array.from(this.props.dom['toolbar'].childNodes).length - 1) / 2) + 1;
                var target = this.props.dom['toolbar'].childNodes[mid];
                target.parentNode.insertBefore(this.props.dom['menu-button'], target);
            }
        },
        addItem: {
            method: function method() {},
            after: function after(icon, text, direction) {
                // use innerHTML here, because content could be image or something else.
                var div = document.createElement('div');
                var item;
                if (this.itemCount > 3) {
                    var template = '<div class=\'rc-toolbar__more-item text-center\'>\n                                        <button class=\'rc-button --circle\'>\n                                            ' + icon + '\n                                        </button>\n                                        <div>' + text + '</div>\n                                    </div>';

                    div.innerHTML = template;
                    item = div.childNodes[0];
                    this.props.dom['menu'].appendChild(item);
                } else {
                    var template = '<button class=\'rc-toolbar__item rc-button --ghost rc-icon-switch\'>\n                                        ' + icon + '\n                                    </button>';
                    div.innerHTML = template;
                    item = div.childNodes[0];
                    this.props.dom['toolbar'].appendChild(item);
                }
                this.adjustMenuButton();
                ++this.itemCount;
                return item;
            }
        },
        clickItem: {
            method: function method(finish, item, event) {
                var _this2 = this;

                if (typeof item === 'number') {} else {
                    item.addEventListener('click', function () {
                        event.call(_this2);
                        _this2.hideMenu();
                        _this2.state.push(event);
                    });
                }
            }
        },
        pop: {
            method: function method() {
                console.log(this.state);
                if (this.state.length > 1) {
                    this.state.pop(); // current state, no need to call again
                    this.state[this.state.length - 1].call(this);
                }
            }
        },
        toggleMenu: {
            after: function after() {
                slideDown.toggle(this.props.dom.menu);
            }
        },
        hideMenu: {
            after: function after() {
                slideDown.out(this.props.dom.menu);
            }
        }
    });
});