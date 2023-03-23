const silkSmooth = {
    _element: '',
    _w: '',
    _d: [],
    init({ element }) {
        const _this = this;
        this._element = element || 'silk_scroll';
        window.addEventListener('load', () => {
            this._w = document.getElementById(this._element)
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
            // const _silkDOM = document.getElementById(this._element)
            const _silkWrapDOM = document.getElementById('silk-wrap')
            const _silkChildrenDOM = _silkWrapDOM.children
            const _silkTop = _this._w.offsetTop
            window.requestAnimationFrame(scrollPosition)
            window.requestAnimationFrame(watcherScroll)
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
        let oldScreenTop = 0
        let oldScreenTopStay = 0
        function watcherScroll() {
            const DOMHeight = document.getElementById('silk-wrap').childNodes[0].offsetHeight
            const _silkDOM = document.getElementById(_this._element)
            const _silkTop = _silkDOM.offsetTop
            const screenScrollTop = window.scrollY
            const silkScroll = screenScrollTop - _silkTop
            function goSilkChildrenTop() {
                const nowSilkScrollChildren = silkScroll % DOMHeight
                if (nowSilkScrollChildren < 200) {
                    window.scrollTo({
                        top: screenScrollTop - nowSilkScrollChildren,
                        behavior: "smooth"
                    });
                    return
                }
                if (nowSilkScrollChildren > (DOMHeight - 200)) {
                    window.scrollTo({
                        top: screenScrollTop + (DOMHeight - nowSilkScrollChildren),
                        behavior: "smooth"
                    });
                    return
                }
            }
            if (silkScroll > 0) {
                if (oldScreenTop === screenScrollTop) {
                    if (oldScreenTopStay > 25) {
                        goSilkChildrenTop()
                    }
                    oldScreenTopStay++
                } else {
                    oldScreenTopStay = 0
                    oldScreenTop = screenScrollTop
                }
            }
        }
    },
    createDOM(DOM) {
        const divWrap = document.createElement("div");
        divWrap.setAttribute('id', 'silk-wrap')
        divWrap.style.cssText = 'position:sticky;top:0px;height:100vh;'
        document.getElementById(this._element).appendChild(divWrap)
        const _d = [...DOM]
        _d.forEach((item, index) => {
            const newDiv = document.createElement("div");
            newDiv.appendChild(item)
            newDiv.style.cssText = `position: absolute; background-color: white; width: 100vw; height: 100vh; z-index:${99 - index} `
            document.getElementById('silk-wrap').appendChild(newDiv)
        })
    }
}
export default silkSmooth 