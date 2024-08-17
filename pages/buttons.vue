<template lang="pug">
    
.w-full.h-full.flex.justify-center.items-center.overflow-hidden.font-raleway.font-medium
    Scrollenko.w-full.font-unbounded.font-light
        .flex.flex-col.gap-0-25em.pl-0-5em.pt-1em.pb-1em.pr-2em.max-w-18em
            .flex.flex-col.gap-0-25em.items-center
                .flex.flex-col.p-0-5em.pr-0-5em.pt-0-25em.pb-1em.gap-1em.bg-slate-300.w-full
                    //- InputT1Range.w-full.font-normal(v-model="form.range.value")
                    //- InputT1Text.max-w-8em.font-normal(v-model="form.range.value" :error="true" :placeholder="'РЕАНggggррр'")
                    //- ButtonT1.max-w-max(@click="log($event)" :text="'АЫФВЫФАЦУДЗХЪФХЙЦЪ/'")
                    //- ButtonT1.max-w-max(@click="log($event)" :text="'РЕАУЦКУggggрррр'")
                    //- ToggleT1(v-model="form.check.value")
                    //- ToggleT1Text.max-w-max.font-normal(v-model="form.check.value" :text="'toggle'")
                    //- InputT1Text.max-w-8em.font-normal(v-model="form.text.value" :error="true" :placeholder="'РЕАНggggррр'")
                    //- InputT1Text.max-w-8em.font-normal(v-model="form.text.value" :error="true" :placeholder="'рено логан'")
                    //- InputT1Text.max-w-8em.font-normal(v-model="form.text.value" :error="false" :placeholder="'парол'")
                    //- label.flex.flex-col.cursor-text.gap-0-5em
                    //-     .flex.flex-nowrap.items-center.gap-0-1em
                    //-         Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:asterisk")
                    //-         p.text-1-3em.truncate парльааыафааааааа
                    //-     InputT1Text(
                    //-         v-model="form.text.value"
                    //-         :error="true"
                    //-         :label="false"
                    //-     )
                    //- label.flex.flex-nowrap.items-center.gap-0-25em.cursor-pointer.font-normal
                    //-     Icon.h-1em.w-1em.min-w-1em(name="mdi:account")
                    //-     p.select-none.grow.truncate ф1
                    //-     ToggleT1(v-model="form.check.value" :label="false")
                    //- label.flex.flex-nowrap.items-center.gap-0-25em.cursor-pointer.w-full.font-normal
                    //-     Icon.h-1em.w-1em.min-w-1em(name="mdi:account")
                    //-     p.select-none.grow.truncate ф2
                    //-     ToggleT1(v-model="form.check.value" :label="false")
                    //- ToggleT1Text.w-full.font-normal(v-model="form.check.value" :text="'ф3'")
                    //- label.flex.flex-col.cursor-text.gap-0-5em
                    //-     .flex.flex-nowrap.items-end.gap-0-1em.leading-1-8em
                    //-         Icon.h-1-5em.w-1-5em.min-h-1-5em(name="mdi:mail-ru")
                    //-         p.text-1-5em.truncate почта
                    //-     InputT1Text(
                    //-         v-model="form.text.value"
                    //-         :error="false"
                    //-         :label="false"
                    //-     )
                                                //- InputT1Range.w-2-3em.min-w-2-3em(
                            //-     v-model="form.range.value"
                            //-     :label="false"
                            //-     :step="1"
                            //-     :min="0"
                            //-     :max="6"
                            //- )
                        //- SelectTU.pl-0-5em.font-normal(v-model="form.range.value")
                        //-     template(#select)
                        //-         .flex.nowrap.items-center.gap-0-25em.truncate(v-for="(name,index) in elements")
                        //-             Icon.h-1-2em.w-1-2em.min-w-1-2em(name="mdi:subdirectory-arrow-right")
                        //-             p.truncate {{name}}
                        //-         .flex.nowrap.items-center.gap-0-25em.truncate
                        //-             Icon.h-1-2em.w-1-2em.min-w-1-2em(name="mdi:subdirectory-arrow-right")
                        //-             p.truncate n2
                        //-         .flex.nowrap.items-center.gap-0-25em.truncate
                        //-             Icon.h-1-2em.w-1-2em.min-w-1-2em(name="mdi:subdirectory-arrow-right")
                        //-             p.truncate n3
                        //-     template(#toggle)
                        //-         ToggleT1

                    label.flex.flex-col.cursor-text.gap-0-25em
                        .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em
                            Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:texture")
                            p.text-1-3em.truncate скин [.png]
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
                                    ErrorT1(:error="form.width.error || form.height.error")
                                .flex.flex-col.gap-0-5em.pl-0-5em.pr-0-1em.pt-0-1em.pb-0-5em
                                    InputT1RangeText(v-model="form.width.value" :error="form.width.error" :text="'ширина:'" :min="10" :max="1000" :step="1" :restore="100")
                                    InputT1RangeText(v-model="form.height.value" :error="form.height.error" :text="'высота:'" :min="10" :max="1000" :step="1" :restore="100")
                            template
                                .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.w-full
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:resize")
                                    p.text-1-3em.truncate ресайз
                                    ErrorT1(:error="form.resize.error || form.resize_width.error || form.resize_height.error")
                                .flex.flex-col.gap-0-2em.pl-0-5em.pr-0-1em.pt-0-1em.pb-0-5em
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
                                    ErrorT1(:error=`
                                        form.cam_fov.error ||
                                        form.cam_near.error ||
                                        form.cam_far.error ||
                                        form.cam_pos_x.error ||
                                        form.cam_pos_y.error ||
                                        form.cam_pos_z.error ||
                                        form.cam_rot_x.error ||
                                        form.cam_rot_y.error`
                                    )
                                .flex.flex-col.pl-0-5em.pr-0-1em.pt-0-1em.pb-0-5em
                                    .flex.flex-col.gap-0-5em
                                        InputT1RangeText(v-model="form.cam_fov.value" :error="form.cam_fov.error" :text="'fov:'" :min="1" :max="360" :step="1" :restore="30")
                                        InputT1RangeText(v-model="form.cam_near.value" :error="form.cam_near.error" :text="'near:'" :min="0.1" :max="100" :step="0.1" :restore="0.1" :clamp="false")
                                        InputT1RangeText(v-model="form.cam_far.value" :error="form.cam_far.error" :text="'far:'" :min="1" :max="1000" :step="1" :restore="1000")
                            template
                                .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-z-rotate-counterclockwise")
                                    p.text-1-3em.truncate поворот
                                    ErrorT1(:error="form.cam_rot_x.error || form.cam_rot_y.error")
                                .flex.flex-col.gap-0-5em.pl-0-5em.pl-0-9em.pr-0-2em.pt-0-1em.pb-0-5em
                                    InputT1RangeText(v-model="form.cam_rot_x.value" :error="form.cam_rot_x.error" :text="'x:'" :min="-360" :max="360" :step="1" :restore="0")
                                    InputT1RangeText(v-model="form.cam_rot_y.value" :error="form.cam_rot_y.error" :text="'y:'" :min="-360" :max="360" :step="1" :restore="0")
                            template
                                .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-arrow")
                                    p.text-1-3em.truncate позиция
                                    ErrorT1(:error="form.cam_pos_x.error || form.cam_pos_y.error || form.cam_pos_z.error")
                                .flex.flex-col.gap-0-5em.pl-0-9em.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                    InputT1RangeText(v-model="form.cam_pos_x.value" :error="form.cam_pos_x.error" :text="'x:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                    InputT1RangeText(v-model="form.cam_pos_y.value" :error="form.cam_pos_y.error" :text="'y:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                    InputT1RangeText(v-model="form.cam_pos_z.value" :error="form.cam_pos_z.error" :text="'z:'" :min="-10" :max="10" :step="0.1" :restore="0")
                            template(toggle="false")
                                .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:box-variant-closed")
                                    p.text-1-3em.truncate объект
                                    ErrorT1(:error=`
                                        form.mod_rot_x.error ||
                                        form.mod_rot_y.error ||
                                        form.mod_pos_x ||
                                        form.mod_pos_y ||
                                        form.mod_pos_z`
                                    )
                            template
                                .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-z-rotate-counterclockwise")
                                    p.text-1-3em.truncate поворот
                                    ErrorT1(:error="form.mod_rot_x.error || form.mod_rot_y.error")
                                .flex.flex-col.gap-0-5em.pl-0-5em.pl-0-9em.pr-0-2em.pt-0-1em.pb-0-5em
                                    InputT1RangeText(v-model="form.mod_rot_x.value" :error="form.mod_rot_x.error" :text="'x:'" :min="-360" :max="360" :step="1" :restore="0")
                                    InputT1RangeText(v-model="form.mod_rot_y.value" :error="form.mod_rot_y.error" :text="'y:'" :min="-360" :max="360" :step="1" :restore="-15")
                            template
                                .flex.flex-nowrap.items-center.gap-0-25em.leading-1-8em.pl-0-4em
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:subdirectory-arrow-right")
                                    Icon.h-1-3em.w-1-3em.min-w-1-3em(name="mdi:axis-arrow")
                                    p.text-1-3em.truncate позиция
                                    ErrorT1(:error="form.mod_pos_x.error || form.mod_pos_y.error || form.mod_pos_z.error")
                                .flex.flex-col.gap-0-5em.pl-0-9em.pl-0-5em.pr-0-2em.pt-0-1em.pb-0-5em
                                    InputT1RangeText(v-model="form.mod_pos_x.value" :error="form.mod_pos_x.error" :text="'x:'" :min="-10" :max="10" :step="0.1" :restore="0")
                                    InputT1RangeText(v-model="form.mod_pos_y.value" :error="form.mod_pos_y.error" :text="'y:'" :min="-10" :max="10" :step="0.1" :restore="0.25")
                                    InputT1RangeText(v-model="form.mod_pos_z.value" :error="form.mod_pos_z.error" :text="'z:'" :min="-10" :max="10" :step="0.1" :restore="1.25")
                    //- .flex.flex-col.gap-0-25em
                //- input(type="checkbox" v-model="form.something.value")
                ButtonT1.w-full(@click="getSkin()" :text="'get'")
                img(:src="image")
        //- .h-25em.text-5em
        p END
</template>

<script setup>
import axios from "axios"
const skin_types = ref(['алекс','стив','стив 64x32'])
const form = reactive({
        width: {value:100,error:false},
        height: {value:100,error:false},
        resize: {value:true,error:false},
        resize_width: {value:1000,error:false},
        resize_height: {value:1000,error:false},
        skin_type: {value:1,error:false},
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
    })
form.mod_pos_x.error = true
const image = ref("")
const something = ref(true)
// watch(file,() => {
//     console.log(file.value)
// })
function _arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa( binary );
}
// function checkAndAppend() {
    
// }
async function getSkin() {
    const data = new FormData()
    // data.append('skin_texture', form.file_value.value)
    // data.append('resize', form.resize.value)
    data.append('width', form.width.value)
    data.append('height', form.height.value)
    data.append('resize', form.resize.value)
    data.append('resize_width', form.resize_width.value)
    data.append('resize_height', form.resize_height.value)
    data.append('skin_type', skin_types.value[form.skin_type.value])
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
    // if (!form.skin_texture.value) {
    //     console.warn("no skin texture")
    //     return "no skin_texture"
    // }
    data.append('skin_texture', form.skin_texture.value)

    const response = await axios.post('https://render.api.enko.moe/v1', data,{responseType:"arraybuffer",responseEncoding:"image/png"})
    console.log(response.data)
    image.value = "data:image/png;base64," + _arrayBufferToBase64(response.data)
    // console.log(new File([response.data], "something", { type: mimeType }))
}


function log(event) {
    console.log("LOG:",event)
}

</script>

<style lang="scss">
.rendering-pixelated { image-rendering: pixelated; }
// * {
//     // background-color: rgba(0,0,0,1);
//     border: solid 1px red;
    
// }
</style>