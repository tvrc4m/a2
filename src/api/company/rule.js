import req from '@/utils/request'

export function getRulePages(){
    return req.get("/admin/company/rule/pages")
}
// 获取所有的角色
export function getAllRules(company_id){
    return req.get(`/admin/company/${company_id}/rules`)
}
// 角色分页
export function getRules(company_id,page=1,limit=20){
    return req.get(`/admin/company/${company_id}/rule`,{
        params:{
            page,limit
        }
    })   
}

export function getRule(company_id,rule_id){
    return req.get(`/admin/company/${company_id}/rule/${rule_id}`)
}

export function addRule(company_id,rule){
    return req.post(`/admin/company/${company_id}/rule`,rule)
}

export function editRule(company_id,rule){
    return req.put(`/admin/company/${company_id}/rule/${rule.id}`,{
        id:rule.id,
        name:rule.name,
        remark:rule.remark
    })
}

export function setPermission(rule_id,paths){
    return req.put(`/admin/company/rule/${rule_id}/permission`,{
        paths:paths
    })
}

export function delRule(company_id,rule_id){
    return req.delete(`/admin/company/${company_id}/rule/${rule_id}`)
}

export function getPaths(){
    return req.get(`/admin/company/rule/paths`)
}

export function getCompanyPermisions(company_id,rule_id){
    return req.get(`/admin/company/${company_id}/rule/permissions`,{
        params:{
            rule_id
        }
    });
}