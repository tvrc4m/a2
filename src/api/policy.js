import req from '@/utils/request'

// 获取用户列表
export function listModule(params={}){
    return req.get("/admin/policy/module",{
        params
    })
}

// 获取用户详情
export function getModule(id){
    return req.get(`/admin/policy/module/${id}`)
}

// 添加新用户
export function addModule(params={}){
    return req.post("/admin/policy/module",params)
}

// 编辑用户信息
export function editModule(module_id,params){
    return req.put(`/admin/policy/module/${module_id}`,params)
}

export function updateModuleStatus(id,status){
    return req.put(`/admin/policy/module/${id}/status`,{status})
}

// 删除用户
export function delModule(id){

    return req.delete(`/admin/policy/module/${id}`)
}


// 获取用户列表
export function listNews(params={}){
    console.log(params)
    return req.get("/admin/policy/news",{
        params
    })
}

// 获取用户详情
export function getNews(id){
    return req.get(`/admin/policy/news/${id}`)
}

// 添加新用户
export function addNews(params={}){
    return req.post("/admin/policy/news",params)
}

// 编辑用户信息
export function editNews(news_id, params){
    return req.put(`/admin/policy/news/${news_id}`,params)
}

export function updateNewsStatus(id,status){
    return req.put(`/admin/policy/news/${id}/status`,{status})
}

export function updateNewsBannerStatus(id,show_banner){
    return req.put(`/admin/policy/news/${id}/banner`,{show_banner})
}

// 删除用户
export function delNews(id){

    return req.delete(`/admin/policy/news/${id}`)
}

