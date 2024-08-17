<template lang="pug">
component.cursor-pointer.overflow-hidden.relative.main-box-shadow(
    :is="props.label ? 'label' : 'div'"
)
    input.invisible.absolute.-z-10(v-model="check" :value="props.value" type="checkbox")
    .h-1-2em.flex.items-center.bg-amber-300
        Transition(name="fade")
            //- .absolute.w-full.h-full.bg-black(v-show="!check")
        .pl-0-2em.flex.flex-nowrap.gap-0-2em.items-center.pr-0-5em.w-full.relative
            .w-0-9em.h-0-9em.border.border-solid.border-black.border-0-15em.flex.justify-center.items-center
                Transition(name="fade")
                    .w-0-8em.h-0-8em.bg-black(v-show="check")
                //- .absolute.top-0.left-0.h-full.w-full.rounded-full
            //- p.text-black.align-middle.select-none.truncate {{ props.text }}
    
</template>

<script setup>
const check = defineModel()
const props = defineProps({
    label: {
        default: true,
    },
    value:{
        default: false
    }
    // text: {
    //     default: "",
    //     required: true
    // }
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>