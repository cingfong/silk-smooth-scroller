const silkSmooth = {
    elementName: '',
    element: '',
    child: '',
    speed: 1,
    autoAlign: true,
    autoAlignVariable: {
        oldScreenTop: 0,
        oldScreenTopStay: 0
    },
    _reverse: false,
    _lazy: false,
    _d: [],
    // 錯誤反彈
    init({ name, opposite, speed, align }) {
        this.elementName = name || 'silk_scroll';
        this.speed = speed || 1;
        this.autoAlign = align === false ? false : true;
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
            this.watcherSilk()
        })
    },
    watcherSilk() {
        this.watcherScreenScroll()
        this.autoAlign && this.watcherAutoAlign()
        window.requestAnimationFrame(() => this.watcherSilk())
    },
    // let oldScreenTop = 0
    // let oldScreenTopStay = 0
    watcherAutoAlign() {
        const _itemHeight = this.child[0].offsetHeight
        const _silkTop = this.element.offsetTop
        const screenScrollTop = window.scrollY
        const _silkScrollStart = screenScrollTop - _silkTop
        const _afterSilkScrollStart = this.element.nextSibling?.offsetTop
        const _globalAutoAlign = this.autoAlignVariable
        function silkAutoAlign() {
            const nowSilkScrollChildren = _silkScrollStart % _itemHeight
            // 自動向下校正校正
            if (nowSilkScrollChildren < 300) {
                window.scrollTo({
                    top: screenScrollTop - nowSilkScrollChildren,
                    behavior: "smooth"
                });
                return
            }
            // 若超過silk元素不校正
            if (_afterSilkScrollStart) return
            if (nowSilkScrollChildren > (_itemHeight - 300)) {
                window.scrollTo({
                    top: screenScrollTop + (_itemHeight - nowSilkScrollChildren),
                    behavior: "smooth"
                });
                return
            }
        }
        // 停留判斷
        if (_silkScrollStart > 0) {
            if (_globalAutoAlign.oldScreenTop === screenScrollTop) {
                if (_globalAutoAlign.oldScreenTopStay > 25) {
                    silkAutoAlign()
                }
                _globalAutoAlign.oldScreenTopStay++
            } else {
                _globalAutoAlign.oldScreenTopStay = 0
                _globalAutoAlign.oldScreenTop = screenScrollTop
            }
        }
    },
    watcherScreenScroll() {
        const _child = this.child
        const screenHeight = window.innerHeight
        const screenScrollTop = window.scrollY
        const _silkTop = this.element.offsetTop
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