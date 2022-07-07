<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    autofocus
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="field"
    ><template #extra
      ><van-button
        type="default"
        :disabled="message.length === 0"
        @click="onClick"
        >发布</van-button
      ></template
    ></van-field
  >
</template>

<script>
import { addComment } from '@/api/user'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    // $refs可以获取组件
    // $el可以获取当前组件的根标签
    // querySelector获取textarea元素
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({ target: this.target, content: this.message, art_id: this.art_id })
        // 传父进行状态提升
        this.$emit('set-Comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-button {
  border: none;
}
</style>
