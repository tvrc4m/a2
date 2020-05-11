import req from '@/utils/request'

export function getDoctors(page=1,limit=20){
    return req.get(`/company/service/jiating/doctor`,{params:{page,limit}})
}

export function getDoctor(doctor_id){
    return req.get(`/company/service/jiating/doctor/${doctor_id}`)
}

export function addDoctor(params){
    return req.post(`/company/service/jiating/doctor`,params)
}

export function editDoctor(doctor_id, params){
    return req.put(`/company/service/jiating/doctor/${doctor_id}`,params)   
}

export function delDoctor(doctor_id){
    return req.delete(`/company/service/jiating/doctor/${doctor_id}`)   
}