const silkSmooth = {
    initLoad: false,
    elementName: '',
    element: '',
    child: '',
    speed: 1,
    autoAlign: true,
    autoAlignVariable: {
        oldScreenTop: 0,
        oldScreenTopStay: 0,
        alignHeight: 0,
    },
    direction: false,
    titleList: [],
    titleClassName: '',
    transformTimingFun: '',
    // 錯誤反彈
    init({ name, direction, speed, align, alignHeight, titleList, titleClassName, transformFunction } = {}) {
        this.elementName = name || 'silk-smooth';
        this.speed = speed || 1;
        this.autoAlign = align === false ? false : true;
        this.autoAlignVariable.alignHeight = alignHeight || 300;
        this.direction = direction || false;
        this.titleList = [...titleList]
        this.titleClassName = titleClassName
        this.transformTimingFun = transformFunction || 'linear'
        const active = () => {
            this.element = document.getElementById(this.elementName)
            this.child = [...this.element.children]
            while (this.element.firstElementChild) {
                this.element.removeChild(this.element.firstElementChild)
            }
            this.element.style.height = `${window.innerHeight * this.child.length}px`
            this.createWrap()
            // 監聽滾動
            this.watcherSilk()
        }
        const _DOM = document.getElementById(name)
        if (_DOM) {
            active()
            return
        }
        window.addEventListener('load', () => {
            active()
        })
    },
    watcherSilk() {
        this.watcherScreenScroll()
        this.autoAlign && this.watcherAutoAlign()
        window.requestAnimationFrame(() => this.watcherSilk())
    },
    watcherAutoAlign() {
        const _itemHeight = this.child[0].offsetHeight
        const _silkTop = this.element.offsetTop
        const _screenScrollTop = window.scrollY
        const _silkScrollStart = _screenScrollTop - _silkTop
        if (!this.element.nextElementSibling) return
        const _afterSilkScrollStart = this.element.nextElementSibling.offsetTop
        const _globalAutoAlign = this.autoAlignVariable
        // 若超過silk元素不校正
        // 減去最後一個子元素的高度
        if (_screenScrollTop > (_afterSilkScrollStart - _itemHeight)) return
        function silkAutoAlign() {
            let _nowSilkScrollTop = 0
            let _nextSilkScrollTop = _silkScrollStart
            const _child = [...this.child]
            let whileIndex = 0
            while (_nextSilkScrollTop > 0) {
                _nextSilkScrollTop -= _child[whileIndex].offsetHeight
                if (Math.abs(_nextSilkScrollTop) < _globalAutoAlign.alignHeight) {
                    _nowSilkScrollTop = _nextSilkScrollTop
                }
                if (_silkScrollStart < _globalAutoAlign.alignHeight) {
                    _nowSilkScrollTop = _silkScrollStart
                }
                whileIndex++
            }
            window.scrollTo({
                top: _screenScrollTop - _nowSilkScrollTop,
                behavior: "smooth"
            });
            return
        }
        // 停留判斷
        if (_silkScrollStart > 0) {
            if (_globalAutoAlign.oldScreenTop === _screenScrollTop) {
                if (_globalAutoAlign.oldScreenTopStay > 25) {
                    silkAutoAlign.call(this)
                }
                _globalAutoAlign.oldScreenTopStay++
            } else {
                _globalAutoAlign.oldScreenTopStay = 0
                _globalAutoAlign.oldScreenTop = _screenScrollTop
            }
        }
    },
    watcherScreenScroll() {
        const _child = [...this.child]
        const screenScrollTop = window.scrollY
        const _silkTop = this.element.offsetTop
        if (!this.element.nextElementSibling) return
        const _afterSilkScrollStart = this.element.nextElementSibling.offsetTop
        // 若超過silk元素不校正
        if (screenScrollTop >= _afterSilkScrollStart) return
        if (screenScrollTop < _silkTop) {
            for (let i = 0; i < _child.length; i++) {
                _child[i].style.transform = 'translateY(0px)'
            }
            return
        }
        let nowSilkScrollTop = screenScrollTop - _silkTop
        let whileIndex = 0
        while (nowSilkScrollTop > 0) {
            nowSilkScrollTop -= _child[whileIndex].offsetHeight
            whileIndex++
        }
        const scrollNowDomIndex = whileIndex - 1
        if (scrollNowDomIndex < 0 || whileIndex >= _child.length) return
        const silkScrollTop = nowSilkScrollTop + _child[scrollNowDomIndex].offsetHeight
        const scrollNowDom = _child[scrollNowDomIndex]
        const preScrollNowDom = _child[scrollNowDomIndex - 1]
        const postScrollNowDom = _child[scrollNowDomIndex + 1]
        this.initDomPosition(scrollNowDomIndex)
        scrollNowDom.style.transform = `translateY(${this.direction ? '+' : '-'}${silkScrollTop}px)`
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
        const createDOM = (label, text, attr) => {
            const DOM = document.createElement(label)
            if (text) DOM.textContent = text
            if (attr) {
                for (const key in attr) {
                    DOM[key] = attr[key]
                }
            }
            return DOM
        }
        const _divWrap = createDOM("div");
        _divWrap.setAttribute('id', `${this.elementName}-wrap`)
        _divWrap.style.cssText = 'position:sticky;top:0px;height:100vh;'
        this.element.appendChild(_divWrap)
        const _child = [...this.child]
        const titleHeightList = []
        _child.forEach((item, index) => {
            const titleItem = this.titleList[index]
            const newDiv = createDOM("div");
            newDiv.appendChild(item)
            // 等害appendChild載入完成
            setTimeout(() => {
                if (Object.keys(this.titleList[index]).length) {
                    const newP = createDOM('div', titleItem.text, { className: this.titleClassName });
                    newP.style.cssText = 'position:absolute;bottom:0px;'
                    const newB = createDOM('b', titleItem.number);
                    newP.prepend(newB)
                    newDiv.appendChild(newP)
                    const titleItemHeight = newP.clientHeight
                    titleHeightList.push(titleItemHeight)
                } else {
                    titleHeightList.push(0)
                }
            })
            const newDivCssText = `position: absolute; 
                                    backgroundColor: white; 
                                    width: 100%; 
                                    height: 100%; 
                                    z-index: ${99 - index};
                                    transition: transform ${1 - this.speed}s;
                                    transition-timing-function: ${this.transformTimingFun};`
            newDiv.style.cssText = newDivCssText
            document.getElementById(`${this.elementName}-wrap`).appendChild(newDiv)
        })
        setTimeout(() => {
            let titleHeightTotal = 0
            let _childHeightTotal = 0
            const _childReverse = [..._child].reverse()
            const titleHeightListReverse = titleHeightList.reverse()
            _childReverse.forEach((item, index) => {
                const titleHeightItem = titleHeightListReverse[index] || 0
                item.parentNode.style.cssText += `height:calc(100% - ${titleHeightTotal}px)`
                titleHeightTotal += titleHeightItem
                _childHeightTotal += item.offsetHeight
            })
            this.element.style.cssText += `height:${_childHeightTotal}px`
        })
        this.child = document.getElementById(`${this.elementName}-wrap`).children
    },
    initDomPosition(nowIdx) {
        if (this.initLoad) return
        for (let i = 0; i < (nowIdx - 1); i++) {
            this.child[i].style.transform = 'translateY(-100%)'
        }
        this.initLoad = true
    }
}
export default silkSmooth 