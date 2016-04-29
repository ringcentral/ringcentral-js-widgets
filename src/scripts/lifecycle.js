var lifecycle = {
    destroy() {
        this.unmount()
        // TODO: find out better way to destroy it
        for (let property in this)
            this[property] = null
    },

    unmount() {
        if (!this._mounted || !this.root || !this.root.parentNode)
            return
        this.root.parentNode.removeChild(this.root)
        this._mounted = false
    },

    mount(target, prepend) {
        if (this._mounted) return

        typeof target === 'string' && (target = document.querySelector(target))

        if (this.target) {
            // Already mounted and unmounted before
            if (prepend)
                target.insertBefore(this.root, target.firstChild)
            else
                target.appendChild(this.root)
        } else {
            // First time mount
            this.children.forEach(child => child.widget.mount(child.target))
            // templates can only have one root
            if (prepend)
                target.insertBefore(this.root, target.firstChild)
            else
                target.appendChild(this.root)
            this._mounted = true
        }
        return this
    }
}
export default lifecycle
