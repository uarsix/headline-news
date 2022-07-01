<template>
  <div>
    <van-nav-bar title="标题" style="position: fixed; top: 0; width: 375px"
      ><template #title>
        <van-button type="info" size="large" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template></van-nav-bar
    >
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in ChannelsList" :key="item.id">
        <ArticleList class="listSlots" :id="item.id"></ArticleList
      ></van-tab>

      <template #nav-right>
        <div class="menu" @click="showPopup">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '92%', paddingTop: '1rem' }"
      ><ChannelPanel
        @activeChange="
          active = $event;
          show = false;
        "
        @delChannel="active = $event"
        :ChannelsList="ChannelsList"
        :active="active"
        :show="show"
      ></ChannelPanel
    ></van-popup>
  </div>
</template>

<script>

import ArticleList from '@/components/ArcticleList.vue'
import { getMyChannels } from '@/api/user'
import ChannelPanel from '@/views/Home/ChannelPanel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelPanel
  },
  created () {
    this.getMyChannels()
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 没有登陆axios拿数据
    // 没有登陆第二次打开，去本都拿数据
    // 登陆了，就axios拿数据
    async getMyChannels () {
      const channel = getItem(CHANNELS)
      if (!this.$store.state.user.token & channel) {
        this.ChannelsList = channel
        console.log(1)
      } else {
        try {
          const res = await getMyChannels()
          this.ChannelsList = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  data () {
    return {
      active: 0,
      ChannelsList: [],
      show: false
    }
  }

}
</script>

<style scoped lang="less">
/deep/.van-tabs__nav--complete {
  position: fixed;
  width: 750px;
  height: 83px;
  z-index: 1;
}
/deep/.close-icon {
  position: absolute;
  top: -30px;
}
/deep/.van-tabs__wrap {
  margin-top: 90px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}

/deep/.van-tabs__nav--line {
  width: 750px;
}
/deep/ .van-popup__close-icon--top-left {
  position: absolute;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgb(91, 171, 251, 0.8);
  border-radius: 32px;
  font-size: 25px;
  color: #fff;
  text-align: left;
}
/deep/.van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  position: fixed;
  right: 0;
  min-width: 100px;
  background-color: #ccc;
  height: 82px;
  text-align: center;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
}
</style>
