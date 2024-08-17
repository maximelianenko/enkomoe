import _ from "lodash"

class Scroll {
    constructor() {
        throw new Error("WRONG PACKAGE")
        this.values = [
            "x_start","x_end","y_start",
            "y_end","x_start_main","x_end_main",
            "y_start_main","y_end_main","time_start",
            "time_end","time_start_main","time_end_main",
            "x_state_start","speed"
        ]
        this.thumbHeight = 0
        this.thumbPosition = 0
        this.thumbPositionMax = 0
        this.thumbPositionStart = 0
        this.scrollHeight = 0
        this.y_state = 0
        this.touching = false
        this.swipeTouching = false
        this.loaded = false
        this.inverted = false
        this.sensitivity = 1
        for (const val of this.values) {
            this[val] = 0
        }
    }
    base(scrollBase) {
        this.baseElement = scrollBase
    }
    track(scrollTrack) {
        this.trackElement = scrollTrack
    }
    thumb(scrollThumb) {
        this.thumbElement = scrollThumb
    }
    container(scrollContainer) {
        this.containerElement = scrollContainer
    }
    toTop() {
        this.y_state = 0
        this.thumbPosition = 0
    }
    toBottom() {
        this.y_state = 100
        this.thumbPosition = this.thumbPositionMax
    }
    init() {
        this.scrollHeight = this.baseElement.scrollHeight - this.baseElement.clientHeight
        const thumbHeight = Math.max(this.trackElement.clientHeight*(this.trackElement.clientHeight/this.baseElement.scrollHeight),10)
        
        if (thumbHeight > this.trackElement.clientHeight) {
            this.thumbHeight = this.trackElement.clientHeight
        } else {
            this.thumbHeight = thumbHeight
        }

        this.thumbPositionMax = this.trackElement.clientHeight-this.thumbHeight-0.5
        this.loaded = true
    }
    resize() {
        // сделать шоб не сбрасывался скролл до нуля (вроде готово)
        const prevThumbPosition = this.thumbPosition
        const prevThumbPositionMax = this.thumbPositionMax
        this.thumbHeight = 0
        // this.thumbPosition = 0
        this.thumbPositionMax = 0
        this.thumbPositionStart = 0
        this.scrollHeight = 0
        // this.y_state = 0
        this.touching = false
        for (const val of this.values) {
            this[val] = 0
        }
        this.init()

        this.thumbPosition = prevThumbPosition*(this.thumbPositionMax/prevThumbPositionMax)
        // console.log((this.thumbPosition / this.thumbPositionMax) * 100,"VAL")
        this.y_state = (this.thumbPosition / this.thumbPositionMax) * 100
    }
    start(x,y, isSwipe = false) {
        console.log()
        for (const val of this.values) {
            this[val] = 0
        }
        if (isSwipe) {
            this.swipeTouching = true
        } else {
            this.touching = true
        }
        this.time_start = Date.now()
        this.time_start_main = Date.now()
        this.x_start = x, this.x_start_main = x
        this.y_start = y, this.y_start_main = y
        this.x_state_start = this.x_state
        this.thumbPositionStart = this.thumbPosition
        // this.sensitivity = sensitivity
    }
    moveInRange(pos) {
        console.log(pos)
        if (pos <= 0) {
            this.thumbPosition = 0
        } else if (pos >= this.thumbPositionMax) {
            this.thumbPosition = this.thumbPositionMax
        } else {
            this.thumbPosition = pos
        }
        console.log(pos,"POS")
        this.y_state = (this.thumbPosition / this.thumbPositionMax) * 100
        console.log((this.thumbPosition / this.thumbPositionMax) * 100,"VAL")
        console.log(this.y_state)
    }
    move(x,y) {
        if (this.touching) {
            console.log(y)
            window.dispatchEvent(new CustomEvent('scroll'))
            this.x_end = x, this.x_end_main = x
            this.y_end = y, this.y_end_main = y
            this.time_end = Date.now()
            const y_length = this.y_end-this.y_start_main

            const nextThumbPosition = this.thumbPositionStart + y_length

            this.moveInRange(nextThumbPosition)

            this.x_start = x
            this.y_start = y
            this.time_start = Date.now()
        }
    }
    end(x,y) {
        this.touching = false
        this.swipeTouching = false
        this.time_end = Date.now()
        this.time_end_main = Date.now()
        this.x_end = x, this.x_end_main = x
        this.y_end = y, this.y_end_main = y
        this.inverted = false
        this.sensitivity = 1
    }
    moveThumbTo(x,y) {
        if (y > this.thumbPosition) {
            this.moveInRange(y - this.thumbHeight)
        } else {
            this.moveInRange(y)
        }

        this.thumbPositionStart = this.thumbPosition
    }
    isTap(deadZone = 3) {
        return Math.abs(this.x_end_main-this.x_start_main) < deadZone
    }
    wheel(x,y) {
    //     const scale = window.devicePixelRatio || 1;
    //     console.log(scale)
        console.log(this.thumbPosition + y/35)
        console.log((1000/window.innerHeight),"INNERHI")
        this.moveInRange(this.thumbPosition + this.scrollHeight)
    }
    events() {
        const that = this
        this.thumbElement.addEventListener("mousedown",(event) => {
            event.preventDefault()
            that.start(event.clientX,event.clientY)
        })
        this.trackElement.addEventListener("mousedown",(event) => {
            event.preventDefault()
            that.moveThumbTo(event.layerX,event.layerY)
        })
        // this.thumbElement.addEventListener("")
        window.addEventListener("mousemove",_.throttle((event) => {
            that.move(event.clientX,event.clientY)
        },50))
        window.addEventListener("mouseup",(event) => {
            that.end(event.clientX,event.clientY)
        })  

        this.containerElement.addEventListener("wheel", (event) => {
            that.wheel(event.deltaX,event.deltaY)
        }, {passive: true})
        this.thumbElement.addEventListener("touchstart", (event) => {
            that.start(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        }, {passive: true})
        this.trackElement.addEventListener("touchstart", (event) => {
            that.start(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        }, {passive: true})
        this.baseElement.addEventListener("touchstart", (event) => {
            console.log(event.changedTouches[0].clientY)
            that.start(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        }, {passive: true})
        window.addEventListener("touchmove", _.throttle((event) => {
            that.move(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        },50))
        window.addEventListener("touchend", (event) => {
            that.end(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
        })
        window.addEventListener("resize",_.debounce(() => {
            this.resize()
        },100))
    }
}
export default Scroll