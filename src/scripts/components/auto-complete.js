import { Component, register } from '../component'

register({
    beforeUpdate: function(action) {},
    afterUpdate: function(action) {},
    methods: {
        show: function(finish) {
            this.props.prefix = this.props.dom.input;
            return finish(this.props);
        }
    }
})

function complete(prefix, items) {
    return items.filter(item => item.indexOf(prefix) === 0);
}
