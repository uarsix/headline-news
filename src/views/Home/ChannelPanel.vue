<template>
  <div>
    <div class="channel">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="small"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col
          span="6"
          v-for="(item, index) in ChannelsList"
          :key="index"
          :style="{ color: active === index ? 'red' : '' }"
          class="inner"
          @click="onclick(index)"
        >
          {{ item.name }}
          <van-icon name="close" v-if="index !== 0" v-show="isCloseShow"
        /></van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col
          span="6"
          v-for="item in recommendChannels"
          :key="item.id"
          class="inner van-ellipsis"
          @click="add(item.id)"
        >
          + {{ item.name }}</van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { savaChannels, getAllArticleList } from '@/api/user'
const CHANNELS = 'CHANNELS'
export default {
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)

      // eslint-disable-next-line vue/no-mutating-props
      this.ChannelsList.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onclick (idx) {
      if (this.isCloseShow === false) {
        this.$emit('activeChange', idx)
      } else {
        if (idx !== 0) { // eslint-disable-next-line vue/no-mutating-props
          this.recommendChannels.push(this.ChannelsList[idx])
          // eslint-disable-next-line vue/no-mutating-props
          this.ChannelsList.splice(idx, 1)
        }
        if (idx < this.active) {
          // eslint-disable-next-line vue/no-mutating-props
          this.$emit('delChannel', this.active - 1)
        }
      }
    }
  },
  name: 'ChannelPanel',
  async created () {
    try {
      const res = await getAllArticleList()

      this.recommendChannels = res.data.data.channels.filter(item => this.ChannelsList.every(item1 => item1.id !== item.id))
    } catch (err) { console.log(err) }
  },
  props: {
    ChannelsList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    // 初始数据不能为空，所以不能放在index中
    ChannelsList: {
      async handler (newVal) {
        // 登陆过放服务器，未登录放本地
        if (this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })

          try {
            const res = await savaChannels(arr)
          } catch (err) { console.log(err) }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  }

}
</script>

<style scoped lang="less">
.van-icon-close {
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
}
.van-col {
  margin-bottom: 22px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 24px;
  h3 {
    font-size: 32px;
    line-height: 36px;
    color: #333333;
  }
  .van-button {
    font-size: 12px;
    width: 123px;
    height: 69px;
  }
}
.inner {
  position: relative;
  width: 160px;
  height: 84px;
  background-color: #f4f5f6;
  border-radius: 6px;
  margin: 35px 7px;
  font-size: 28px;
  line-height: 86px;
  text-align: center;
}
</style>
