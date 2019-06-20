import req from '@/utils/request'

// 获取用户列表
export function getNewsList(params={}){
    return req.get("/admin/news",{
        params
    })
}

// 获取用户详情
export function getNews(id){
    return req.get(`/admin/news/${id}`)
}

// 添加新用户
export function addNews(params={}){
    return req.post("/admin/news",params)
}

// 编辑用户信息
export function editNews(news_id, params){
    return req.put(`/admin/news/${news_id}`,params)
}

export function updateNewsStatus(id,status){
    return req.put(`/admin/news/${id}/status`,{status})
}

export function updateNewsBannerStatus(id,show_banner){
    return req.put(`/admin/news/${id}/banner`,{show_banner})
}

// 删除用户
export function delNews(id){

    return req.delete(`/admin/news/${id}`)
}

