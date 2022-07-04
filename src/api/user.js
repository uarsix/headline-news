import request from '@/utils/request'
import store from '@/store/'

/**
* 获取验证码
* @param {number} mobile
* @return
**/

export const getSnsCode = (mobile) => {
  return request({
    url: `sms/codes/${mobile}`
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

/**
* 登陆获取个人资料
* @return
**/
console.log(store.state.user.token)
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}

/**
 *获取频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 * 获取文章推荐
 * @param {channel_id, timestamp} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id, timestamp
    }
  })
}

/**
 *  获取所有频道
 * @returns
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}
/**
 * 数据持久化
 * @param {object []} channels 数组包对象 自定义频道 登陆状态可以使用
 * @returns
 */
export const savaChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
/**
 * 获取搜索建议
 * @param {String or Number} q 搜索框输入的数据
 * @returns
 */
export const getSuggestion = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }

  })
}
/**
 * 搜索结果
 * @param {String or Number} q 搜索框输入的数据
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 2, per_page = 50, q }) => {
  return request({
    url: 'search',
    params: {
      page,
      per_page,
      q
    }
  })
}

/**
 * 新闻详情
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `articles/${article_id}`
  })
}

/**
 * 关注用户
 * @param {[Number|String]} target 用户id
 * @returns
 */
export const addUser = (target) => {
  return request({
    url: 'user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 * @param {[Number|String]} target 用户id
 * @returns
 */
export const delUser = (target) => {
  return request({
    url: `user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 收藏
 * @param {[Number|String]} target 收藏文章的id
 * @returns
 */
export const addCollected = (target) => {
  return request({
    url: 'article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏
 * @param {[Number|String]} target 收藏文章的id
 * @returns
 */
export const delCollected = (target) => {
  return request({
    url: `article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 * 点赞
 * @param {[Number|String]} target 点赞文章的id
 * @returns
 */
export const addLiking = (target) => {
  return request({
    url: 'article/likings ',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消点赞
 * @param {[Number|String]} target 取消点赞文章的id
 * @returns
 */
export const cancelLiking = (target) => {
  return request({
    url: `article/likings/${target}`,
    method: 'DELETE'
  })
}
