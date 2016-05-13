'use strict';

w.register(function () {
    var slideDown = w.transition('slide-down');
    this.actions = {
        init: {
            method: function method() {
                this.state = [];
                this.itemCount = 0;
            }
        },
        mount: {
            after: function after() {
                var _this = this;

                slideDown.init(this.dom.menu);
                window.addEventListener('click', function (e) {
                    _this.hideMenu();
                }, false);
                this.root.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            }
        },
        adjustMenuButton: {
            after: function after() {
                Array.from(this.dom['toolbar'].childNodes).forEach(function (node) {
                    if (node.nodeType === 3) node.parentNode.removeChild(node);
                });
                var mid = Math.floor((Array.from(this.dom['toolbar'].childNodes).length - 1) / 2) + 1;
                var target = this.dom['toolbar'].childNodes[mid];
                target.parentNode.insertBefore(this.dom['menu-button'], target);
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
                    this.dom['menu'].appendChild(item);
                } else {
                    var template = '<button class=\'rc-toolbar__item rc-button --ghost rc-icon-switch\'>\n                                        ' + icon + '\n                                    </button>';
                    div.innerHTML = template;
                    item = div.childNodes[0];
                    this.dom['toolbar'].appendChild(item);
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
                slideDown.toggle(this.dom.menu);
            }
        },
        hideMenu: {
            after: function after() {
                slideDown.out(this.dom.menu);
            }
        }
    };
    this.on('click', 'menu-button', function (e) {
        this.toggleMenu();
    });
});
//# sourceURL=toolbar.html