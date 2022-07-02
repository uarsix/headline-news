<template>
  <div>
    <van-cell title="搜索历史">
      <template #right-icon v-if="!isDelete">
        <van-icon name="delete-o" @click="isDelete = true" />
      </template>
      <template #extra v-if="isDelete">
        <span @click="delAllSearch">全部删除</span>&nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistoryList"
      :key="index"
      :title="item"
      @click.stop="$emit('search', item, isDelete)"
      ><template #right-icon v-if="isDelete">
        <van-icon name="close" @click="delHistory(index)" />
      </template>
    </van-cell>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data () {
    return {
      isDelete: false
    }
  },
  methods: {
    delHistory (num) {
      this.$store.commit('delHistory', num)
    },
    delAllSearch () {
      this.$store.commit('delAllSearchList')
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  }
}
</script>

<style>
</style>
