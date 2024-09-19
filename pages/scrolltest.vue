<template lang="pug">
ScrollbarT1
    InputT1RangeText.text-2em(v-model="test" :error="false" :text="'ширина:'" :min="10" :max="1000" :step="1" :restore="100")
    .h-20em.text-20em.w-full.bg-slate-500.overflow-y-hidden.p-0-5em
        p.main-box-shadow test
    p end
</template>

<script setup>
const test = ref(0)
</script>

<style lang="scss" scoped>

</style>