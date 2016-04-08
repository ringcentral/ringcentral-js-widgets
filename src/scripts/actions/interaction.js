import { register } from '../action'
var interaction = {
    show: {
        before: function() {},
        method: function(finish) {},
        after: function(target = this.props.root) {
            target.classList.remove('display-none')
        }
    },
    hide: {
        before: function() {},
        method: function(finish) {},
        after: function(target = this.props.root) {
            target.classList.add('display-none')
        }
    },
    diabled: {
        before: function() {},
        method: function(finish) {},
        after: function(target = this.props.root, message) {
            var mask = document.createElement('div')
            // FIXME Decouple from rc
            mask.classList.add('rc-mask')
            var message = document.createElement('h4')
            message.classList.add('rc-mask-message')
            message.textContent = message
            target.appendChild(mask)
            this.props.mask = mask
            return mask
        }
    },
    enable: {
        before: function() {},
        method: function(finish) {},
        after: function() {
            if (this.props.mask && this.props.mask instanceof HTMLElement) {
                this.props.mask.parentNode.removeChild(this.props.mask)
            }
        }
    }
}
register('interaction', interaction)
