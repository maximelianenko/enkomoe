<template lang="pug">
.grid
  //- NuxtImg.col-start-1.row-start-1.h-full.w-full.object-cover(:src="src" v-show="!isLoading" @load="load()" key="1")
  TransitionGroup(name="fade")
    .bg-black.col-start-1.row-start-1.overflow-hidden(v-for="(image,index) in images" :key="index")
      img.object-cover.object-center.w-full.h-full(:src="image.src" v-show="image.show" @load="load(index)")
</template>

<script setup>
import _ from "lodash"
const props = defineProps({
  "src": {
    required: true
  },
  height: {
    default: "100%",
    height: "100%"
  }
})
const images = ref([])
function addImage() {
  images.value.push({
    src: props.src,
    show: false
  })
}
watch(() => props.src, (now) => {
  addImage()
}, {
  immediate: true
})
// onMounted(() => {
//   addImage()
// })
const removePrevImages = _.debounce(() => {
  setTimeout(() => {
    const len = images.value.length-1
    for(let i = 0; i < len; i++) {
      images.value.shift()
    }
  }, 1000);
},500)
function load(index) {
  if (images.value[index]) {
      images.value[index].show = true
  }
  removePrevImages()
}
  // console.log("laodiaed")
  // setTimeout(() => {
  //   isLoading.value = false
  // }, 400);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>