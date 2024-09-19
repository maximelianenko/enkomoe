<template lang="pug">
button.flex.justify-center.items-center.hover-rotation.transition-transform-out-expo(
    ref="restore"
    :disabled="props.disabled"
    @click="handleClick($event)"
)
    .flex.justify-center.items-center.transition-opacity-out-expo(
        ref="rotateElement"
        :style=`{
            "opacity": props.restore == model ? 0.2 : 1,
        }`
    )
        Icon.w-1-25em.h-1-25em.min-w-1-25em.min-h-1-25em(
            name="mdi:restart"
        )
</template>

<script setup>
import _ from "lodash"
import anime from "animejs"
const emit = defineEmits(['click'])
const props = defineProps({
    disabled: {
        default: false
    },
    restore: {
        required: true
    }
})
const restore = ref()
const model = defineModel()
const rotate = ref(0)
const rotateElement = ref()
const isMouseOver = ref(false)
let rotateAnimation
function handleClick(event) {
    emit("click",event)
    let rotation = parseInt(anime.get(rotateElement.value, "rotate", "deg"))
    if (rotateAnimation instanceof anime) {
        rotateAnimation.pause()
    }
    rotateAnimation = anime({
        targets:rotateElement.value,
        rotate: Math.floor(rotation/360)*360-360,
        easing: "easeOutExpo",
        duration: 1500,
        complete:  () => {
            if (isMouseOver.value) {
                isRotateInProgress = false
                handleMouseOver()
            }
        }
    })
    model.value = props.restore
}
// onMounted(() => {
//     restore.value.addEventListener("mouseover", (event) => {
//         handleMouseOver(event)
//     })
//     restore.value.addEventListener("mouseout", (event) => {
//         handleMouseOut(event)
//     })
// })
</script>

<style lang="scss" scoped>
.hover-rotation{
    &:hover{
        transform: rotate(-45deg);
    }
}
.transition-transform-out-expo{
    transition: transform 0.5s var(--ease-out-expo);
}
.transition-opacity-out-expo {
    transition: opacity 0.5s var(--ease-out-expo);
}
</style>