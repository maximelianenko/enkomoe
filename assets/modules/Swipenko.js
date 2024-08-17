import _ from "lodash"
import MovementHelper from "~/assets/modules/MovementHelper.js"
const movementHelper = new MovementHelper()
class Swipe {
    constructor(degreeSensitivity) {
        // this.endCallback = endCallback || function () {}
        this.clearValues()
        this.x_state = 0
        this.y_state = 0
        this.touching = false
        this.scrolling = false
        this.direction = "none"
        this.x_grid_min = 0
        this.x_grid_max = 0
        this.y_grid_min = 0
        this.y_grid_max = 0

        this.gridCellSize = 100
        this.gridOverflow = 50
        this.degreeSensitivity = degreeSensitivity || 45
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
    isInLimits(value,min,max) {
        if (value <= max && value >= min) {
            return true
        }
        return false
    }
    toLimits(value,min,max) {
        if (this.isInLimits(value,min,max)) {
            return value
        }
        if (value > max) {
            return max
        }
        if (value < min) {
            return min
        }
        return 0
    }
    overflow(overflow) {
        this.gridOverflow = overflow
    }
    elements(elements) {
        this.elements = elements
    }
    grid(params = {}) {
        console.log(params)
        this.x_grid_min = -Math.abs(params?.x?.right || 0)
        this.x_grid_max = Math.abs(params?.x?.left || 0)
        this.x_grid_min_overflow = _.isNumber(params?.x?.rightOverflow) ? params?.x?.rightOverflow : this.gridOverflow
        this.x_grid_max_overflow = _.isNumber(params?.x?.leftOverflow) ? params?.x?.leftOverflow : this.gridOverflow
        // temporary :> (maybe)
        this.x_grid_min_scaleCorrection = []
        if (params?.x?.rightScaleCorrection !== undefined) {
            this.x_grid_min_scaleCorrection_min = Math.min(...params?.x?.rightScaleCorrection)
            for(let [index,sensitivity] of params?.x?.rightScaleCorrection.entries()) {
                // console.log(sensitivity /  this.x_grid_min_scaleCorrection_min)
                this.x_grid_min_scaleCorrection.push(sensitivity /  this.x_grid_min_scaleCorrection_min)
            }  
        }


        this.y_grid_min = -Math.abs(params?.y?.bottom || 0)
        this.y_grid_max = Math.abs(params?.y?.top || 0)
        this.y_grid_min_overflow = _.isNumber(params?.y?.bottomOverflow) ? params?.y?.bottomOverflow : this.gridOverflow
        this.y_grid_max_overflow = _.isNumber(params?.y?.topOverflow) ? params?.y?.topOverflow : this.gridOverflow
        
        this.limits()
    }
    limits() {
        // console.log(Math.round((Math.max(4,1)-1)/2))
        // const x_limit = Math.round(Math.max(this.x_grid,1)-1)/2
        // const y_limit = Math.round(Math.max(this.y_grid,1)-1)/2
        // const x_limit_start = Math.max(this.x_grid_start,1)
        // const x_limit_scaled = x_limit*this.gridCellSize
        // const y_limit_scaled = y_limit*this.gridCellSize
        // const x_limit_scaled_negative = x_limit_scaled * -1
        // const y_limit_scaled_negative = y_limit_scaled * -1
        const underflow = 20
        const x_min_scaled = this.x_grid_min * this.gridCellSize
        const x_max_scaled = this.x_grid_max * this.gridCellSize
        const y_min_scaled = this.y_grid_min * this.gridCellSize
        const y_max_scaled = this.y_grid_max * this.gridCellSize
        let x_range = []
        // replace with x_max and x_min without i -= gridcellsize
        for (let i = x_max_scaled; i >= x_min_scaled; i-=this.gridCellSize) {
            x_range.push(i)
        }
        let y_range = []
        for (let i = y_max_scaled; i >= y_min_scaled; i-=this.gridCellSize) {
            y_range.push(i)
        }


        this.limits = {
            x: {
                max: x_max_scaled,
                max_overflow: x_max_scaled + this.x_grid_max_overflow, 
                min: x_min_scaled,
                min_overflow: x_min_scaled - this.x_grid_min_overflow,
                center: 0,
                range: x_range
            },
            y: {
                max: y_max_scaled,
                max_overflow: y_max_scaled + this.y_grid_bottom_overflow,
                min: y_min_scaled,
                min_overflow: y_min_scaled - this.y_grid_top_overflow,
                center: 0,
                range: y_range
            },
        }
    }
    isXInLimits(x,overflow) {
        // console.log(this.limits)
        if ((overflow && x <= this.limits.x.max_overflow && x >= this.limits.x.min_overflow) || (x <= this.limits.x.max && x >= this.limits.x.min)) {
            return true
        }
        return false
    }
    isYInLimits(y,overflow) {
        if ((overflow && y <= this.limits.y.max_overflow && y >= this.limits.y.min_overflow) || (y <= this.limits.y.max && y >= this.limits.y.min)) {
            return true
        }
        return false
    }
    xToLimits(x,overflow = false) {
        if (this.isXInLimits(x,overflow)) {
            return x
        }
        let limits_max = overflow ? this.limits.x.max_overflow : this.limits.x.max
        if (x > limits_max) {
            return limits_max
        }
        let limits_min = overflow ? this.limits.x.min_overflow : this.limits.x.min
        if (x < limits_min) {
            return limits_min
        }
        return 0
    }
    yToLimits(y,overflow = false) {
        if (this.isYInLimits(y,overflow)) {
            return y
        }
        let limits_max = overflow ? this.limits.y.max_overflow : this.limits.y.max
        if (y > limits_max) {
            return limits_max
        }
        let limits_min = overflow ? this.limits.y.min_overflow : this.limits.y.min
        if (y < limits_min) {
            return limits_min
        }
        return 0
    }
    to(direction,by) {
        switch (direction) {
            case "cx": {
                this.x_state = 0
                break;
            }
            case "cy": {
                this.y_state = 0
                break;
            }
            case "c": {
                this.x_state = 0
                this.y_state = 0
                break;
            }
            case "l": {
                // console.log("l")
                const moveBy = Math.abs(by)
                this.x_state = Math.min(this.limits.x.max,this.gridCellSize*moveBy)
                break;
            }
            case "r": {
                // console.log("r")
                const moveBy = -Math.abs(by)
                this.x_state = Math.max(this.limits.x.min,this.gridCellSize*moveBy)
                break;
            }
            case "t": {
                // console.log("t")
                const moveBy = Math.abs(by)
                this.y_state = Math.min(this.limits.y.max,this.gridCellSize*moveBy)
                break;
            }
            case "b": {
                // console.log("b")
                const moveBy = -Math.abs(by)
                this.y_state = Math.max(this.limits.y.min,this.gridCellSize*moveBy)
                break;
            }
        }
    }
    isTap(deadZone = 3) {
        return Math.abs(this.x_end_main-this.x_start_main) < deadZone
    }
    start(x,y) {
        this.clearValues()
        this.touching = true
        this.time_start = Date.now()
        this.time_start_main = Date.now()
        this.x_start = x, this.x_start_main = x
        this.y_start = y, this.y_start_main = y
        this.x_state_start = this.x_state
        this.y_state_start = this.y_state
    }
    move(x,y) {
        // вот эта вот хуета снизу шоб во время скрола не переключало ебана
        // setTimeout(() => {
            if (this.touching) {
                this.x_end = x, this.x_end_main = x
                this.y_end = y, this.y_end_main = y
                this.time_end = Date.now()

                const swipeDegree = movementHelper.degree(this.x_start,this.x_end,this.y_start,this.y_end)
                const swipeDirection = movementHelper.direction(swipeDegree, this.degreeSensitivity)
                // console.log(swipeDirection)

                this.direction = swipeDirection

                const x_length = Math.abs(this.x_end-this.x_start)
                const y_length = Math.abs(this.y_end-this.y_start)
                const time = Math.max(this.time_end-this.time_start,1)
                
                this.x_speed = x_length / time
                this.y_speed = y_length / time
                // for diagonal -> speed * 0.707
                // console.log(this.x_speed,this.y_speed,x_length,y_length,time,"VALUES")
                if (true || !this.scrolling) { // если шо убрат
                    const x_move = 25 * Math.min(this.x_speed,2) / Math.max(0.5,this.x_grid_min_scaleCorrection[Math.abs(Math.ceil(this.x_state/100))] || this.x_grid_min_scaleCorrection[this.x_grid_min_scaleCorrection.length-1])
                    // console.log("DIS",this.x_grid_min_scaleCorrection)
                    const y_move = 25 * Math.min(this.y_speed,2)
                    if (swipeDirection === "l") {
                        this.x_state = this.x_state -= x_move
                    } else if (swipeDirection === "r") {
                        this.x_state = this.x_state += x_move
                    } else if (swipeDirection === "t") {
                        this.y_state = this.y_state -= y_move
                    } else if (swipeDirection === "b") {
                        this.y_state = this.y_state += y_move
                    }
                    
                    this.x_state = this.xToLimits(this.x_state, true)
                    this.y_state = this.yToLimits(this.y_state, true)
                }

                if (!this.touching) {
                    this.end()
                }
                this.x_start = x
                this.y_start = y
                this.time_start = Date.now()
            }
        // }, 50);
    }
    end(x,y) {
        setTimeout(() => {
            this.scrolling = false
        }, 70);
        this.touching = false
        this.time_end = Date.now()
        this.time_end_main = Date.now()
        this.x_end = x, this.x_end_main = x
        this.y_end = y, this.y_end_main = y
    

        const x_length = this.x_end-this.x_start
        const y_length = this.y_end-this.y_start

        // let y_state_new = 0
        // let x_state_new = 0
        // if
        // console.log("STATE",this.toLimits(Math.round((this.x_state+Math.sign(x_length)*45)/100)*100,this.limits.x.min+45,this.limits.x.max-45))
        if (x_length !== 0 && ["l","r"].includes(this.direction)) {
            this.x_state = this.xToLimits(Math.round((this.x_state+Math.sign(x_length)*45)/100)*100)
            this.y_state = this.yToLimits(Math.round(this.y_state/100)*100)
        } else if (y_length !== 0 && ["t","b"].includes(this.direction)) {
            // почему + а не * (если что-то не работает проверить)
            this.y_state = this.yToLimits(Math.round((this.y_state+Math.sign(y_length)*45)/100)*100)
            this.x_state = this.xToLimits(Math.round(this.x_state/100)*100)
        } else {
            this.x_state = this.xToLimits(Math.round(this.x_state/100)*100)
            this.y_state = this.yToLimits(Math.round(this.y_state/100)*100)
        }
        this.clearValues()
    }
    base(swipeBase) {
        this.baseElement = swipeBase
    }
    events() {
        if (this.baseElement) {
            const that = this

            window.addEventListener("scroll", (event) => {
                that.scrolling = true
            },true)
    
            this.baseElement.addEventListener("touchstart", (event) => {
                // console.log(this.baseElement)
                that.start(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
            },{passive: true})
            window.addEventListener("touchmove", _.throttle((event) => {
                that.move(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
            },50))
            window.addEventListener("touchend", (event) => {
                that.end(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
            })
        }
    }
}
export default Swipe