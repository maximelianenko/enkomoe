<template lang="pug">
component.relative.overflow-hidden.main-box-shadow(
    :is="props.label ? 'label' : 'div'"
)
    .flex.flex-nowrap.items-center.bg-amber-300.transition-color.gap-0-2em
        //- Transition(name="fade")
        //-     .absolute.w-full.h-full.bg-black(
        //-         v-show="text == ''"
        //-     )
        Transition(name="fade")
            .absolute.w-full.h-full.bg-gradient-to-r.from-red-500.to-red-800(
                v-show="props.error"
            )
        //- slot(name="icon")
            //- .h-0-9em.w-0-9em.min-h-0-9em.min-w-0-9em.flex.justify-center.items-center.bg-white.rounded-full
                //- Icon.w-0-6em.h-0-6em(name="mdi:account-card")
        input.bg-transparent.placeholder-white.placeholder-opacity-40.w-full.leading-0-9em.align-middle.pl-0-5em.pr-0-5em.text-black.h-1-2em.mb-0-1em.relative(
            v-model="text"
            :placeholder="props.placeholder"
            type="text"
        )
</template>

<script setup>
const text = defineModel()
const props = defineProps({
    label: {
        default: true,
    },
    error: {
        default: false
    },
    placeholder: {
        default: ""
    }
})
// const bgStyle = computed(() => {
//     if (props.error) {
//         return 'bg-gradient-to-r from-red-500 to-red-800'

//     } else {
//         return 'bg-gradient-to-r from-pink-500 to-violet-500'
//     }
// })
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>