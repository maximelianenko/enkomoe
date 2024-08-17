class SlotHelper {
    constructor(slots) {
        this.slots = slots
    }
    exists(name) {
        const slots = this.slots
        if (slots[name] !== undefined) {
            return true
        }
        return false
    }
    list() {
        const slots = this.slots
        return Object.keys(slots)
    }
}
export default SlotHelper