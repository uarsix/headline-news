<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :disabled="isAjax"
    :loading="isAjax"
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onclick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addUser, delUser } from '@/api/user'
export default {
  name: 'FollowUser',
  data () {
    return {
      // 关注按钮的节流与请求完成前禁止点击
      isAjax: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async onclick () {
      this.isAjax = true
      if (this.value) {
        try {
          const res = await delUser(this.target)
          console.log(res)
          this.$emit('input', !this.value)
        } catch (err) { console.log(err) }
      } else {
        try {
          const res = await addUser(this.target)
          console.log(res)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
    }
  }
}
</script>

<style>
</style>
