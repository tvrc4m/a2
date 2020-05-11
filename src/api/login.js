import request from '@/utils/request'

// 用户登录
export function userLogin(phone,password){
    return request({
        url:"/company/login",
        method:"POST",
        params:{phone,password}
    })
}

export function userLogout(){
    return request({
        url:"/company/logout",
        method:"POST",
        data:{}
    })
}

export function getSideMenu(){
    
}