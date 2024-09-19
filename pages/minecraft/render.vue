<template lang="pug">
.w-full.h-full.flex.justify-center.items-center.overflow-hidden.font-raleway.font-medium
    ScrollbarT1.font-unbounded.font-light
        .grid
            NotificationsT1.col-start-1.row-start-1.place-self-start.justify-self-end.mr-2em
            .flex.flex-col.items-center.col-start-1.row-start-1
                .relative.flex.flex-col.gap-0-25em.pl-0-5em.pt-1em.pb-1em.pr-2em.max-w-18em
                    .flex.flex-col.p-0-5em.pr-0-5em.pt-0-25em.pb-1em.gap-1em.bg-slate-300.w-full
                        .flex.flex-nowrap
                            Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:content-save-outline")
                            Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:content-save-move-outline")
                        label.flex.flex-col.cursor-text.gap-0-25em
                            .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em
                                Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:texture")
                                p.text-1-3em.truncate скин [.png]
                                //- ErrorT1(:error="form.skin_texture.error" :description="'выберите скин в формате png'")
                            InputT1File.rendering-pixelated(
                                :label="false"
                                :text="'файл'"
                                v-model="form.skin_texture.value"
                                :accept="['image/png']"
                            )
                        .flex.flex-col.gap-0-5em.w-full
                            .flex.flex-nowrap.justify-between.items-center.gap-0-25em.leading-1-8em.w-full
                                Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:format-list-bulleted")
                                p.text-1-3em.truncate.grow тип скина
                                //- ErrorT1(:error="form.skin_type.error")
                            DropdownT1.pl-0-5em.font-normal(v-model="form.skin_type.value")
                                template(#select)
                                    .flex.nowrap.items-center.gap-0-25em.truncate(v-for="(name,index) in skin_types")
                                        p.truncate {{name}}
                        AccordionTU
                            template(#toggle)
                                ToggleCaretTU
                            template(#accordion)
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.w-full
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:image-outline")
                                        p.text-1-3em.truncate рендер
                                        //- ErrorT1(:error="form.width.error || form.height.error")
                                    .flex.flex-col.gap-0-5em.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                        InputT1RangeText(v-model="form.width.value" :error="form.width.error" :text="'ширина:'" :min="10" :max="1000" :step="1" :restore="100")
                                        InputT1RangeText(v-model="form.height.value" :error="form.height.error" :text="'высота:'" :min="10" :max="1000" :step="1" :restore="100")
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.w-full
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:resize")
                                        p.text-1-3em.truncate ресайз
                                        //- ErrorT1(:error="form.resize.error || form.resize_width.error || form.resize_height.error")
                                    .flex.flex-col.gap-0-2em.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                        .flex.flex-nowrap.items-center.gap-0-5em.w-full
                                            //- Icon.h-1em.w-1em.min-w-1em(name="mdi:account")
                                            p.grow.truncate.text-1-1em вкл
                                            //- ButtonT1Restore(v-model="form.resize.value" :restore="true")
                                            ToggleT1(v-model="form.resize.value")
                                        .gap-0-5em.flex.flex-col
                                            InputT1RangeText(v-model="form.resize_width.value" :error="form.resize_width.error" :text="'ширина:'" :min="50" :max="1000" :step="1" :restore="1000")
                                            InputT1RangeText(v-model="form.resize_height.value" :error="form.resize_height.error" :text="'высота:'" :min="50" :max="1000" :step="1" :restore="1000")
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:videocam-outline")
                                        p.text-1-3em.truncate камера
                                        //- ErrorT1(:error=`
                                        //-     form.cam_fov.error ||
                                        //-     form.cam_near.error ||
                                        //-     form.cam_far.error ||
                                        //-     form.cam_pos_x.error ||
                                        //-     form.cam_pos_y.error ||
                                        //-     form.cam_pos_z.error ||
                                        //-     form.cam_rot_x.error ||
                                        //-     form.cam_rot_y.error `
                                        //- )
                                    .flex.flex-col.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                        .flex.flex-col.gap-0-5em
                                            InputT1RangeText(v-model="form.cam_fov.value" :error="form.cam_fov.error" :text="'fov:'" :min="1" :max="360" :step="1" :restore="30")
                                            InputT1RangeText(v-model="form.cam_near.value" :error="form.cam_near.error" :text="'near:'" :min="0.1" :max="100" :step="0.1" :restore="0.1" :clamp="false")
                                            InputT1RangeText(v-model="form.cam_far.value" :error="form.cam_far.error" :text="'far:'" :min="1" :max="1000" :step="1" :restore="1000")
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-z-rotate-counterclockwise")
                                        p.text-1-3em.truncate поворот
                                        //- ErrorT1(:error="form.cam_rot_x.error || form.cam_rot_y.error")
                                    .flex.flex-col.gap-0-5em.pl-0-5em.pl-0-9em.pr-0-2em.pt-0-1em.pb-0-5em
                                        InputT1RangeText(v-model="form.cam_rot_x.value" :error="form.cam_rot_x.error" :text="'x:'" :min="-360" :max="360" :step="1" :restore="0")
                                        InputT1RangeText(v-model="form.cam_rot_y.value" :error="form.cam_rot_y.error" :text="'y:'" :min="-360" :max="360" :step="1" :restore="0")
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-arrow")
                                        p.text-1-3em.truncate позиция
                                        //- ErrorT1(:error="form.cam_pos_x.error || form.cam_pos_y.error || form.cam_pos_z.error")
                                    .flex.flex-col.gap-0-5em.pl-0-9em.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                        InputT1RangeText(v-model="form.cam_pos_x.value" :error="form.cam_pos_x.error" :text="'x:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                        InputT1RangeText(v-model="form.cam_pos_y.value" :error="form.cam_pos_y.error" :text="'y:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                        InputT1RangeText(v-model="form.cam_pos_z.value" :error="form.cam_pos_z.error" :text="'z:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                template(toggle="false")
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:box-variant-closed")
                                        p.text-1-3em.truncate объект
                                        //- ErrorT1(:error=`
                                        //-     form.mod_rot_x.error ||
                                        //-     form.mod_rot_y.error ||
                                        //-     form.mod_pos_x.error ||
                                        //-     form.mod_pos_y.error ||
                                        //-     form.mod_pos_z.error `
                                        //- )
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-z-rotate-counterclockwise")
                                        p.text-1-3em.truncate поворот
                                        //- ErrorT1(:error="form.mod_rot_x.error || form.mod_rot_y.error")
                                    .flex.flex-col.gap-0-5em.pl-0-5em.pl-0-9em.pr-0-2em.pt-0-1em.pb-0-5em
                                        InputT1RangeText(v-model="form.mod_rot_x.value" :error="form.mod_rot_x.error" :text="'x:'" :min="-360" :max="360" :step="1" :restore="0")
                                        InputT1RangeText(v-model="form.mod_rot_y.value" :error="form.mod_rot_y.error" :text="'y:'" :min="-360" :max="360" :step="1" :restore="-15")
                                template
                                    .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                        Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-arrow")
                                        p.text-1-3em.truncate позиция
                                        //- ErrorT1(:error="form.mod_pos_x.error || form.mod_pos_y.error || form.mod_pos_z.error")
                                    .flex.flex-col.gap-0-5em.pl-0-9em.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                        InputT1RangeText(v-model="form.mod_pos_x.value" :error="form.mod_pos_x.error" :text="'x:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                        InputT1RangeText(v-model="form.mod_pos_y.value" :error="form.mod_pos_y.error" :text="'y:'" :min="-10" :max="10" :step="0.1" :restore="0.25")
                                        InputT1RangeText(v-model="form.mod_pos_z.value" :error="form.mod_pos_z.error" :text="'z:'" :min="-10" :max="10" :step="0.1" :restore="1.25")
                        .flex.flex-nowrap.items-center.gap-0-25em.justify-end
                            //- .min-w-1-2em
                            //-     ErrorT1(:error="form.button.error.value" :description="form.button.error.message")
                            ButtonT1.min-w-max.pl-0-5em.pr-0-5em(@click="handleGetSkinButton()" :text="'рендер'")
                        //- .flex.flex-col.gap-0-25em
                        //- .absolute.w-full.h-full.bg-black
                    //- input(type="checkbox" v-model="form.something.value")
                    ImageT1.w-full.aspect-square(:src="image")
                //- .h-25em.text-5em
                p END
</template>

<script setup>
import axios from "axios"
const store = useNotificationsStore()
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
onMounted(() => {
    store.add({
        title: "Гаддем",
        message: "блять сервак лег нахуй",
        error: true,
    })
    setTimeout(() => {
        for (let i = 1; i <= 10; i++) {
            _.delay(() => {
                store.add({
                    title: "Гаддем",
                    message: uuidv4(),
                    error: true,
                })
            }, 200 * i, i);
        }
    }, 500);
    setTimeout(() => {
            console.log(store.notifications)
    }, 9000);
    // setTimeout(() => {
    //     notificationBuffer.value.delete(Array.from(notificationBuffer.value)[0][0])
    // }, 1000);
})
const skin_types = ref(['алекс','стив','стив 64x32'])
const skin_types_api = ["alex","steve","steve_old"]
const form = reactive({
        width: {value:100,error:false},
        height: {value:100,error:false},
        resize: {value:true,error:false},
        resize_width: {value:1000,error:false},
        resize_height: {value:1000,error:false},
        skin_type: {value:0,error:false},
        cam_fov: {value:30,error:false},
        cam_near: {value:0.1,error:false},
        cam_far: {value:1000,error:false},
        cam_pos_x: {value:0.0,error:false},
        cam_pos_z: {value:0.0,error:false},
        cam_pos_y: {value:0.0,error:false},
        cam_rot_x: {value:0.0,error:false},
        cam_rot_y: {value:0.0,error:false},
        mod_pos_x: {value:0.0,error:false},
        mod_pos_y: {value:0.25,error:false},
        mod_pos_z: {value:1.25,error:false},
        mod_rot_x: {value:0.0,error:false},
        mod_rot_y: {value:-15.0,error:false},
        skin_texture: {value:"",error:false},
        button: {error: {value: false, message: ""}}
    })
// form.mod_pos_x.error = true
const image = ref("")
const something = ref(true)
// watch(file,() => {
//     console.log(file.value)
// })
async function handleGetSkinButton() {
    console.log("TEST")
    const skinResult = await getSkin()
    // // button.error = true
    // if (!skinResult) {
    //     form.button.error = true
    // }
}

function _arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function getSkin() {
    const data = new FormData()
    // data.append('skin_texture', form.file_value.value)
    // data.append('resize', form.resize.value)
    if (!form.skin_texture.value) {

        // надо въебать уведомления ыаааааааааааааааааЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ
        // переделать нормально епта
        form.skin_texture.error = true
        form.button.error.value = true
        form.button.error.message = "выберите скин"
        return false
    }
    form.skin_texture.error = false

    data.append('width', form.width.value)
    data.append('height', form.height.value)
    data.append('resize', form.resize.value)
    data.append('resize_width', form.resize_width.value)
    data.append('resize_height', form.resize_height.value)
    console.log(skin_types_api[form.skin_type.value])
    data.append('skin_type', skin_types_api[form.skin_type.value])
    data.append('fov', form.cam_fov.value)
    data.append('near', form.cam_near.value)
    data.append('far', form.cam_far.value)
    data.append('cam_pos_x', form.cam_pos_x.value)
    data.append('cam_pos_z', form.cam_pos_z.value)
    data.append('cam_pos_y', form.cam_pos_y.value)
    data.append('cam_rot_x', form.cam_rot_x.value)
    data.append('cam_rot_y', form.cam_rot_y.value)
    data.append('mod_pos_x', form.mod_pos_x.value)
    data.append('mod_pos_y', form.mod_pos_y.value)
    data.append('mod_pos_z', form.mod_pos_z.value)
    data.append('mod_rot_x', form.mod_rot_x.value)
    data.append('mod_rot_y', form.mod_rot_y.value)
    data.append('texture', form.skin_texture.value)

    try {
        const response = await axios.post(
            'http://127.0.0.1:3000/v1',
            data,{responseType:"arraybuffer",responseEncoding:"image/png",timeout: 2000}
        )
        console.log(response.data)
        image.value = "data:image/png;base64," + _arrayBufferToBase64(response.data)
    }
    catch (error) {
        // ыыыыы D;
        console.log(error)
        if (error.code === "ECONNABORTED") {
            form.button.error.value = true
            form.button.error.message = "Сервер не ответил за 2000мс"
            return
        }
        if (error.response.status === 400) {
            console.log(error.response.data)
            return
        }
        if (error.response.status !== 200) {
            form.button.error.value = true
            form.button.error.message = "Ошибка со стороны сервера"
            return
        }
    }
    // console.log(new File([response.data], "something", { type: mimeType }))
}


function log(event) {
    // console.log("LOG:",event)
}

</script>

<style lang="scss">
.rendering-pixelated { image-rendering: pixelated; }
// * {
//     // background-color: rgba(0,0,0,1);
//     border: solid 1px red;
    
// }
</style>