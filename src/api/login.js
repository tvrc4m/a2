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

}

export function getSideMenu(){
    
}