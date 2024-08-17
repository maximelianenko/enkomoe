<template lang="pug">
component.flex.flex-col.gap-0-25em(
    :is="props.label ? 'label' : 'div'"
)
    .flex.flex-nowrap.items-center.gap-0-25em.justify-between
        label.flex.flex-nowrap.justify-between.items-center.gap-0-25em.w-full
            p.text-1-1em {{ text }}
            InputT0Number.text-1-1em.basis-0.grow(
                v-model="model"
                :disabled="props.disabled"
                :label="false"
            )
        ErrorT1(:error="props.error")
        ButtonT1Restore(v-model="model" :disabled="props.disabled" :restore="props.restore")
        //- button(@click="model = props.restore" :disabled="props.disabled")
        //-     Icon.w-1-25em.h-1-25em.min-w-1-25em(name="mdi:restore")
    InputT1Range.w-full(
        v-model="model"
        :label="false"
        :step="props.step"
        :min="props.min"
        :max="props.max"
        :disabled="props.disabled"
    )
</template>

<script setup>
import _ from "lodash"
const model = defineModel()

// peredelat
const throttledClamp = _.throttle((now) => {
    if (props.clamp) {
        const clamped = _.clamp(now,props.min,props.max)
        if (!_.isNaN(clamped)) {
            model.value = clamped
            return
        }
        model.value = props.min
    }
},500)
watch(model, (now) => {
    throttledClamp(now)
})
const props = defineProps({
    label: {
        default: true,
    },
    error: {
        default: false,
    },
    disabled: {
        default: false,
    },
    clamp: {
        default: true
    },
    text: {
        default: "",
        required: true
    },
    step: {
        default: 1
    },
    min: {
        default: 0,
        required: true
    },
    max: {
        default: 100,
        required: true
    },
    restore: {
        default: 0,
        required: true
    }
})
</script>

<style lang="scss" scoped>

</style>