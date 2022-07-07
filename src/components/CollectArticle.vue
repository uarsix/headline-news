<template
>
  <van-loading v-if="isAjax" size=".533rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { delCollected, addCollected } from '@/api/user'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true

    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      const target = this.$route.params.article_id
      if (this.is_collected) {
        try {
          const res = await delCollected(target)
        } catch (err) { console.log(err) }
        this.$emit('update:is_collected', !this.is_collected)
      } else {
        try {
          const res = await addCollected(target)
        } catch (err) { console.log(err) }
        this.$emit('update:is_collected', !this.is_collected)
      }
      this.isAjax = false
    }
  },
  data () {
    return {
      isAjax: false
    }
  }
}
</script>

<style>
</style>
