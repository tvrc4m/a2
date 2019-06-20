import req from '@/utils/request'

export function getPaths(company_id){
    return req.get(`/admin/company/${company_id}/rule/paths`)
}

export function setPermission(company_id,rule_id,paths){
    return req.put(`/admin/company/${company_id}/rule/${rule_id}/permission`,{
        paths:paths
    })
}