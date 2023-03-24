const silkSmooth = {
    elementName: '',
    element: '',
    child: '',
    speed: 1,
    _reverse: false,
    _lazy: false,
    _d: [],
    // 錯誤反彈
    init({ name, opposite, speed }) {
        this.elementName = name || 'silk_scroll';
        this.speed = speed || 1;
        // 反轉
        this._reverse = opposite || false;
        window.addEventListener('load', () => {
            this.element = document.getElementById(this.elementName)
            this.child = [...this.element.children]
            while (this.element.firstElementChild) {
                this.element.removeChild(this.element.firstElementChild)
            }
            this.element.style.height = `${window.innerHeight * this.child.length}px`
            this.createWrap()
            // 監聽滾動
            this.watcherScreenScroll()
        })
        //
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
                if (nowSilkScrollChildren < 300) {
                    window.scrollTo({
                        top: screenScrollTop - nowSilkScrollChildren,
                        behavior: "smooth"
                    });
                    return
                }
                if (nowSilkScrollChildren > (DOMHeight - 300)) {
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
    watcherScreenScroll() {
        const _child = this.child
        const screenHeight = window.innerHeight
        const screenScrollTop = window.scrollY
        const _silkTop = this.element.offsetTop
        window.requestAnimationFrame(() => this.watcherScreenScroll())
        if (screenScrollTop < _silkTop) {
            for (let i = 0; i < _child.length; i++) {
                _child[i].style.transform = 'translateY(0px)'
            }
            return
        }
        const scrollNowDomIndex = parseInt((screenScrollTop - _silkTop) / screenHeight)
        const scrollNowDom = _child[scrollNowDomIndex]
        const preScrollNowDom = _child[scrollNowDomIndex - 1]
        const postScrollNowDom = _child[scrollNowDomIndex + 1]
        scrollNowDom.style.transform = `translateY(-${(screenScrollTop - _silkTop) % screenHeight}px)`
        if (preScrollNowDom) {
            preScrollNowDom.style.transform = 'translateY(-100%)'
        }
        if (postScrollNowDom) {
            postScrollNowDom.style.transform = 'translateY(0%)'
        } else {
            _child[scrollNowDomIndex].style.transform = 'translateY(0%)'
        }
    },
    createWrap() {
        const _divWrap = document.createElement("div");
        _divWrap.setAttribute('id', `${this.elementName}-wrap`)
        _divWrap.style.cssText = 'position:sticky;top:0px;height:100vh;'
        this.element.appendChild(_divWrap)
        const _child = [...this.child]
        _child.forEach((item, index) => {
            const newDiv = document.createElement("div");
            newDiv.appendChild(item)
            newDiv.style.cssText = `position: absolute; backgroundColor: white; width: 100%; height: 100%; z-index: ${99 - index};transition:transform ${1 - this.speed}s linear;`
            document.getElementById('silk-wrap').appendChild(newDiv)
        })
        this.child = document.getElementById(`${this.elementName}-wrap`).children
    }
}
export default silkSmooth 