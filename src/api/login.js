import request from '@/utils/request'

// 用户登录
export function userLogin(username,pwd){
    return request({
        url:"/admin/login",
        method:"POST",
        params:{username:username,password:pwd}
    })
}

export function userLogout(){
    return request({
        url:"/admin/logout",
        method:"POST",
        data:{}
    })
}

export function getSideMenu(){
    
}