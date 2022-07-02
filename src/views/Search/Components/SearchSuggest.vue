/* eslint-disable no-template-curly-in-string */
<template>
  <div>
    搜索建议
    <van-cell-group inset>
      <van-cell
        v-for="(item, index) in suggestList"
        :key="index"
        icon="search"
        @click="$emit('search', item)"
      >
        <template #title> <span v-html="highlight(item)"></span> </template
      ></van-cell>
    </van-cell-group>
    <p></p>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/user'
let timer = null
export default {
  props: {
    searchText: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      suggestList: []
    }
  },
  methods: {
    highlight (str) {
      // 这个写法可以在正则中书写变量
      if (str) {
        const reg = new RegExp(this.searchText, 'g')

        return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
      }
    }
  },
  filters: {
    // 属性绑定不能使用过滤器过滤器不能过滤绑定的属性值
  },
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestion(newVal)
            this.suggestList = res.data.data.options
          } catch (err) { console.log(err) }
        }, 500)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  }

}
</script>

<style>
</style>
