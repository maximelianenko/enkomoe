import _ from "lodash"
class Swipenko {
    constructor() {
        this.x = false
        this.x_state = 0
        this.x_elements = undefined
        this.x_elements_width = undefined
        this.x_grid = 0
        this.x_grid_overflow = 50

        this.y = true
        this.y_state = 0
        this.y_elements = undefined
        this.y_elements_width = undefined
        this.y_grid = 0
        this.y_grid_overflow = 50

        this.touching = false
        this.scrolling = false
        
        this.direction = "none"

        this.range = undefined
        this.resetValues()
    }
    resetValues() {
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
    inRange(value,min,max) {
        if (value <= max && value >= min) {
            return true
        }
        return false
    }
    toRange(value,min,max) {
        if (this.inRange(value,min,max)) {
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
    xToRange(value) {
     return this.toRange(value)
    }
    isList(element) {
        if (element instanceof NodeList || element instanceof HTMLCollection || _.isArray(element)) {
            return true
        }
        return false
    }
    xElementsWidth() {
        if (this.x_elements) {
            const widths = []
            const widthsWithPrev = []
            for (const element of this.x_elements) {
                widths.push(element.scrollWidth)
                widthsWithPrev.push(widths.reduce((a,b) => a+b,0))
            }
            this.x_elements_width_prev = widthsWithPrev
            this.x_elements_width = widths
            return widths
        }
        return null
    }
    elements(elements = {}) {
        const isX = (_.isElement(elements.x_layout) && this.isList(elements.x_elements))
        const isY = (_.isElement(elements.y_layout) && this.isList(elements.y_elements))
        const isBase = _.isElement(elements.base)
        if (!isBase) {
            return new Error("please provide base element")
        }
        if (!(isX || isY)) {
            return new Error("please provide x or y layout element and elements")
        }
        if (isX) { 
            this.x = true
            this.x_layout = elements.x_layout
            this.x_elements = [...elements.x_elements]
            this.x_grid = this.x_elements.length
            this.xElementsWidth()
        }
        if (isY) {
            this.y = true
            this.y_layout = elements.y_layout
            this.y_elements = [...elements.y_elements]
            this.y_grid = this.y_elements.length
        }
        console.log(this)
        return null
        // console.log(this.layout.children)
        // this.x_elements = this.layout.children
    }
    
    range() {
        const x_width_max = this.x_elements_width.reduce((a,b) => a + b,0)
        const range = {
            x: {
                min:0,
                max:x_width_max,
                min_overflow: 0-this.x_grid_overflow,
                max_overflow: x_width_max+this.x_grid_overflow
            }
        }
    }
}

export default Swipenko