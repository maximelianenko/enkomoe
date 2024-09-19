// import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';
export const useNotificationsStore = defineStore('counter', () => {
    const notifications = ref(new Map())
    function add(notification) {
        const key = uuidv4()
        notifications.value.set(key,{...notification, viewed: false})
        return key
    }
    function update(key,field,value) {
        notifications.value.set(key,{[field]:value})
    }
    function remove(key) {
        notifications.value.delete(key)
    }
    function clear() {
        notifications.value.clear()
    }

    return { notifications,add,remove,clear }
})