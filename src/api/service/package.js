import req from '@/utils/request'

export function getPackages(page=1,limit=20){
    return req.get(`/company/service/tijian/package`,{params:{page,limit}})
}

export function getPackage(package_id){
    return req.get(`/company/service/tijian/package/${package_id}`)
}

export function addPackage(params){
    return req.post(`/company/service/tijian/package`,params)
}

export function editPackage(package_id, params){
    return req.put(`/company/service/tijian/package/${package_id}`,params)   
}

export function delPackage(package_id){
    return req.delete(`/company/service/tijian/package/${package_id}`)   
}