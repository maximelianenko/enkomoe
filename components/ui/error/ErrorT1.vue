<template lang="pug">
Transition(name="fade")
    Icon.h-1-3em.w-1-3em.min-w-1-3em.text-rose-600(name="mdi:error-outline" v-show="props.error")
</template>

<script setup>
const props = defineProps({
    error: {
        default: false
    }
})

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>