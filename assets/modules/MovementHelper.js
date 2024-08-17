class MovementHelper {
    constructor(directions) {
        if (directions && typeof directions === "object") {
            this.directions = directions
        } else {
            this.directions = {
                "l": [180,-180],
                "tl": -135,
                "t": -90,
                "tr": -45,
                "r": 0,
                "br": 45,
                "b": 90,
                "bl": 135,
            }
        }
    }
    degree(x1,x2,y1,y2) {
        const y = y2-y1, x = x2-x1
        // console.log(y,x)
        return Math.atan2(y,x) / Math.PI * 180
    }
    direction(degree, degreeSensitivity = 45) {
        const directionInDegrees = Math.round(degree / degreeSensitivity) * degreeSensitivity
        const directions = this.directions
        for(let dir of Object.keys(directions)) {
            const dirVal = directions[dir]
            if (Array.isArray(dirVal)) {
                for(let val of dirVal) {
                    if (directionInDegrees === val) {
                        return dir
                    }
                }
            } else if (typeof dirVal === "number") {
                if (directionInDegrees === dirVal) {
                    return dir
                }
            }
        }
        return null
    }
}
export default MovementHelper