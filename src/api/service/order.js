import req from '@/utils/request'

export function getOrders(service,params={}){
    return req.get(`/company/service/${service}/order`,{params})
}

export function getOrder(service,order_id){
    return req.get(`/company/service/${service}/order/${order_id}`)
}

export function editOrder(service,order_id,params){
    return req.put(`/company/service/${service}/order/${order_id}`,params)   
}

export function delOrder(service, order_id){
    return req.delete(`/company/service/${service}/order/${order_id}`)   
}

export function orderNotification(){
    return req.get(`/company/notification`)
}