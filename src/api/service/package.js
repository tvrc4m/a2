import req from '@/utils/request'

export function getPackages(company_id,page=1,limit=20){
    return req.get(`/admin/service/tijian/package`,{params:{company_id,page,limit}})
}

export function getPackage(package_id){
    return req.get(`/admin/service/tijian/package/${package_id}`)
}

export function addPackage(params){
    return req.post(`/admin/service/tijian/package`,params)
}

export function editPackage(package_id,params){
    return req.put(`/admin/service/tijian/package/${package_id}`,params)
}

export function delPackage(package_id){
    return req.delete(`/admin/service/tijian/package/${package_id}`)   
}