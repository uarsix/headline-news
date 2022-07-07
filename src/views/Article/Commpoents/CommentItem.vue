<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <van-icon
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      @click="onClick"
      :color="item.is_liking ? 'red' : ''"
      >{{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>
<script>
import { delCommentLike, addCommentLike } from '@/api/user'
export default {
  name: 'commentItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    async onClick () {
      if (this.item.is_liking) {
        delCommentLike(this.item.com_id)
        // eslint-disable-next-line vue/no-mutating-props
        this.item.is_liking = !this.item.is_liking
        this.item.like_count--
      } else {
        addCommentLike(this.item.com_id)
        this.item.is_liking = !this.item.is_liking
        this.item.like_count++
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
