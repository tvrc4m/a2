import req from '@/utils/request'

export function getDoctors(company_id,page=1,limit=20){
    return req.get(`/admin/service/jiating/doctor`,{params:{company_id,page,limit}})
}

export function getDoctor(doctor_id){
    return req.get(`/admin/service/jiating/doctor/${doctor_id}`)
}

export function addDoctor(params){
    return req.post(`/admin/service/jiating/doctor`,params)
}

export function editDoctor(doctor_id, params){
    return req.put(`/admin/service/jiating/doctor/${doctor_id}`,params)   
}

export function delDoctor(doctor_id){
    return req.delete(`/admin/service/jiating/doctor/${doctor_id}`)   
}