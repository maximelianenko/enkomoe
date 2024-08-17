<template lang="pug">
.flex.flex-col.gap-0-5em
    .flex.flex-col.dropdown-type-1.cursor-pointer
        .bg-amber-300.main-box-shadow.w-full.pl-0-5em.pr-0-75em.relative.grid.overflow-clip
            TransitionGroup(:name="currentValue > prevValue ? 'show-from-bottom' : 'show-from-top'")
                .col-start-1.row-start-1.flex.flex-nowrap.items-center.h-1-2em(v-for="(item,index) in slotSelectItemsClone" :key="item.ctx.uid + index" v-show="index === currentValue")
                    component.grow(:is="item")
                    p {{ index+1 }}
        .relative.top-0.left-0.dropdown-type-1-element
            .absolute.w-full.pt-0-75em
                .flex.flex-col.bg-amber-300.pr-0-75em.pl-0-5em.pt-0-25em.pb-0-5em.main-box-shadow
                    //- TransitionGroup(name="fade")
                    .flex.flex-nowrap.items-center(v-for="(item,index) in slotSelectItems" :key="index")
                        label.flex.flex-nowrap.items-center.gap-0-25em.cursor-pointer.w-full
                            input.invisible.absolute.-z-10(type="button" @click="click(index)")
                            component.select-none.grow(:is="item")
                            p.leading-none {{ index+1 }}
                            //- p {{ currentItem.children[1].children }}
            //- component(:is="slotToggle[0]" @toggle="toggle(key)" :label="false" :disabled="value.disabled" v-model="value.model")

</template>

<script setup>
import _ from "lodash"
const slots = useSlots()

const slotSelect = computed(() => {
    console.log("slotSelect")
    return typeof slots.select === "function" ? slots.select.call() : []
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
    console.log(items)
    // updateKey.value = updateKey.value
    return items
 
})
// without clone components doesn't render idk
const slotSelectItemsClone = computed(() => {
    return slotSelectItems.value.map((item) => {
        return h(
            item.type,
            item.props,
            item.children.map((child) => {
                return h(child.type,child.props,child.children)
            })
        )
    })
})

const model = defineModel()
const props = defineProps({
    label: {
        default: true,
    },
})


function click(index) {
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
// for animation direction
const prevValue = ref(0)
watch(currentValue,(now,old) => {
    prevValue.value = old
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
// onMounted(() => {
//     console.log(currentItem.value)
// })
</script>

<style lang="scss" scoped>
.dropdown-type-1{
    &-element{
        transition: 
            opacity 0.1s var(--ease-in-out-quad),
            transform 0.5s var(--ease-out-expo);
        transform: translateY(-0.5em);
        opacity: 0;
        pointer-events: none;
        z-index: 20;
    }
    &:hover{
        .dropdown-type-1-element{
            pointer-events: all;
            opacity: 100;
            transform: translateY(0em);
        }
    }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.show-from-top-enter-active,
.show-from-top-leave-active {
    transition: opacity 0.2s var(--ease-in-out-quad),transform 0.5s var(--ease-out-expo);
}
.show-from-top-enter-from,
.show-from-top-leave-to {
  opacity: 0;
}
.show-from-top-enter-from{
    transform: translateY(-2em);
}
.show-from-top-leave-to{
    transform: translateY(2em);
}

.show-from-bottom-enter-active,
.show-from-bottom-leave-active {
    transition: opacity 0.05s var(--ease-in-out-quad),transform 0.5s var(--ease-out-expo);
}
.show-from-bottom-enter-from,
.show-from-bottom-leave-to {
  opacity: 0;
}
.show-from-bottom-enter-from{
    transform: translateY(2em);
}
.show-from-bottom-leave-to{
    transform: translateY(-2em);
}
</style>