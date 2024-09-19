<template lang="pug">
.flex.justify-between.flex-nowrap.h-full.relative.touch-none(ref="root")
    .absolute.w-full.z-50.h-full.top-0.left-0(v-show="scrollenko.touching")
    .scrollbar-remove.w-full.h-full(ref="base")
        //- .relative.w-full.scroll-transition.scroll-transition(:style=`{
        //-     top: "-" + scrollenko.scrollPosition + "px"
        //- }`)
        slot
    //- transition(name="scrollbar")
    //- .absolute.bottom-0.right-0.z-20.hover_opacity-100.opacity-25.scrollbar-transition.hover_translate-x-0.translate-x-1
    //-     button.pl-0-5.pt-0-25.pb-0-25.pr-1.-mr-1-5.bg-black.rounded-tl-1(@click="scrollenko.visibilityToggle()")
    //-         Icon.min-h-1.min-w-1.text-2.text-slate-100(name="mdi:mouse-move-vertical")
    .h-full.bg-transparent.absolute.z-10.right-0.pt-0-5em.pb-0-5em.flex.flex-col.items-center.show-transition(
        :style=`{
            // right: scrollenko.visible ? "0em" : "-3em",
            "pointer-events": scrollenko.isNeeded ? "auto" : "none"
        }`
        ref="scrollbar"
    )
        button.flex.flex-col.items-center.text-black.cursor-pointer(
            @click="scrollenko.toTop()"
        )
            Icon.h-2em.w-2em.min-h-2em.min-w-2em(name="mdi:arrow-up")
            //- .w-1-1em.bg-amber-300.h-0-25em
        .w-1-2em.h-full.cursor-pointer.relative.pb-0-4em.main-box-shadow(
            ref="track"
        )   
            .w-full.h-full.bg-gradient-to-b.from-amber-300.to-amber-400.absolute
        .absolute.w-1-2em.h-full.cursor-grab.pt-2-2em.pointer-events-none
            .relative.flex.justify-center.w-1-2em.pointer-events-auto.overscroll-none(
                :class=`{"scroll-transition": scrollenko.scrollTransition}`
                :style=`{
                    top: scrollenko.thumbPosition + "px",
                }`
            )
                .relative.z-10(ref="thumb" :style=`{
                    opacity: scrollenko.isNeeded ? "100" : "0",
                }`)
                    .thumb-transition.flex.justify-center.w-2em(
                        :style=`{
                            height: scrollenko.thumbHeight/2 + "px",
                        }`
                    )
                        .w-0-9em.bg-black.h-full
                    .thumb-transition.flex.justify-center.w-2em(
                        :style=`{
                            height: scrollenko.thumbHeight/2 + "px",
                        }`
                    )
                        .w-0-9em.bg-black.h-full
        button.flex.flex-col.items-center.text-black.cursor-pointer(
            @click="scrollenko.toBottom()"
        )
            //- .w-1-1em.bg-amber-400.h-0-4em
            Icon.h-2em.w-2em.min-h-2em.min-w-2em(name="mdi:arrow-down")
</template>

<style lang="scss" scoped>
.scroll-transition {
    transition: top 0.5s var(--ease-out-expo);
}
.scrollbar-transition{
    transition: opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo);
}
.show-transition { 
    transition: opacity 1s var(--ease-out-expo);
}
.thumb-transition {
    transition: height 0.5s var(--ease-out-expo)
}
.scrollbar-enter-active,
.scrollbar-leave-active {
  transition: opacity 0.6s var(--ease-out-expo);
}

.scrollbar-enter-from,
.scrollbar-leave-to {
  opacity: 0;
}
.scrollbar-remove{
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }
}
</style>

<script setup>
import Scrollenko from "~/assets/modules/Scrollenko.js"
import _ from "lodash"
function isScrollable(element) {
    return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
}

const base = ref()
const track = ref()
const thumb = ref()
const root = ref()
const hover = ref()
const scrollbar = ref()

const props = defineProps(['cookie'])
const scrollenko = reactive(new Scrollenko())
let scroll_position_cookie, scroll_position_max_cookie
onMounted(() => {
    scrollenko.elements({
        base: base.value,
        track: track.value,
        thumb: thumb.value,
        root: root.value,
        hover: hover.value,
        // scrollbar: scrollbar.value
    })
    scrollenko.init()
    scrollenko.events()
    // scrollenko.disable()
    // console.log(scrollenko.scrollPosition,scrollenko.thumbPosition,scroll)
    if (props.cookie) {
        scrollenko.cookie(scroll_position_cookie.value,scroll_position_max_cookie.value,scrollenko)
    }
    console.log(scrollenko)
})
if (props.cookie) {
    scroll_position_cookie = useCookie("y.scroll." + props.cookie, {default: () => 0})
    scroll_position_max_cookie = useCookie("y.scroll-max." + props.cookie, {default: () => 0})
    watch(() => scrollenko.scrollPosition, _.throttle((now) => {
        scroll_position_cookie.value = now
        scroll_position_max_cookie.value = scrollenko.scrollPositionMax
    },200))
}
// watch(() => scrollenko.thumbPosition, (val) => {
//     console.log(val,"thumb") 
// })
watch(() => scrollenko.touching, (touching) => {
    const body = document.querySelector("body")
    body.setAttribute("style", touching ? "cursor:grabbing" : 'cursor:auto') 
})

</script>