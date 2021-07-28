const MIN = 1
const MAX = 100
 
const randomPoint = ():number => {

    if(Math.random() >= (1 - (1/randomRange(2, 3)))) {
        return randomRange(MIN, MAX / randomRange(7, 10))
    }

    if(Math.random() >= (1 - (1/randomRange(3, 5)))){
        return randomRange(MIN, MAX / randomRange(5, 7))
    }

    if(Math.random() >= (1 - (1/randomRange(5, 7)))){
        return randomRange(MIN, MAX / randomRange(3, 5))
    }
    return randomRange(MIN, MAX)
}

function randomRange(min, max) {
    return Math.round(min + Math.random()*(max - min))
}
export default randomPoint