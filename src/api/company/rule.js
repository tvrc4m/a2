import req from '@/utils/request'

export function getRulePages(){
    return req.get("/company/rule/pages")
}
// 获取所有的角色
export function getAllRules(){
    return req.get(`/company/rules`)
}
// 角色分页
export function getRules(page=1,limit=20){
    return req.get(`/company/rule`,{
        params:{
            page,limit
        }
    })   
}

export function getRule(rule_id){
    return req.get(`/company/rule/${rule_id}`)
}

export function addRule(rule){
    return req.post(`/company/rule`,rule)
}

export function editRule(rule){
    return req.put(`/company/rule/${rule.id}`,{
        id:rule.id,
        name:rule.name,
        remark:rule.remark
    })
}

export function setPermission(rule_id,paths){
    return req.put(`/company/rule/${rule_id}/permission`,{
        paths:paths
    })
}

export function delRule(rule_id){
    return req.delete(`/company/rule/${rule_id}`)
}

export function getPaths(){
    return req.get(`/company/rule/paths`)
}

export function getCompanyPermisions(rule_id){
    return req.get(`/company/rule/permissions`,{
        params:{
            rule_id
        }
    });
}