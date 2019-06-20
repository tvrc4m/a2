import Message from 'vue-multiple-message'

export function assertEmpty(value){
    if(value==null) return false;
    return !!value
}

export function assertNumber(value){
    return /^\d+$/.test(value);
}

export function assertLength(value,min,max){
    if(typeof(value)=='undefined' || value==null) return false
    return value.length>=min && value.length<=max
}

export function assertEmail(value){
    return /\w+@\w+\.\w+/.test(value)
}

export function assertPhone(value){
    return value && /^\d{11}$/.test(value)
}