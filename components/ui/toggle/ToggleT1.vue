<template lang="pug">
component.toggle-type-1.w-max.main-box-shadow.relative.min-w-2-3em.overflow-hidden.relative(
    :is="props.label ? 'label' : 'div'"
)
    input.invisible.absolute.-z-10(v-model="check" :disabled="props.disabled" type="checkbox" @input='emit("toggle",check)')
    .toggle-type-1-bg.h-1-2em.w-2-3em.min-w-2-3em.flex.items-center.bg-amber-300
        Transition(name="fade")
            .absolute.w-full.h-full.bg-amber-300(v-show="!check")
        .toggle-type-1-knob
</template>

<script setup>
const value = ref(true)
const check = defineModel()
const props = defineProps({
    label: {
        default: true,
    },
    disabled: {
        default: false
    }
})
const emit = defineEmits(['toggle'])
// defineModel()
</script>

<style lang="scss" scoped>
.toggle-type-1{
    cursor: pointer;
    &>input:checked{
        &+.toggle-type-1-bg{
            // background: theme("colors.blue.500");
            &>.toggle-type-1-knob{
                &::before {
                    transform: translateX(1.2em);
                    background-color: rgba(0,0,0,255);
                }
            }
        }
    }
    &-knob{
        min-width: 2.3em;
        width: 2.3em;
        height: 1.2em;
        display: flex;
        align-items: center;
        &::before{
            content: "";
            z-index: 1;
            transform: translateX(0.2em);
            transition: transform 0.5s var(--ease-out-expo), background-color 0.25s var(--ease-out-expo);
            left:0;
            width: 0.9em;
            height: 0.9em;
            background-color: rgba(0,0,0,0);
            border: solid black 0.15em;
            // theme("backgroundColor.amber.300")
        }
    }
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