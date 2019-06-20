import req from '@/utils/request'

export function getOffices(company_id,page=1,limit=20){
    return req.get(`/admin/company/office`,{params:{company_id,page,limit}})
}

export function getOffice(office_id){
    return req.get(`/admin/company/office/${office_id}`)
}

export function addOffice(params){
    return req.post(`/admin/company/office`,params)
}

export function editOffice(params){
    return req.put(`/admin/company/office/${params.id}`,params)   
}

export function delOffice(office_id){
    return req.delete(`/admin/company/office/${office_id}`)   
}