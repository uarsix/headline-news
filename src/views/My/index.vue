<template>
  <div>
    <div class="header header-login" v-if="user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <span>{{ userInfo.art_count }}</span>
          <p>头条</p>
        </li>
        <li>
          <span>{{ userInfo.follow_count }}</span>
          <p>关注</p>
        </li>
        <li>
          <span>{{ userInfo.fans_count }}</span>
          <p>粉丝</p>
        </li>
        <li>
          <span>{{ userInfo.like_count }}</span>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <div class="header header-unlogin" v-else>
      <div class="inner" @click="$router.push('login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登陆 / 注册</p>
      </div>
    </div>

    <van-grid column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon> <i class="toutiao toutiao-lishi"></i> </template
      ></van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      block
      @click="exBtn"
      class="logout"
      v-if="user.token"
      >退出登陆</van-button
    >
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    if (this.user.token) {
      try {
        console.log(this.user.token)
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    exBtn () {
      Dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang='less'>
.logout {
  color: red;
}
.van-cell-group {
  margin: 10px 0;
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.header-login {
  padding: 116px 32px 0 32px;
  .avatar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 55px;

    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      letter-spacing: 1px;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        letter-spacing: 1px;
        color: #ffffff;
        vertical-align: middle;
        line-height: 1.76rem;
      }
    }
  }
  .list {
    display: flex;
    margin: -25px -31px 0 -32px;
    li {
      flex: 1;

      span {
        color: #ffffff;
        font-size: 36px;
      }
      p {
        font-size: 23px;
      }
    }
  }
}

.header {
  width: 750px;
  height: 401px;
  text-align: center;
  background-color: hsl(210, 95%, 59%, 0.8);
  background: url("@/assets/banner.png") no-repeat;
  background-size: cover;

  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-family: MicrosoftYaHei;
    font-size: 28px;
    letter-spacing: 1px;
    color: #ffffff;
  }
  &.header-unlogin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
