import req from '@/utils/request'

export function getOffices(page=1,limit=20){
    return req.get(`/company/office`,{params:{page,limit}})
}

export function getOffice(office_id){
    return req.get(`/company/office/${office_id}`)
}

export function addOffice(params){
    return req.post(`/company/office`,params)
}

export function editOffice(office_id,params){
    return req.put(`/company/office/${office_id}`,params)   
}

export function delOffice(office_id){
    return req.delete(`/company/office/${office_id}`)   
}