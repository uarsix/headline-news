import request from '@/utils/request'

/**
* 获取验证码
* @param {number} mobile
* @return
**/

export const getSnsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
* 登录
* @param { mobile, code }
* @return promise
**/
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: 'authorizations',
    data: {
      mobile,
      code
    }
  })
}
