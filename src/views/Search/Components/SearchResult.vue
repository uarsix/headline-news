<template>
  <div class="content">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in resultList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResult } from '@/api/user'
let timer = null
export default {
  components: {
    ArticleItem
  },
  props: {
    searchText: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      resultList: [],
      loading: false,
      refreshing: false,
      finished: false,
      page: 1,
      per_page: 10

    }
  },
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        if (newVal.length > 0) {
          timer = setTimeout(async () => {
            this.getSearchResult()
          }, 500)
        }
      },
      immediate: true
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })

        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.resultList.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      console.log(this.page++)
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.resultList = []
      this.page = 1
      this.getSearchResult()
    }
  }

}

</script>

<style scoped lang='less'>
.content {
  overflow: auto;
  height: calc(100vh - 100px);
}
</style>
