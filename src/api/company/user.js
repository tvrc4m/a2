import req from '@/utils/request'

export function getCompanyUsers(page=1,limit=20){
    return req.get(`/company/user`,{
        params:{
            page,limit
        }
    })
}

export function getUser(user_id){
    return req.get(`/company/user/${user_id}`)
}

export function getCompanyUser(user_id){
    return req.get(`/company/user/${user_id}`)
}

export function addCompanyUser(data){
    return req.post(`/company/user`,data)
}

export function editCompanyUser(user_id,data){
    return req.put(`/company/user/${user_id}`,data)
}

export function delCompanyUser(user_id){
    return req.delete(`/company/user/${user_id}`)
}