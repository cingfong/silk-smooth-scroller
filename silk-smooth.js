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
        this.createDOM(_dArr)
    },
    createDOM(DOM) {
        const newDiv = document.createElement("div");
        const newContent = document.createTextNode("Hi there and greetings!");
        newDiv.appendChild(newContent);
        const _d = [...DOM]
        // document.getElementById('silk_scroll').appendChild(newDiv)
        _d.forEach((item, index) => {
            const newDiv = document.createElement("div");
            newDiv.appendChild(item)
            newDiv.style.cssText = `position:absolute;width:100%;height:100%;z-index:${999 - index}`
            document.getElementById('silk_scroll').appendChild(newDiv)
        })
    }
}