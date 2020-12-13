<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(items, index) in resultList"
        :key="index"
        :title="items.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async onLoad () {
      if (this.searchText !== '') {
        const { data } = await getSearchResult({
          page: this.page, // 页码
          pre_page: this.perPage, // 每页大小
          q: this.searchText // 搜索的字符
        })
        const { results } = data.data
        this.resultList.push(...results)
        this.loading = false

        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
