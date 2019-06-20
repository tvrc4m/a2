import req from '@/utils/request'

// 获取用户列表
export function getUsers(params={}){
    console.log(params)
    return req.get("/admin/user",{
        params
    })
}

// 获取用户详情
export function getUser(uid){
    return req.get(`/admin/user/${uid}`)
}

// 添加新用户
export function addUser(params={}){
    return req.post("/admin/user",params)
}

// 编辑用户信息
export function editUser(params){
    return req.put(`/admin/user/${params.id}`,params)
}

export function editUserStatus(id,status){
    return req.put(`/admin/user/${id}/status`,{status})   
}

// 删除用户
export function delUser(id){

    return req.delete(`/admin/user/${id}`)
}

