function formatCash(value) {
    if(value){
        if(typeof(value) === "number"){
            return (
                value = String(value),
                value.split('').reverse().reduce((prev, next, index) => {
                    return ((index % 3) ? next : (next + ',')) + prev
                }
            ))
        }else {
            return value.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        }
    )}
}
    
}
module.exports = formatCash