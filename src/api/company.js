import req from '@/utils/request'

export function login(phone,password){
    return req.post("/admin/company/login",{
        phone,password
    })
}

// 获取所有的角色
export function getAllCompanies(){
    return req.get("/admin/companies")
}
// 角色分页
export function getCompanies(page=1,limit=20){
    return req.get("/admin/company",{
        params:{
            page,limit
        }
    })
}

export function getCompany(company_id){
    return req.get(`/admin/company/${company_id}`)
}

export function addCompany(company){
    return req.post(`/admin/company`,company)
}

export function editCompany(company){
    return req.put(`/admin/company/${company.id}`,company)
}

export function delCompany(company_id){
    return req.delete(`/admin/company/${company_id}`)
}

export function getAllTypes(){
    return req.get(`/admin/company/types`)
}

export function getTypes(){
    return req.get(`/admin/company/type`)
}


export function getType(type_id){
    return req.get(`/admin/company/type/${type_id}`)
}

export function addType(type){
    return req.post(`/admin/company/type`,type)
}

export function editType(type){
    return req.put(`/admin/company/type/${type.id}`,{
        id:type.id,
        name:type.name,
    })
}

export function delType(type_id){
    return req.delete(`/admin/company/type/${type_id}`)
}