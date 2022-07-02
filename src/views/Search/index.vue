<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        @search="onSearch"
        @cancel="$router.go(-1)"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        autofocuson
        @focus="isSearch = false"
      />
    </form>
    <!-- 搜索框的文字为空显示 -->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search.stop="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './Components/SearchHistory.vue'
import SearchSuggest from './Components/SearchSuggest.vue'
import SearchResult from './Components/SearchResult.vue'
export default {
  components: {
    SearchHistory, SearchSuggest, SearchResult
  },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str, isDelete) {
      if (!isDelete) {
        this.searchText = str
        this.isSearch = true
        this.$store.commit('setSearchHistoryList', str)
      }
    }
  }
}
</script>

<style>
</style>
