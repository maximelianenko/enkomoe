<template lang="pug">
.relative.flex.flex-col.z-30
    .fixed.right-2em.top-0-2em.flex.flex-nowrap.justify-end
        Icon.w-1-5em.h-1-5em(name="mdi:information-outline")
    TransitionGroup(:css="false" @enter="onEnter" @leave="onLeave")
        .relative.font-normal.flex.flex-col.w-10em.overflow-visible.mb-0-5em.origin-top(
            v-for="(notification,key) in Array.from(notificationsBuffer)"
            :key="key"
            v-show="!notification[1].viewed"
        )
            .main-box-shadow.w-full.h-full
                .flex.flex-col.bg-amber-300.pl-0-4em.pr-0-2em.pb-0-4em
                    .flex.flex-nowrap.justify-between.items-center
                        .flex.flex-nowrap.items-center.gap-0-1em
                            Icon.h-1-3em.w-1-3em(name="mdi:information-circle-outline")
                            p.text-1-2em {{ notification[1].title }}
                        button(@click="handleClick(notification[0])")
                            Icon.h-1-3em.w-1-3em(name="mdi:close")
                    p.leading-1-1em.break-words {{ notification[1].message }}
</template>

<script setup>
import anime from "animejs"
const store = useNotificationsStore()
// if (import.meta.server) {
//     store.add({
//         title: "Гаддем",
//         message: "ЫАААААААААААААААААААААА",
//         error: true,
//     })
// }

// улучшить анимации
function onEnter(el, done) {
    anime.set(el,{height: "unset", transformOrigin: "top"})
    anime({
        targets: el,
        // opacity: [0,1],
        scaleY: [0.5,1],
        scaleX: [0.5,1.1,1],
        // opacity: {
        //     value: [0,1],
        //     duration: 200,
        //     delay:150,
        // },
        marginBottom: ["0em", "0.5em"],
        easing: "easeOutExpo",
        duration: 500,
        complete: () => {
            done()
        }
    })
}
function onLeave(el, done) {
    // иногда оверлаппит но вроде выглядит нормалды
    anime.set(el,{transformOrigin: "center",zIndex: 30})
    // anime({
    //     targets: el,
    //     height: [anime.get(el, "height", "px"), "0px"],
    //     delay:200,
    //     easing: "easeOutExpo",
    //     duration: 500,
    // })
    console.log(el.firstChild)
    // вот это вот гавно переделать надо бы
    anime({
        targets: el.firstChild,
        rotate: [
            {value: [0,-3600], easing: "easeInQuad",delay:100, duration: 2000}
        ], 
    })
    anime({
        targets: el,
        translateY: ["0vh","150vh"],
        easing: "easeInExpo",
        duration: 600,
    })
    anime({
        targets: el,
        height: [anime.get(el, "height", "px") || "200px", "0px"],
        marginBottom: ["0.5em", "0em"],
        easing: "easeOutExpo",
        duration: 500,
        delay: 200,
        complete: () => {
            done()
        }
    })
}
function handleClick(key) {
    const notification = notificationsBuffer.value.get(key)
    notificationsBuffer.value.set(key,{...notification,viewed:true})
    removeTimer(key)
}
function timeout(ms,callback = () => {}) {
    return setTimeout(() => {
        callback()
    }, ms);
}
const notificationsTimers = new Map()
const notificationsBuffer = ref(new Map())
watch(() => store.notifications, (now,old) => {
    const keys = [...store.notifications.keys()]
    for(let key of keys) {
        if (!notificationsTimers.has(key)) {
            let notification = store.notifications.get(key)
            notificationsBuffer.value.set(key,notification)
            notificationsTimers.set(key,timeout(notification.duration || 5000, () => {
                // notificationsBuffer.value.set(key,{...notification,viewed: true})
            }))
        }
    }
    // const keysBuffer = [...notificationsBuffer.value.keys()]
    // if (keys.length > 5) {
    //     const keysLast = keysBuffer.reverse().slice(5)
    //     for (let key of keysLast) {
    //         let notification = notificationsBuffer.value.get(key)
    //         notificationsBuffer.value.set(key,{...notification,viewed: true})
    //         removeTimer(key)
    //     }
    // }
    // if ()
},{immediate:true,deep:true})
// function viewed(key,map) {

// }
function removeTimer(key) {
    if (notificationsTimers.has(key)) {
        clearTimeout(notificationsTimers.get(key))
        notificationsTimers.delete(key)
        return true
    }
    return false
}
// const text = defineModel()
// const props = defineProps({
//     label: {
//         default: true,
//     },
//     error: {
//         default: false
//     },
//     placeholder: {
//         default: ""
//     }
// })

</script>
 
<style lang="scss">
.list-enter-active,
.list-leave-active {
    transition: height 0.5s var(--ease-out-expo);
}
.list-enter-from,
.list-leave-to {
    height: 0px;
}
</style>