<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="!!articleList.art_id">
          <template>
            <div>
              <!-- 文章标题 -->
              <h1 class="article-title">{{ articleList.title }}</h1>
              <!-- /文章标题 -->

              <!-- 用户信息 -->
              <van-cell class="user-info" center :border="false">
                <van-image
                  class="avatar"
                  slot="icon"
                  round
                  fit="cover"
                  :src="articleList.aut_photo"
                />
                <div slot="title" class="user-name">
                  {{ articleList.title }}
                </div>
                <div slot="label" class="publish-date">
                  {{ articleList.pubdate | dateformat }}
                </div>
                <!-- <FollowUser
                  :is_followed="articleList.is_followed"
                  @input="articleList.is_followed = $event"
                ></FollowUser> -->
                <FollowUser
                  v-model="articleList.is_followed"
                  :target="articleList.aut_id"
                ></FollowUser>
                <!-- <van-button
                    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
              </van-cell>
              <!-- /用户信息 -->

              <!-- 文章内容 -->
              <div
                class="article-content markdown-body"
                v-html="articleList.content"
              >
                这是文章内容
              </div>
              <van-divider>正文结束</van-divider>
              <ArticleComment
                :source="articleList.art_id"
                type="a"
                :commentList="commentList"
                @set-count="count = $event"
              ></ArticleComment>
            </div>
          </template>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="is404Error">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isLoading & !!articleList.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="addCommentShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="count" color="#777" />
      <CollectArticle
        :is_collected.sync="articleList.is_collected"
      ></CollectArticle>
      <Liking :attitude.sync="articleList.attitude"></Liking>
      <van-icon
        name="share"
        color="#777777"
        @click="showShare = true"
      ></van-icon>
    </div>
    <van-cell />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- /底部区域 -->
    <van-popup
      v-model="addCommentShow"
      position="bottom"
      :style="{ height: 'auto' }"
      ><addComment
        v-if="addCommentShow"
        :target="article_id"
        @set-Comment="onNewComment"
      ></addComment>
    </van-popup>
    <!-- 点击评论 -->
  </div>
</template>

<script>import { ImagePreview } from 'vant'
import addComment from './Commpoents/addComment.vue'
import 'github-markdown-css'
import { getArticle } from '@/api/user'
import ArticleComment from './Commpoents/ArticleComment.vue'
export default {
  name: 'ArticleIndex',
  components: { ArticleComment, addComment },
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  async created () {
    try {
      const res = await getArticle(this.article_id)
      this.articleList = res.data.data
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.is404Error = true
      }
    }
    this.isLoading = false
    this.$nextTick(() => {
      const arr = document.querySelectorAll('.article-content img')
      if (arr.length === 0) return
      const arr1 = []
      arr.forEach((item, index) => {
        arr1.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images: arr1,
            startPosition: index,
            maxZoom: 3,
            showIndicators: true
          })
        }
      })
    })
  },
  data () {
    return {
      count: null,
      addCommentShow: false,
      commentList: [],
      isLoading: true,
      articleList: {},
      is404Error: false,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  computed: {},
  methods: {
    // 发布评论
    onNewComment ($event) {
      // 利用单项数据流传值 父传子，子传父，进行状态提升
      this.commentList.unshift($event)
      this.addCommentShow = false
    }
  }

}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
