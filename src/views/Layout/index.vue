<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item replace to="" icon="home-o"
        >首页 <i class="toutiao toutiao-shouye" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="" icon="home-o"
        >视频 <i class="toutiao toutiao-shipin" slot="icon"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="" icon="home-o"
        >问答 <i class="toutiao toutiao-wenda" slot="icon"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="" icon="search"
        >我的 <i class="toutiao toutiao-wode" slot="icon"></i
      ></van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
</style>
