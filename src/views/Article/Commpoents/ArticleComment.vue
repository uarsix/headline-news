<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <commentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></commentItem>
    </van-list>
  </div>
</template>

<script>
import commentItem from './CommentItem'
import { getComment } from '@/api/user'
export default {
  components: { commentItem },
  props: {
    source: { type: [Number, String], required: true },
    type: {
      // a评论文章，c评论评论
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    commentList: {
      type: [Array],
      required: true
    }

  },

  methods: {
    onLoad () {
      this.getCommentList()
      // 获取下一页数据
    },
    async getCommentList () {
      try {
        const res = await getComment(this.paramsObj)
        // 如果没有请求到新数据就停止加载
        if (res.data.data.results.length === 0) { this.finished = true }
        this.$emit('set-count', res.data.data.total_count)
        // push在每次请求后拼接数据
        this.commentList.push(...res.data.data.results)
        // 传递的offset是文章评论最后一条的id
        this.paramsObj.offset = res.data.data.last_id
        // 拿回数据结束loading
        this.loading = false
      } catch (err) { console.log(err) }
    }
  },
  data () {
    return {
      // 请求评论数据
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        // 默认null
        offset: null
      },

      loading: false,
      finished: false
    }
  },
  created () {
    this.getCommentList()
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
