<template lang="pug">
template
    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em
        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right" v-if="props.sub")
        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:videocam-outline")
        p.text-1-3em.truncate камера
        ErrorT1(:error="form.cam_fov.error || form.cam_near.error || form.cam_far.error")
    .flex.flex-col.pl-0-5em.pr-0-1em.pt-0-1em.pb-0-5em
        .flex.flex-col.gap-0-5em
            InputT1RangeText(v-model="form.cam_fov.value" :error="form.cam_fov.error" :text="'fov:'" :min="1" :max="360" :step="1" :restore="30")
            InputT1RangeText(v-model="form.cam_near.value" :error="form.cam_near.error" :text="'near:'" :min="0.1" :max="100" :step="0.1" :restore="0.1" :clamp="false")
            InputT1RangeText(v-model="form.cam_far.value" :error="form.cam_far.error" :text="'far:'" :min="1" :max="1000" :step="1" :restore="1000")

</template>

<script setup>
const check = defineModel()
const props = defineProps({
    sub: {
        default: false
    }
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