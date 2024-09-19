<template lang="pug">
component.relative.main-box-shadow.cursor-pointer.flex.flex-col.justify-between.gap-0-2em.pt-0-1em.pb-0-2em.bg-amber-300.pl-0-25em.pr-0-25em.flex.justify-center.items-center(
    :is="props.label ? 'label' : 'div'"
    ref="drop"
)
    Transition(name="fade")
        .absolute.w-full.h-full.bg-gradient-to-r.from-red-500.to-red-800.top-0.left-0(
            v-show="error"
        )
    .pt-0-5em.pb-0-25em.grid.grid-cols-1.grid-rows-1.relative
        .flex.w-full.col-start-1.row-start-1
            .h-4em.w-4em.shrink.border-dotted.border-0-2em
        .flex.w-full.col-start-1.row-start-1
            .grid.bg-black.mt-0-5em.ml-0-5em
                .h-4em.w-4em.col-start-1.row-start-1.flex.justify-center.items-center
                    Icon.h-2em.w-2em.text-white(name="mdi:image-filter-hdr")
                Transition(name="fade")
                    ImageT1.h-4em.w-4em.col-start-1.row-start-1(v-if="imagePreview" :src="imagePreview")
            //- Icon.h-2em.w-2em.text-white.absolute.bottom-0.right-0(name="mdi:cursor-default")
    .flex.flex-nowrap.truncate.w-full.justify-center.relative
        input.relative.-z-10.max-w-0.max-h-0.invisible(
            :required="props.required"
            type="file"
            @change="updateFileEvent($event)"
        )
        p.text-black.font-medium.h-1em.leading-0-9em.font-normal.truncate {{ currentFileName ? currentFileName : props.text }}
        //- .min-w-1em.h-1em.w-1em.flex.justify-center.items-center.relative.text-black
            Icon(v-if="!file" name="mdi:plus-bold")
            Icon(v-else name="mdi:edit")

</template>

<script setup>
const imagePreview = ref()
const file = defineModel()
const error = defineModel("error")
// defim

const props = defineProps({
    required: {
        default: false,
    },
    label: {
        default: true,
    },
    accept: {
        default: "*"
    },
    text: {
        default: ""
    },
})

const drop = ref()
function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}
onMounted(() => {

    drop.value.addEventListener("dragenter", (event) => {
        preventDefaults(event)
    }, false)
    drop.value.addEventListener("dragover", (event) => {
        preventDefaults(event)
    }, false)
    drop.value.addEventListener("dragleave", (event) => {
        preventDefaults(event)
    }, false)

    drop.value.addEventListener("drop", (event) => {
        preventDefaults(event)
        updateFile(event?.dataTransfer?.files?.[0])
    })
})
const currentFile = ref([]);
const currentFileName = computed(() => {
    const currentFileName = file.value?.name
    if (currentFileName) {
        return currentFileName
    }
    return ""
})
const isFileExists = computed(() => {
    return file.value instanceof File
})

function errorClear() {
    error.value = false
}
function errorSet() {
    error.value = true
}
function updateFileEvent(event) {
    updateFile(event.target.files[0])
}
function fileSet(fileItem) {
    // console.log(file)
    if (fileItem instanceof File) {
        file.value = fileItem
        return true
    }
    return false
}
function fileClear() {
    file.value = undefined
}

function updateFile(fileItem) {
    if (props.accept === "*" || Array.isArray(props.accept) && props.accept.includes(fileItem?.type)) {
        if (fileSet(fileItem)) {
            errorClear()
            return
        }
        fileClear()
        return
    }
    errorSet()
    fileClear()
    return
}
// image/png
function isImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}
watch(file, () => {
    if (file.value instanceof File && isImage(file.value)) {
        imagePreview.value = URL.createObjectURL(file.value)
        return
    }
    imagePreview.value = ""
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s var(--ease-out-expo);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>