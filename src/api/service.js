import req from '@/utils/request'

export function getAllServices(){
    return req.get("/company/services")
}

export function getServices(page=1,limit=20){
    return req.get("/company/service",{
        params:{
            page,limit
        }
    })   
}

export function getService(service_id){
    return req.get(`/company/service/${service_id}`)
}

export function getServiceDetail(alias){
    return req.get(`/company/service/${alias}`)   
}

export function getServiceCompany(service_alias,page=1,limit=20){
    return req.get(`/company/service/${service_alias}`,{
        params:{
            page,limit
        }
    })
}

export function addService(service){
    return req.post(`/company/service`,service)
}

export function editService(service){
    return req.put(`/company/service/${service.id}`,{
        id:service.id,
        name:service.name,
        remark:service.remark
    })
}

export function delService(service_id){
    return req.delete(`/company/service/${service_id}`)
}
