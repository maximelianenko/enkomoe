<template lang="pug">
.flex.flex-col.gap-0-5em
    .flex.flex-nowrap.items-center(v-for="(value,key) in toggles")
        label.flex.flex-nowrap.items-center.gap-0-25em.cursor-pointer.w-full
            component.select-none.grow(:is="slotSelectItems[key]")
            component(:is="slotToggle" @toggle="toggle(key)" :label="false" :disabled="value.disabled" v-model="value.model")

</template>

<script setup>
import _ from "lodash"
const slots = useSlots()

const slotSelect = computed(() => {
    return typeof slots.select === "function" ? slots.select.call() : []
})
const slotToggle = computed(() => {
    return (typeof slots.toggle === "function" ? slots.toggle.call() : [])[0]
})

const slotSelectItems = computed(() => {
    let items = []
    for(let item of slotSelect.value) {
        // check if item is v-for (mb something else idk)
        if (item.type === Symbol.for("v-fgt")) {
            for(let child of item.children) {
                items.push(child)
            }
            continue
        }
        items.push(item)
    }
    // updateKey.value = updateKey.value
    return items

})

const model = defineModel()
const props = defineProps({
    label: {
        default: true,
    }
})
// onMounted(() => {
//     console.log(slotSelect)
// })
// watch(model, () => {
//     toggle(_.clamp(model.value, 0, slotSelectItems.length-1))
// })

function toggle(index) {
    for(let key of Object.keys(toggles.value)) {
        let toggle = toggles.value[key]
        toggle.model = false
        toggle.disabled = false
        if (key == index) {
            toggle.disabled = true
            if (!toggle.model) {
                toggle.model = true
                model.value = key
            }
        }

    }
}
const currentValue = computed(() => {
    return _.clamp(model.value, 0, slotSelectItems.value.length-1)
})
const toggles = computed(() => {
    let result = []
    if (slotSelectItems.value.length < 1) {
        return result
    }
    for (let i = 0; i < slotSelectItems.value.length; i++) {
        result.push({
            disabled: false,
            model: false
        })
    }

    result[currentValue.value].model = true
    result[currentValue.value].disabled = true

    return reactive(result)
})
// const toggles = computed(() => {
//     let result = []
//     if (slotSelectItems.length < 1) {
//         return result
//     }
//     for (let i = 0; i < slotSelectItems.length; i++) {
//         result.push({
//             disabled: false,
//             model: false
//         })
//     }

//     let initialValue = _.clamp(model.value, 0, slotSelect.length-1)
//     result[initialValue].model = true
//     result[initialValue].disabled = true

//     return reactive(result)
// })

</script>

<style lang="scss" scoped>

</style>