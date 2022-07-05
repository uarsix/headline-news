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

/**
 *
 * @param {*} type 论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {*} limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getComment = ({ source, type, limit, offset }) => {
  return request({
    url: 'comments',
    params: {
      source, type, limit, offset
    }
  })
}

/**
 * 对评论或评论回复点赞
 * @param {[Number|String]} target 要取消点赞的评论id或评论回复id
 * @returns
 */
export const addCommentLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 * @param {[Number|String]} target 要取消点赞的评论id或评论回复id
 * @returns
 */
export const delCommentLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

/**
 * 发布评论
 * @param {文章id} target
 * @param {内容} content
 * @param {评论id} art_id
 * @returns
 */
export const addComment = ({ target, content, art_id }) => {
  return request({
    method: 'POST',
    url: 'comments',
    data: {
      target, content, art_id
    }
  })
}
