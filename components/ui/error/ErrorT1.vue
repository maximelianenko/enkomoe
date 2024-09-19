<template lang="pug">
Transition(name="fade")
    .relative.error-type-1.cursor-context-menu.h-1-2em.flex.justify-center(v-if="props.error")
        .absolute.z-10.left-1-5em.error-type-1-description.bg-amber-300.pl-0-2em.pr-0-2em.opacity-0.pointer-events-none.main-box-shadow.flex.items-center.justify-center(v-if="props.description")
            p.leading-1-2em.font-normal {{props.description}}
        Icon.h-1-2em.w-1-2em.min-w-1-2em.text-rose-600(name="mdi:error-outline")
</template>

<script setup>
// переделать описание
const props = defineProps({
    error: {
        default: false
    },
    description: {
        required: false,
    }
})

</script>

<style lang="scss" scoped>
.error-type-1{
    &-description{
        transition: opacity 0.5s var(--ease-out-expo);
    }
    &:hover{
        &>.error-type-1-description{
            opacity: 100;
            pointer-events: all;
        }
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
</style>