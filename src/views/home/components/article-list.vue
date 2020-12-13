<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <!-- <van-cell v-for="(item, index) in articles" :key="index" :title="item.title" /> -->
        <article-item v-for="(item, index) in articles" :key="index" :article="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/ArticleItem'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null,
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳
        with_top: 1 // 是否有置顶文章：1有，0无
      })
      const { results } = data.data
      this.articles.push(...results) // ES6中合并数组
      this.loading = false // 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里

      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: Date.now(), // 时间戳
        with_top: 1 // 是否有置顶文章：1有，0无
      })
      const { results } = data.data
      this.articles.unshift(...results) // ES6中合并数组
      this.refreshing = false
      this.refreshSuccessText = `新加载了${results.length}条数据`
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
  .article-list::-webkit-scrollbar { //隐藏滚动条
    width :0 !important;
  }
</style>
