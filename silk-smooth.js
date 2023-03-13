const silkSmooth = {
    _w: '',
    _d: [],
    start() {
        this._w = document.getElementById('silk_scroll')
        const _wrapHeight = this._w.offsetHeight
        this._w.style.height = `${_wrapHeight}px`
        this._d = this._w.children
        const _dArr = [...this._d]
        _dArr.forEach(e => {
            const a = e.offsetHeight
            this._w.removeChild(e)
        })
        this.createDOM()
    },
    createDOM() {
        const newDiv = document.createElement("div");
        const newContent = document.createTextNode("Hi there and greetings!");
        newDiv.appendChild(newContent);
        document.getElementById('silk_scroll').appendChild(newDiv)
    }
}