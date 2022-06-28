import request from '@/utils/request'
import store from '@/store/'

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

/*
* 登陆获取个人资料
* @return
*/
console.log(store.state.user.token)
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {

      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
