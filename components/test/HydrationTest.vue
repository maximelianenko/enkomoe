<template lang="pug">
.h-1em.w-1em.min-h-1em.min-w-1em(:style="{backgroundColor: color}")
    img(src="/favicon.ico" :onload="test()")
</template>

<script setup>
import _ from "lodash"
const color = ref("rgb(18, 52, 86)")
const props = defineProps(["index"])
function test() {
    if (import.meta.client) {
        console.log("IMAGE LOADED",color.value,props.index)
    }
}
onMounted(() => {
    // console.log(props.index)
    // color.value = `rgb(${_.random(0,255)},${_.random(0,255)},${_.random(0,255)})`
})
</script>

<style lang="scss" scoped>

</style>