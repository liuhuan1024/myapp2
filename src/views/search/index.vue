<template>
  <div class="search-container">
    <!-- 搜索模块-开始 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#1989fa"
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="onFocus(searchText)"
        @clear="onClear"
      />
    </form>
    <!-- /搜索模块 -->

    <!-- 搜索结果列表 -->
      <search-result :searchText="searchText" v-if="isSearchResult"></search-result>
    <!-- /搜索结果列表 -->

    <!-- 搜索推荐 -->
      <search-recommend :search-text="searchText" v-else-if="isRecommendShow" @search="onSearch"></search-recommend>
    <!-- /搜索推荐 -->

    <!-- 搜索历史 -->
      <search-history v-else :searchHistory="searchHistory" @search="onSearch"></search-history>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchRecommend from './components/search-recommend.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'pagename',
  components: {
    SearchHistory,
    SearchRecommend,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isHistoryShow: true,
      isRecommendShow: false,
      isSearchResult: false,
      searchHistory: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // console.log(getItem('search-history'))
    if (getItem('search-history')) {
      this.searchHistory = getItem('search-history')
      console.log('mounted')
    } else {
      this.searchHistory = []
      console.log(this.searchHistory)
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      this.isSearchResult = true
      // console.log(getItem('search-history'))
      // console.log(this.searchHistory)
      if (getItem('search-history')) {
        this.searchHistory = getItem('search-history')
      } else {
        this.searchHistory = []
      }
      this.searchHistory.unshift(this.searchText)
      this.searchHistory = this.dedupe(this.searchHistory) // 利用Set和from去重
      // this.searchHistory = [...new Set(this.searchHistory)]
      console.log(this.dedupe(this.searchHistory))
      setItem('search-history', this.searchHistory)
    },
    onCancel () {
      console.log('onCancel')
      this.$router.back()
    },
    onFocus (searchText) {
      this.searchText = searchText
      this.isSearchResult = false
      this.isRecommendShow = true
    },
    onClear () {
      this.isRecommendShow = false
    },
    dedupe (array) {
      return Array.from(new Set(array))
    }
  }
}
</script>

<style scoped lang="scss"></style>
