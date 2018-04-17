import http from './api'
const baseUrl = '/index.php'
// 申请认证
export const authApply = (params) => {
  return http.fetchPost(baseUrl + '/api/live/auth_apply', params)
}

// 认证状态
export const authStatus = (params) => {
    return http.fetchPost(baseUrl + '/api/live/auth_status', params)
}

// 图片上传
export const uploadImg = (params) => {
    return http.fetchUpload(baseUrl + '/api/upload/image', params)
}
 
// 排行榜
export const getRankingList = (params) => {
    return http.fetchPost(baseUrl + '/api/live/get_ranking_list', params)
}
  