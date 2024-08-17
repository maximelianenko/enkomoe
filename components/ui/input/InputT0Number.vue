<template lang="pug">
component.overflow-hidden.relative(
    :is="props.label ? 'label' : 'div'"
)
    input.w-full.bg-transparent.placeholder-black.text-black.placeholder-opacity-40.leading-0-9em.align-middle.relative(
        v-model="number"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        type="number"
    )
</template>

<script setup>
import _ from "lodash"
const number = defineModel()
const props = defineProps({
    label: {
        default: true,
    },
    error: {
        default: false
    },
    limits: {
        default: {min: 0,max: 100}
    },
    disabled: {
        default: false,
    },
    placeholder: {
        default: ""
    }
})
watch(number, () => {
    // let num = parseInt(number.value)
    // if (_.isNumber(num) && !_.isNaN(num)) {
    //     number.value = _.clamp(num, props.limits.min, props.limits.max)
    // } else {
    //     number.value = 0
    // }
})

</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
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