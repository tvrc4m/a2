import request from '@/utils/request'
// 获取所有的角色
export function getAllRules(){
    return request({
        url:"/admin/rules",
        method:"GET",
    })
}

// 角色分页
export function getRules(page=1,limit=20){
    return request({
        url:"/admin/rule",
        method:"GET",
        params:{page,limit}
    })
}

export function getRule(rule_id){
    return request({
        url:`/admin/rule/${rule_id}`,
        method:"GET",
    })
}

export function addRule(rule){
    return request({
        url:"/admin/rule/",
        method:"POST",
        data:{rule}
    })
}

export function editRule(rule_id,rule){
    return request({
        url:`/admin/rule/${rule_id}`,
        method:"PUT",
        data:{
            id:rule.id,
            name:rule.name,
            remark:rule.remark,
            paths:rule.paths
        }
    })
}

export function setPermission(rule_id,paths){
    return request.put(`/admin/rule/${rule_id}/permission`,{
        paths:paths
    })
}

export function delRule(rule_id){
    return request.delete(`/admin/rule/${rule_id}`)
}

export function getPaths(){
    return request.get(`/admin/rule/paths`)
}

export function getRulePermissions(rule_id){

}

export function getAdminPermisions(rule_id){
    return request.get("/admin/permissions",{
        params:{
            rule_id
        }
    });
}