import req from '@/utils/request'

export function getPaths(){
    return req.get(`/company/rule/paths`)
}

export function setPermission(rule_id,paths){
    return req.put(`/company/rule/${rule_id}/permission`,{
        paths:paths
    })
}