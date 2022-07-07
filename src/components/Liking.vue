<template>
  <van-loading v-if="isAjax" size=".533rem" />
  <van-icon
    v-else
    color="#777"
    :name="attitude === -1 ? 'good-job-o' : 'good-job'"
    @click="onClick"
  />
</template>

<script>
import { cancelLiking, addLiking } from '@/api/user'
export default {
  name: 'Liking',
  props: {
    attitude: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      const target = this.$route.params.article_id
      if (this.attitude === -1) {
        try {
          const res = await addLiking(target)
          this.$emit('update:attitude', 1)
        } catch (err) { console.log(err) }
      } else {
        try {
          const res = await cancelLiking(target)
          this.$emit('update:attitude', -1)
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
