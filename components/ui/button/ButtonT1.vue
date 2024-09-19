<template lang="pug">
button.button-type-1.flex.flex-nowrap.gap-0-2em.font-normal.h-1-2em.bg-amber-300.main-box-shadow.overflow-hidden.items-center(
    @click="handleClick($event)"
    ref="button"
)
    slot(name="before")
    p.text-black.relative.truncate {{ props.text }}
    slot(name="after")
</template>

<script setup>
import anime from "animejs"
const props = defineProps(["text"])
const button = ref()
const emit = defineEmits(['click'])
function handleClick(event) {
    emit('click',event)
}
</script>

<style lang="scss" scoped>
.button-type-1{
    transition: transform 0.5s var(--ease-out-expo);
    &:active {
        transform: scale(0.95);
    }
}
</style>