<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$emit('replay-show')"
      class="fix"
      ><template #left><van-icon name="cross" /></template
    ></van-nav-bar>
    <CommentItem :item="comment" class="magi"></CommentItem>
    <van-cell-group>
      <van-cell title="全部回复" />
    </van-cell-group>
    <CommentItem
      :item="item"
      v-for="(item, index) in list"
      :key="index"
    ></CommentItem>
    <div class="commentBo"></div>
    <div class="button">
      <van-button
        plain
        type="info"
        block
        round
        @click="isAddCommentShow = !isAddCommentShow"
        >点击评论</van-button
      >
    </div>
    <van-popup position="bottom" v-model="isAddCommentShow"
      ><addComment
        v-if="isAddCommentShow"
        @set-Comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
        :target="comment.com_id"
        :atr_id="$route.params.article_id"
      ></addComment
    ></van-popup>
  </div>
</template>

<script>
import addComment from './addComment.vue'
import CommentItem from './CommentItem.vue'
import { getComment } from '@/api/user'
export default {
  name: 'ReplayComment',
  components: { CommentItem, addComment },
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getComment()
    console.log(this.$route.params.article_id)
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) { return '暂无回复' } else {
        return count + '条回复'
      }
    }
  },
  methods: {
    async getComment () {
      const res = await getComment({ type: 'c', source: this.comment.com_id, limit: this.limit, offset: this.offset })
      this.list = res.data.data.results
    }
  },
  data () {
    return {
      limit: 999,
      offset: null,
      list: [],
      isAddCommentShow: false
    }
  }
}

</script>

<style scoped lang="less">
.fix {
  position: fixed;
  top: 0;
  width: 100%;
}
.magi {
  margin-top: 92px;
}
.button {
  width: 750px;
  position: fixed;
  background: #fff;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  .van-button {
    height: 50px;
    color: rgb(175, 174, 247);
  }
}
.commentBo {
  margin-bottom: 110px;
}
</style>
