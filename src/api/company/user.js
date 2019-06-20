import req from '@/utils/request'

export function getCompanyUsers(company_id,page=1,limit=20){
    return req.get(`/admin/company/${company_id}/user`,{
        params:{
            page,limit
        }
    })
}

export function getCompanyUser(company_id,user_id){
    return req.get(`/admin/company/${company_id}/user/${user_id}`)
}

export function addCompanyUser(company_id,data){
    return req.post(`/admin/company/${company_id}/user`,data)
}

export function editCompanyUser(company_id,user_id,data){
    return req.put(`/admin/company/${company_id}/user/${user_id}`,data)
}

export function delCompanyUser(company_id,user_id){
    return req.delete(`/admin/company/${company_id}/user/${user_id}`)
}