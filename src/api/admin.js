import request from '@/utils/request'
// 获取用户列表
export function getAdminUsers(params={}){
    return request({
        url:"/admin/admin",
        method:"GET",
        params
    })
}
// 获取用户详情
export function getAdminUserInfo(userid){
    return request({
        url:`/admin/admin/${userid}`,
        method:"GET",
    })
}
// 新增用户
export function addAdminUser(data){
    return request({
        url:"/admin/admin",
        method:"POST",
        data
    })
}
// 编辑用户
export function updateAdminUser(userid,data){
    return request({
        url:`/admin/admin/${userid}`,
        method:"PUT",
        data
    })
}
// 删除用户
export function delAdminUser(userid){
    return request({
        url:`/admin/admin/del/${userid}`,
        method:"DELETE",
    })
}
