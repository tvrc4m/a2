import req from '@/utils/request'

export function login(phone,password){
    return req.post("/company/login",{
        phone,password
    })
}

export function getCompany(){
    return req.get(`/company/detail`)
}

export function addCompany(company){
    return req.post(`/company`,company)
}

export function editCompany(company_id,company){
    return req.put(`/company/${company_id}`,company)
}

