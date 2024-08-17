<template lang="pug">
button.flex.flex-nowrap.gap-0-2em.button-type-1.overflow-hidden.relative.bg-gradient-to-r.from-pink-500.to-violet-500.pl-0-5em.pr-0-5em.pb-0-1em.pt-0-1em.rounded-full.flex.justify-center.items-center(
    @click="$emit('click',$event)"
)
    slot
    p.text-white.relative.h-1em.leading-0-9em.truncate {{ props.text }}
</template>

<script setup>
    const props = defineProps(["text"])
    defineEmits(['click'])
</script>

<style lang="scss" scoped>
.button-type-1 {
    transition: background-color 0.25s var(--ease-in-out-quad);
    // outline: solid black 0.075em;
    // outline-width: 0.1em;
    // outline-offset: -0.075em;
    &>p {
        transition: color 0.25s var(--ease-in-out-quad);
    }
    &::before{
        content: "";
        background-color: black;
        width: 100%;
        height: 100%;
        left:0;
        position: absolute;
        opacity: 1;
        transition: opacity 1s var(--ease-out-expo);
    }
    &:hover {
        background-color: white;
        &::before{
            content: "";
            opacity: 0;
        }
    }
    &:active{
        background-color: white;
        &::before{
            content: "";
            opacity: 0;
        }
    }
}
</style>