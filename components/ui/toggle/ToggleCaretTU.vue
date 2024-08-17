<template lang="pug">
component.overflow-hidden.relative.min-w-1-5em(
    :is="props.label ? 'label' : 'div'"
)
    input.invisible.absolute.-z-10(v-model="check" :disabled="props.disabled" type="checkbox" @input='emit("toggle",check)')
    Icon.h-1-5em.min-w-1-5em.w-1-5em.transition-transform(name="mdi:caret" :style="{'transform':  check ? '' : 'rotate(180deg)'}")
    //- .toggle-type-1-bg.h-1-2em.w-2-3em.min-w-2-3em.flex.items-center.bg-amber-300
    //-     Transition(name="fade")
    //-         .absolute.w-full.h-full.bg-amber-300(v-show="!check")
    //-     .toggle-type-1-knob
</template>

<script setup>
const value = ref(true)
const check = defineModel()
const props = defineProps({
    label: {
        default: true,
    },
    disabled: {
        default: false
    }
})
const emit = defineEmits(['toggle'])
// defineModel()
</script>

<style lang="scss" scoped>
.transition-transform{
    transition: transform 1s var(--ease-out-expo);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>