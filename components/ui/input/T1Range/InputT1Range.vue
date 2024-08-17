<template lang="pug">
component(
    :is="props.label ? 'label' : 'div'"
)
    //- p.text-white.relative.h-1em.leading-0-9em.truncate
    .relative.flex.items-center(ref="main")
        //- .absolute.bg-white.w-full.h-0-9em.z-10.pointer-events-none
        .absolute.bg-black.w-0-9em.h-0-9em.z-10.pointer-events-none.thumb(
            :style="{'left': `${x}px`, 'opacity': range.visible ? '100' : '0'}"
            ref="thumb"
        )
        .flex.nowrap.absolute.w-full.main-box-shadow
            .w-0-75em.min-w-0-75em.bg-amber-300
            .w-full.h-1-2em.bg-amber-300
            .w-0-75em.min-w-0-75em.bg-amber-300
        input.pl-0-25em.pr-0-25em.relative.input-range-type-1.opacity-0(
            ref="input"
            type="range"
            :min="props.min"
            :max="props.max"
            :step="props.step"
            :disabled="props.disabled"
            @input="handleInput($event.target.value)"
        )

</template>

<script setup>
import _ from "lodash"
import anime from "animejs"

// как вариант
// const throttledUpdateModel = _.throttle((value) => {
//     model.value = value
// },60)
function handleInput(value) {
    model.value = value
    // throttledUpdateModel(parseInt(value))
}
const props = defineProps({
    label: {
        default: true,
    },
    min: {
        default: 0,
    },
    max: {
        default: 100,
    },
    step: {
        default: 1,
    },
    disabled: {
        default: false,
    }
})

const model =  defineModel()
const input = ref()
const main = ref()
const thumb = ref()

class Range {
    constructor() {
        this.visible = false
        this.min = 0
        this.max = 0
    }
    elements(elements = {}) {
        if (_.isElement(elements.input)) {
            this.input = elements.input
        } else {
            throw new Error("input is not DOM element")
        }
        if (_.isElement(elements.main)) {
            this.main = elements.main
        } else {
            throw new Error("main is not DOM element")
        }
        if (_.isElement(elements.thumb)) {
            this.thumb = elements.thumb
        } else {
            throw new Error("thumb is not DOM element")
        }
        return this
    }
    updateMinMax(min,max) {
        this.min = min
        this.max = max
        return this
    }
    updatePosition(value) {
        this.position = this.valueToRange(
            (value - this.min) * (
                (
                    this.input.scrollWidth -
                    this.thumbSize -
                    this.paddingLeft -
                    this.paddingRight
                ) / (this.max - this.min)
            ) + this.paddingLeft
        )
        return this.position
    }
    updatePositionThrottle = _.throttle((value) => {
        this.updatePosition(value)
    },50)
    show() {
        this.visible = true
    }
    hide() {
        this.visible = false
    }
    updateLimits() {
        this.limits = {
            min: this.paddingLeft,
            max: this.input.scrollWidth-this.thumbSize-this.paddingRight
        }
    }
    sizes() {
        if (this.input) {
            const inputStyle = getComputedStyle(this.input)
            this.paddingLeft = parseInt(inputStyle.paddingLeft)
            this.paddingRight = parseInt(inputStyle.paddingRight)
        }
        if (this.thumb) {
            const thumbStyle = getComputedStyle(this.thumb)
            this.thumbSize = parseInt(thumbStyle.width)
        }
        this.limits = {
            min: this.paddingLeft,
            max: this.input.scrollWidth-this.thumbSize-this.paddingRight
        }
    }
    async init() {
        // console.log(this)
        this.sizes()
        this.updateLimits()
        this.updatePosition(model.value)
        await nextTick()
        this.show()
    }
    resize() {
        this.init()
    }
    events() {
        window.addEventListener("resize", _.debounce(() => {
            this.resize()
        },250))
        return this
    }
    valueToRange(value) {
        return _.clamp(value,this.limits.min,this.limits.max)
    }
}
const range = reactive(new Range())
onMounted(() => {
    range
        .updateMinMax(input.value.min,input.value.max)
        .elements({
            main:main.value,
            input:input.value,
            thumb:thumb.value
        })
        .events()
        .init()
})
const x = ref(0)
let animation
let animThrottle = _.throttle((value) => {
    if (animation) {
        animation.pause()
    }
    animation = anime({
        targets: x,
        value: value,
        easing: "easeOutExpo",
        duration: range.visible ? 500 : 0
    })
},50)
watch(model, (now) => {
    range.updatePosition(now)
})
watch(() => range.position, (value) => {
    animThrottle(value)
})

</script>

<style lang="scss" scoped>
/********** Range Input Styles **********/
/*Range Reset*/
.input-range-type-1 {
   -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
}

.input-range-type-1::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
//   margin-top: -25px; /* Centers thumb on the track */
  background-color: #808080;
//   border-radius: 9999px;
  height: 0.9em;
  width: 0.9em;
}
.input-range-type-1::-moz-range-thumb {
  background-color: #808080;
  border: none; /*Removes extra border that FF applies*/
  border-radius: 100%;
  height: 0.9em;
  width: 0.9em;
}
.thumb{
    transition: opacity 0.5s var(--ease-out-expo);
    // transition-delay: 250ms;
}
</style>