<template lang="pug">
button(@click="handleClick($event)" :disabled="props.disabled")
    Icon.w-1-25em.h-1-25em.min-w-1-25em(name="mdi:restore")
</template>

<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
    disabled: {
        default: false
    },
    restore: {
        required: true
    }
})
const model = defineModel()
function handleClick(event) {
    emit("click",event)
    model.value = props.restore
}
</script>

<style lang="scss" scoped>

</style>