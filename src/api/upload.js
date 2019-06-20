import request from '@/utils/request'
// 获取会议室日程
export function uploadImage(attachment){
    var data = new FormData()
    data.append("attachment",attachment)
    return request({
        url:"/admin/upload/image",
        method:"POST",
        data
    })
}

export function uploadFile(attachment){
    var data = new FormData()
    data.append("attachment",attachment)
    return request({
        url:"/admin/upload/upfile",
        method:"POST",
        data
    })
}