<template lang="pug">
.h-full.w-full
    .absolute.w-full.h-full.z-30(
        :style=`{
            "pointer-events": scrollbarThumbTouching ? "all" : "none",
            cursor: scrollbarThumbTouching ? "grabbing" : "grab"
            
        }`
    )
    .relative.h-full.w-full
        .w-full.h-full.main-scrollbar-remove(ref="base")
            slot
        .absolute.top-0.right-0.h-full.pt-0-3em.pb-0-3em.pr-0-3em
            .main-box-shadow.h-full.w-1-2em.pt-0-15em.pb-0-15em.bg-amber-300.flex.flex-col.items-center.cursor-pointer(ref="track")
                .thumb.relative.w-0-9em.bg-black.cursor-grab(
                    ref="thumb"
                    :style=`{
                        top: scrollbar.thumbPosition  + "px",
                    }`
                    :class=`{
                        "thumb-invisible": !scrollbar.need
                    }`
                )
                    .transition-height(:style=`{
                        height: scrollbar.thumbHeight/2 + "px",
                    }`)
                    .transition-height(:style=`{
                        height: scrollbar.thumbHeight/2 + "px",
                    }`)
</template>

<script setup>
import _ from "lodash"
import anime from "animejs"
const props = defineProps({
    error: {
        default: false
    },
})

const base = ref()
const track = ref()
const thumb = ref()
const scrollbar = reactive({
    thumbHeight:        0,
    thumbPosition:      0,
    thumbPositionMax:   0,
    trackPaddingTop:    0,
    trackPaddingBottom: 0,
    scrollMax:          0,
    need:               false,
    event:              true,
})
const animation = ref(undefined)
const scrollbarThumbTouching = ref(false)
const scrollbarMove = {
    y_start: 0,
    y_end:   0,
}
function scrollbarMoveClear() {
    for (let key of Object.keys(scrollbarMove)){
        scrollbarMove[key] = 0
    }
}
const currentScroll = ref(0)

watch(currentScroll, (scroll) => {
    setThumbPosition(scrollbar.thumbPositionMax * (currentScroll.value / scrollbar.scrollMax),false)
})
function setThumbPosition(value, update = true) {
    scrollbar.thumbPosition = _.clamp(value, 0, scrollbar.thumbPositionMax)
    if (update) {
        updateScroll()
    }
}
function moveThumbPosition(value) {
    setThumbPosition(scrollbar.thumbPosition + value)
    updateScroll()
}
function updateScroll() {
    scrollAnimation(scrollbar.scrollMax * scrollbar.thumbPosition / scrollbar.thumbPositionMax)
    // console.log(new anime())
}
function scrollAnimation(to) {
    if (!animation.value) {
        animation.value = anime()
    }
    scrollbar.event = false
    scrollEventEnable()
    animation.value.pause()
    animation.value = anime({
        targets: base.value,
        scrollTop: to,
        easing: "easeOutExpo",
        update: () => {
            scrollEventEnable()
        },
        duration: 500
    })
}
const scrollEventEnable = _.debounce(() => {
    scrollbar.event = true
},100)
function scrollbarUpdate() {
    // console.log(base.value.scrollHeight,base.value.clientHeight)
    scrollbar.thumbHeight = ((base.value.clientHeight-scrollbar.trackPaddingTop-scrollbar.trackPaddingBottom) *((base.value.clientHeight-scrollbar.trackPaddingTop-scrollbar.trackPaddingBottom) / base.value.scrollHeight))
    const style = getComputedStyle(track.value)
    scrollbar.trackPaddingTop = parseInt(style.paddingTop) || 0
    scrollbar.trackPaddingBottom = parseInt(style.paddingBottom) || 0
    scrollbar.thumbPositionMax = track.value.clientHeight-scrollbar.thumbHeight-scrollbar.trackPaddingTop-scrollbar.trackPaddingBottom;
    scrollbar.scrollMax = base.value.scrollHeight-window.innerHeight
    // console.log(base.value.scrollHeight, base.value.clientHeight)
    scrollbar.need = base.value.scrollHeight > base.value.clientHeight
    // console.log(scrollbar)
}
onMounted(() => {
    scrollbarUpdate()
    const resizeObserver = new ResizeObserver(() => {
        scrollbarUpdate()
    })

    for(let node of base.value.children) {
        resizeObserver.observe(node)
    }
    window.addEventListener("resize", _.debounce((event) => {
        scrollbarUpdate()
    },250))
    base.value.addEventListener("scroll", (_event) => {
        if (scrollbar.event) {
            currentScroll.value = base.value.scrollTop
        }
    })
    track.value.addEventListener("mousedown",(event) => {
        if (event.target !== track.value) {
            return
        }
        const y = event.layerY
        if (y-scrollbar.thumbHeight > scrollbar.thumbPosition) {
            setThumbPosition(y - scrollbar.thumbHeight - scrollbar.trackPaddingTop*2 - scrollbar.trackPaddingBottom)
        } else {
            setThumbPosition(y - scrollbar.trackPaddingTop*2 - scrollbar.trackPaddingBottom)
        }
    })
    thumb.value.addEventListener("mousedown",(event) => {
        event.preventDefault()
        const y = event.clientY
        scrollbarMoveClear()
        scrollbarThumbTouching.value = true
        scrollbarMove.y_start = y
    })
    // this.thumbElement.addEventListener("")
    window.addEventListener("mousemove",_.throttle((event) => {
        // thumbMove(event.clientY)
        const y = event.clientY
        if (scrollbarThumbTouching.value) {
            scrollbarMove.y_end = y
            const y_length = scrollbarMove.y_end-scrollbarMove.y_start
            moveThumbPosition(y_length)
            scrollbarMove.y_start = y
        }
    },50), {passive: true})
    window.addEventListener("mouseup",(event) => {
        const y = event.clientY
        scrollbarThumbTouching.value = false
        scrollbarMove.y_end = y
        scrollbarMoveClear()
    }, {passive: true})  
    // console.log(thumbHeight.value)
})
</script>

<style lang="scss" scoped>
.thumb {
    transition: opacity 0.3s var(--ease-in-out-quad), top 0.5s var(--ease-out-expo);
    &-invisible{
        opacity: 0;
        pointer-events: none;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.transition-height{
    transition: height 0.5s var(--ease-out-expo);
}
</style>