const silkSmooth = {
    _w: '',
    _d: [],
    start() {
        window.addEventListener('load', () => {
            this._w = document.getElementById('silk_scroll')
            this._d = this._w.children
            this._w.style.height = `${window.innerHeight * this._d.length}px`
            const _dArr = [...this._d]
            _dArr.forEach(e => {
                const a = e.offsetHeight
                this._w.removeChild(e)
            })
            window.requestAnimationFrame(scrollPosition)
            this.createDOM(_dArr)
        })
        function scrollPosition() {
            const screenHeight = window.innerHeight
            const screenScrollTop = window.scrollY
            const _silkDOM = document.getElementById('silk_scroll')
            const _silkWrapDOM = document.getElementById('silk-wrap')
            const _silkChildrenDOM = _silkWrapDOM.children
            const _silkTop = _silkDOM.offsetTop
            window.requestAnimationFrame(scrollPosition)
            if (screenScrollTop < _silkTop) {
                for (let i = 0; i < _silkChildrenDOM.length; i++) {
                    _silkChildrenDOM[i].style.transform = 'translateY(0px)'
                }
                return
            }
            const scrollNowDOMIndex = parseInt((screenScrollTop - _silkTop) / screenHeight)
            const scrollNowDom = _silkChildrenDOM[scrollNowDOMIndex]
            const beforeScrollNowDOM = _silkChildrenDOM[scrollNowDOMIndex - 1]
            const afterScrollNowDOM = _silkChildrenDOM[scrollNowDOMIndex + 1]
            scrollNowDom.style.transform = `translateY(-${(screenScrollTop - _silkTop) % screenHeight}px)`
            if (beforeScrollNowDOM) {
                beforeScrollNowDOM.style.transform = 'translateY(-100%)'
            }
            if (afterScrollNowDOM) {
                afterScrollNowDOM.style.transform = 'translateY(0%)'
            } else {
                _silkChildrenDOM[scrollNowDOMIndex].style.transform = 'translateY(0%)'
            }
        }
    },
    createDOM(DOM) {
        const divWrap = document.createElement("div");
        divWrap.setAttribute('id', 'silk-wrap')
        divWrap.style.cssText = 'position:sticky;top:0px;height:100vh;'
        document.getElementById('silk_scroll').appendChild(divWrap)
        const _d = [...DOM]
        _d.forEach((item, index) => {
            const newDiv = document.createElement("div");
            newDiv.appendChild(item)
            newDiv.style.cssText = `position: absolute; background-color: white; width: 100vw; height: 100vh; z-index:${99 - index} `
            document.getElementById('silk-wrap').appendChild(newDiv)
        })
    }
}