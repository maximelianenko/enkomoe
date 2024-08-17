<template lang="pug">
.flex.flex-col.gap-0-5em.w-full
    //- component(:is="slotBeforeAccordion || 'div'")
    .w-full(v-for="(item,key) in slotAccordionItems")
        label.cursor-pointer.flex.flex-nowrap.gap-0-5em.justify-between.items-center(v-if="item.toggle")
            component.min-w-0(:is="item.header")
            component(:is="slotToggle" :label="false" v-model="item.open")
        component.min-w-0(:is="item.header" v-else)
        .flex.flex-col.transition-max-height.overflow-hidden(ref="elements" :style="{maxHeight: `${!item.open ? 0 : elementsHeight[key]}px`}")
            component(v-for="element in item.elements" :is="element")
    //- .flex.flex-nowrap
        .grow
        button
            Icon.min-w-1-3em.h-1-3em.w-1-3em(name="mdi:restore")
            Icon.min-w-1-3em.h-1-3em.w-1-3em(name="mdi:close")
</template>

<script setup>
import _ from "lodash"
// import { isVNode } from "vue";
const slots = useSlots()

const elements = ref()
const elementsHeight = ref([])
function updateHeight() {
    if (elements.value) {
        elementsHeight.value = elements.value.map((el) =>  {
            return el.scrollHeight
        })
    }
}
// сделать череp resize observer
const updateHeightThrottled = _.throttle(async () => {
    await nextTick()
    // console.log("updated") 
    updateHeight()
},500)
const slotAccordion = computed(() => {
    return typeof slots.accordion === "function" ? slots.accordion.call() : []
})

const slotToggle = computed(() => {
    return (typeof slots.toggle === "function" ? slots.toggle.call() : [])[0]
})

const slotAccordionItems = ref([])
watch(slotAccordion,() => {
    let items = []
    for(let item of slotAccordion.value) {
        // check if item is v-for (mb something else idk)
        if (item.type === Symbol.for("v-fgt")) {
            for(let child of item.children) {
                items.push(child)
            }
            continue
        }
        items.push(item)
    }

    for(const [index,item] of items.entries()) {
        if (!item.children || item.children.length < 1) {
            continue
        }
        // isVNode() if something breaks
        if (slotAccordionItems.value?.[index]?.header) {
            slotAccordionItems.value[index].header = item.children[0]
            slotAccordionItems.value[index].elements = item.children.slice(1)
        } else {
            let open = false
            let open_value = item?.props?.open
            if (open_value == "true" || open_value === "") {
                open = true
            }
            let toggle = true
            let toggle_value = item?.props?.toggle
            if (toggle_value === "false") {
                toggle = false
            }
            console.log(item?.props?.toggle)
            slotAccordionItems.value.push({
                open,
                toggle,
                header: item.children[0],
                elements: item.children.slice(1)
            })
        }
    }
    // console.log(slotAccordionItems.value)
},{immediate:true})

watch(slotAccordion, () => updateHeightThrottled(),{immediate:true})

onMounted(() => {
    updateHeight()
})
// const model = defineModel()

// function toggle(index) {
//     // console.log(slotAccordionItems[index])
//     slotAccordionItems.value[index].open = !slotAccordionItems.value[index].open
//     // element.open = !element.open
//     // console.log(index)
//     // const element = slotAccordionItems[index]
//     // console.log(slotAccordionItems[index])
//     // element?.open = true
//     // for(let key of Object.keys(toggles.value)) {
//     //     let toggle = toggles.value[key]
//     //     toggle.model = false
//     //     toggle.disabled = false
//     //     if (key == index) {
//     //         toggle.disabled = true
//     //         if (!toggle.model) {
//     //             toggle.model = true
//     //             model.value = key
//     //         }
//     //     }

//     // }
// }
// const currentValue = computed(() => {
//     console.log("model", model.value,slotAccordionItems.value.length-1)
//     console.log("length",_.clamp(model.value, 0, slotAccordionItems.value.length-1))
//     return _.clamp(model.value, 0, slotAccordionItems.value.length-1)
// })
// watch(model,() => {
//     console.log("MODEL", model.value)
// })
// переделать toggles с computed на watch и чекать длину массива
// watch(slotAccordionItems, () => {
    
// })
// const toggles = computed(() => {
//     let result = []
//     if (slotAccordionItems.value.length < 1) {
//         return result
//     }
//     for (let i = 0; i < slotAccordionItems.value.length; i++) {
//         result.push({
//             disabled: false,
//             model: false
//         })
//     }

//     // result[currentValue.value].model = true
//     // result[currentValue.value].disabled = true

//     return reactive(result)
// })
</script>

<style lang="scss" scoped>
.transition-max-height {
    transition: max-height 0.6s var(--ease-out-expo);
}
</style>