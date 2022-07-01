<template>
  <div>
    <keep-alive :include="['home']">
      <router-view class="main"></router-view>
    </keep-alive>
    <van-tabbar route class="fix">
      <van-tabbar-item replace to="home" icon="home-o"
        >首页 <i class="toutiao toutiao-shouye" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="video" icon="home-o"
        >视频 <i class="toutiao toutiao-shipin" slot="icon"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="question" icon="home-o"
        >问答 <i class="toutiao toutiao-wenda" slot="icon"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="my" icon="search"
        >我的 <i class="toutiao toutiao-wode" slot="icon"></i
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
.main {
  padding-bottom: 100px;
  background: #f5f7f9;
}
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
.fix {
  position: fixed !important;
  bottom: 0;
  left: 0;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
