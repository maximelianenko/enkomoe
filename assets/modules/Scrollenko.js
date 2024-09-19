import _ from "lodash"
import anime from "animejs"
// import MovementHelper from "~/assets/modules/MovementHelper.js"
// const movementHelper = new MovementHelper()

/*
Сделать жоский рефакторинг а то глаза вытекают
*/
class Scrollenko {
    constructor() {
        this.thumbHeight = 0
        this.thumbPosition = 0
        this.thumbPositionMax = 0
        this.thumbPositionMin = 0
        this.thumbPositionStart = 0
        // this.scrollHeight = 0
        this.scrollPosition = 0
        this.scrollPositionMax = 0
        this.scrollPositionMin = 0
        this.scrollTransition = true
        this.scrollEventEnabled = true
        this.y_state = 0
        this.touching = false
        this.swipeTouching = false
        this.isNeeded = false
        // this.loaded = false
        this.inverted = false
        this.sensitivity = 1

        this.floating = true
        this.visible = true
    }
    clearValues() {
        this.x_start = 0
        this.x_start_main = 0
        this.x_end = 0
        this.x_end_main = 0
        this.x_state_start = 0

        this.y_start = 0
        this.y_start_main = 0
        this.y_end = 0
        this.y_end_main = 0
        this.y_state_start = 0

        this.time_start = 0
        this.time_start_main = 0
        this.time_end = 0
        this.time_end_main = 0
        this.y_speed = 0
        this.y_speed = 0
    }
    elements(elements = {}) {
        this.trackElement = elements.track
        this.thumbElement = elements.thumb
        this.baseElement = elements.base
        this.rootElement = elements.root
        this.hoverElement = elements.hover
        // this.scrollbarElement = elements.scrollbar
    }
    init(force = false, maxHeight) {
        this.isNeeded = force || this.baseElement.scrollHeight > this.baseElement.clientHeight
        // console.log(this.isNeeded)
        if (this.isNeeded) {
            console.log(this.baseElement.scrollHeight)
            this.scrollPositionMax = this.baseElement.scrollHeight - this.baseElement.clientHeight

            let thumbHeight
            if (maxHeight) {
                thumbHeight = Math.max(this.trackElement.clientHeight*(this.trackElement.clientHeight/maxHeight),10)
            } else {
                thumbHeight = Math.max(this.trackElement.clientHeight*(this.trackElement.clientHeight/this.baseElement.scrollHeight),10)
            }
            if (thumbHeight > this.trackElement.scrollHeight) {
                this.thumbHeight = this.trackElement.scrollHeight
            } else {
                this.thumbHeight = thumbHeight
            }

            this.trackPaddingBottom = parseInt(getComputedStyle(this.trackElement).paddingBottom)
            if (_.isNaN(this.trackPaddingBottom)) {
                this.trackPaddingBottom = 0
            }
            this.thumbPositionMax = this.trackElement.clientHeight-this.thumbHeight-this.trackPaddingBottom // - 0.5
            // this.loaded = true
            // this.trackElementBounding = this.trackElement.getBoundingClientRect()
            this.clearValues()
            // console.log(this)
            return true
        }
        return false
    }
    enable() {
        this.isNeeded = true
        this.init(true)
    }
    disable() {
        this.isNeeded = false
    }
    isThumbYInLimits(y) {
        if (y >= this.thumbPositionMin && y <= this.thumbPositionMax) {
            return true
        }
        return false
    }
    yThumbToLimits(y) {
        if (this.isThumbYInLimits(y)) {
            return y
        }
        if (y > this.thumbPositionMax) {
            return this.thumbPositionMax
        }
        if (y < this.thumbPositionMin) {
            return this.thumbPositionMin
        }
        return 0
    }
    isScrollYInLimits(y) {
        if (y >= this.scrollPositionMin && y <= this.scrollPositionMax) {
            return true
        }
        return false
    }
    yScrollToLimits(y) {
        if (this.isScrollYInLimits(y)) {
            return y
        }
        if (y > this.scrollPositionMax) {
            return this.scrollPositionMax
        }
        if (y < this.scrollPositionMin) {
            return this.scrollPositionMin
        }
        return 0
    }
    start(x,y,thumb = true) {
        if(x && y) {
            if (this.swipeAnimation) {
                this.swipeAnimation.pause()
            }
            this.clearValues()
            if (thumb) {
                this.touching = true
            } else {
                this.swipeTouching = true
            }
            this.time_start = Date.now()
            this.time_start_main = Date.now()
            this.x_start = x, this.x_start_main = x
            this.y_start = y, this.y_start_main = y
        }
    }
    thumbMove(x,y) {
        // вот эта вот хуета снизу шоб во время скрола не переключало ебана
        // setTimeout(() => {
            if (this.touching) {
                // console.log('soemthing')
                if (this.swipeAnimation) {
                    this.swipeAnimation.pause()
                }
                // window.dispatchEvent(new CustomEvent('scroll'))
                this.x_end = x, this.x_end_main = x
                this.y_end = y, this.y_end_main = y
                this.time_end = Date.now()
                
                const x_length = this.x_end-this.x_start
                const y_length = this.y_end-this.y_start
                // const time = Math.max(this.time_end-this.time_start,1)
                // console.log(this.y_end, this.y_start)
                // this.x_speed = x_length / time
                // this.y_speed = y_length / time
                // console.log(y_length,this.y_speed*y_length)
                this.thumbMoveYBy(y_length)
                // console.log(this.baseElement.scrollHeight * (this.thumbPosition / this.thumbPositionMax))
                this.x_start = x
                this.y_start = y
                this.time_start = Date.now()
            }
        // }, 50);
    }
    end(x,y) {
        this.touching = false
        this.swipeTouching = false
        // console.log("end")
        this.time_end = Date.now()
        this.time_end_main = Date.now()
        this.x_end = x, this.x_end_main = x
        this.y_end = y, this.y_end_main = y
        // const x_length = this.x_end-this.x_start
        // const directionSign = Math.sign
        // const y_length = Math.max(-(this.y_end-this.y_start),Math.sign(-(this.y_end-this.y_start))*1)
        // // const y_length_main = -(this.y_end_main-this.y_start_main)
        // const time = Math.max(this.time_end-this.time_start,1)
        // const speed = Math.abs(this.y_end_main-this.y_start)/time
        // if (this.swipeTouching) {
        //     console.log("SPEEED", Math.abs(this.y_end_main-this.y_start)/time)
        //     console.log(time,y_length)
        // }
        // if (this.swipeTouching && speed > 0.2) {
        //     this.swipeAnimate(Math.sign(y_length) * Math.max(Math.sign(y_length)*500,(300 * this.y_speed)))
        // }
        this.clearValues()
    }
    toTop() {
        this.thumbMoveYTo(0)
    }
    toBottom() {
        this.thumbMoveYTo(this.thumbPositionMax)
    }
    cookie(pos,posMax) {
        this.baseMoveYTo(this.yScrollToLimits(pos * (this.scrollPositionMax / posMax)))
        this.baseScrollAnimation()
        // this.thumbPosition = pos*(this.thumbPositionMax/posMax)
    }
    updateThumb() {
        // console.log("thumb")
        this.thumbPosition = this.thumbPositionMax * Math.min(this.scrollPosition / this.scrollPositionMax,1)
        // console.log(this.thumbPositionMax * Math.min(this.scrollPosition / this.scrollPositionMax,1), "TRHUMB POS",this.thumbPosition)
    }
    scrollEnable = _.debounce(() => {
        this.scrollEventEnabled = true
    },100)
    updateScroll() {
        this.scrollPosition = this.scrollPositionMax * Math.min(this.thumbPosition / this.thumbPositionMax,1)
        this.baseScrollAnimation()
        // console.log(new anime())
    }
    baseScrollAnimation() {
        const that = this
        if (!this.animation) {
            this.animation = anime()
        }
        this.scrollEventEnabled = false
        // this.scrollPosition = this.scrollPositionMax * Math.min(this.thumbPosition / this.thumbPositionMax,1)
        // this.scrollToCurrentPosition()
        // this.baseElement.scrollTop = this.scrollPosition
        this.scrollEnable()
        that.animation.pause()
        that.animation = anime({
            targets: this.baseElement,
            scrollTop: this.scrollPosition,
            easing: "easeOutExpo",
            update: () => {
                this.scrollEnable()
            },
            duration: that.scrollTransition ? 500 : 0
        })
    }
    // scrollEventEnabled = true
    // scrollToCurrentPosition = _.throttle(() => {
    //     const that = this
    //     anime({
    //         targets: this.baseElement,
    //         scrollTop: this.scrollPosition,
    //         easing: "easeOutExpo",
    //         duration: 500,
    //         begin: () => {
    //             this.scrollEventEnabled = false
    //         },
    //         complete: () => {
    //             this.scrollEventEnabled = true
    //         }
    //     })
    // },100)
    baseMoveYBy(by) {
        this.scrollPosition = this.yScrollToLimits(this.scrollPosition + by)
        this.updateThumb()
    }
    baseMoveYTo(to,update = false) {
        this.scrollPosition = this.yScrollToLimits(to)
        if (update) {
            this.updateScroll()
        }
        // console.log(this.scrollPosition)
        // console.log(this.scrollPosition)
        // console.log("to")
        this.updateThumb()
    }
    thumbMoveYBy(by) {
        this.thumbPosition = this.yThumbToLimits(this.thumbPosition + by)
        this.updateScroll()
    }
    thumbMoveYTo(to) {
        this.thumbPosition = this.yThumbToLimits(to)
        this.updateScroll()
    }
    trackClick(x,y) {
        // console.log(y,this.thumbPosition)
        // const bound = this.trackElement.getBoundingClientRect()
        // this.trackElementBounding = this.trackElement.getBoundingClientRect()
        if (y-this.thumbHeight > this.thumbPosition) {
            // console.log(this.trackPaddingBottom)
            this.thumbMoveYTo(y - this.thumbHeight - this.trackPaddingBottom/2)
        } else {
            this.thumbMoveYTo(y - this.trackPaddingBottom/2)
        }
    }
    resize() {
        // console.log("RESIZE122", this)
        const prevThumbPosition = this.thumbPosition
        const prevThumbPositionMax = this.thumbPositionMax
        this.init()
        this.thumbPosition = this.yThumbToLimits(prevThumbPosition*(this.thumbPositionMax/prevThumbPositionMax))
    }
    wheel(x,y) {
        this.baseMoveYBy(y)
    }
    show() {
        this.visible = true
    }
    hide() {
        this.visible = false
    }
    visibilityToggle() {
        if (this.visible) {
            this.hide() 
        } else {
            this.show()
        }
    }
    // setHoverTimeout(that) {
    //     this.hoverTimeout = setTimeout(() => {
    //         that.visible = false
    //     }, 500)
    // }
    // hoverEnter(that) {
    //     this.visible = true
    //     clearTimeout(this.hoverTimeout)
    //     console.log(this.visible)
    // }
    // hoverLeave() {
    //     this.setHoverTimeout(this)
    // }
    scrollDebounce = _.debounce((that) => {
        that.baseMoveYTo(this.baseElement.scrollTop)
        // console.log("end")
    },100)
    scrollThrottle = _.throttle((that) => {
        // console.log("test",this.baseElement.scrollTop)
        // console.log(this.scrollEventEnabled)
        if (this.scrollEventEnabled) {
            that.baseMoveYTo(this.baseElement.scrollTop)
            this.scrollDebounce(that)
        }
    },50)
    resizeDebounce = _.debounce((that) => {
        
        that.resize()
    },100)
    // end() {
    //     this.mutationObserver.disconnect()
    //     this.resizeObserver.disconnect()
    // }
    events() {
        const that = this
        // const resizeObserver = new ResizeObserver((elements) => {
        //     console.log(elements,"RESIZE")
        //     that.resizeDebounce(that)
        // })
        // for (let element of this.baseElement.children) {
        //     resizeObserver.observe(element)
        // }
        /*
            Вот это вот гавно внизу переделать нормально :>
        */
        // this.mutationObserver = new MutationObserver((elements) => {
        //     that.resize(that)
        // })
        // this.resizeObserver = new ResizeObserver((elements) => {
        //     that.resize(that)
        // })
        // // console.log(this.baseElement?.children[0]?.children || this.baseElement.children || this.baseElement)
        // for (let element of this.baseElement?.children[555]?.children || this.baseElement.children || this.baseElement) {
        //     this.resizeObserver.observe(element)
        // }
        // this.mutationObserver.observe(this.baseElement.children[0] || this.baseElement,{childList:true})

        // this.hoverElement.addEventListener("mouseover", _.throttle((event) => {
        //     this.hoverEnter()
        //     console.log("enter")
        // },25), {passive: true})
        // this.scrollbarElement.addEventListener("mouseover", _.throttle((event) => {
        //     this.hoverEnter()
        //     console.log("enter")
        // },25), {passive: true})
        // this.hoverElement.addEventListener("mouseout", _.throttle((event) => {
        //     console.log("out")
        //     this.hoverLeave()
        // },25), {passive: true})
        // this.hoverElement.addEventListener("touchmove", _.throttle((event) => {
        //     this.hover()
        //     // that.swipeMove(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        // },25), {passive: true})
        // this.hoverElement.addEventListener("touchmove", _.throttle((event) => {
        //     this.hoverEnter()
        //     // that.swipeMove(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        // },25), {passive: true})
        const resizeObserver = new ResizeObserver(() => {
            this.resize()
        })

        for(let node of this.baseElement.children) {
            resizeObserver.observe(node)
        }
        this.baseElement.addEventListener("scroll", (event) => {
            this.scrollThrottle(that)
            // this.baseMoveYTo(this.baseElement.scrollTop)
        })

        this.thumbElement.addEventListener("mousedown",(event) => {
            event.preventDefault()
            that.start(event.clientX,event.clientY)
        })
        this.trackElement.addEventListener("mousedown",(event) => {
            event.preventDefault()
            that.trackClick(event.layerX,event.layerY)
        })
        // this.thumbElement.addEventListener("")
        window.addEventListener("mousemove",_.throttle((event) => {
            that.thumbMove(event.clientX,event.clientY)
        },50), {passive: true})
        window.addEventListener("mouseup",(event) => {
            that.end(event.clientX,event.clientY)
        }, {passive: true})  

        // this.rootElement.addEventListener("wheel", (event) => {
        //     that.baseMoveYTo(that.baseElement.scrollTop)
        //     // that.wheel(event.deltaX,event.deltaY)
        // }, {passive: true})
        // this.baseElement.addEventListener("touchstart", (event) => {
        //     // console.log(event.changedTouches[0].clientY)
        //     console.log(event)
        //     that.start(event.changedTouches[0].clientX,event.changedTouches[0].clientY, false)
        // }, {passive: true})
        // this.window.addEventListener("resize", )
        this.thumbElement.addEventListener("touchstart", (event) => {
            that.start(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        }, {passive: true})
        // this.trackElement.addEventListener("touchstart", (event) => {
        //     that.start(event.changedTouches[0].layerX,event.changedTouches[0].layerY)
        // }, {passive: true})
        window.addEventListener("touchmove", _.throttle((event) => {

            // console.log(event.changedTouches[0].clientY)
            that.thumbMove(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
            // that.swipeMove(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        },50), {passive: true})
        window.addEventListener("touchend", (event) => {
            that.end(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        }, {passive: true})


        window.addEventListener("resize", _.debounce((event) => {
            that.resize()
        },250))
        // window.addEventListener("resize",_.debounce(() => {
        //     this.resize()
        // },100))
    }
    
}
export default Scrollenko