<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <template #finished>
            <span
              >没有更多了 <br />
              点击刷新</span
            >
          </template>
          <ArticleItem
            v-for="(item, index) in articlelist"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticleList } from '@/api/user'
let ele = null
let scrollTop = 0
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList(this.articlelist)
    console.log()
  },
  data () {
    return {
      timestamp: Date.now(),
      articlelist: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  mounted () {
    // eslint-disable-next-line no-const-assign
    ele = this.$refs.pullrefresh.$el
    // 绑定滚动事件 记住滚动位置 记住组件时回到位置
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },

  activated () {
    ele.scrollTop = scrollTop
  },
  methods: {
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true

      this.timestamp = Date.now()
      this.onLoad()
    },
    async getArticleList () {
      if (this.refreshing) {
        this.articlelist = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articlelist.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      setTimeout(() => {
        this.getArticleList()
      }, 500)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped>
</style>
