<template>
  <div class="search-history">
    <van-cell center v-if="isHistory">
      <div slot="title">搜索历史：</div>
      <div slot="default">
        <div class="more" v-if="isMore">
          <van-button size="mini" @click.stop="deleteAllHistory">全部删除</van-button>
          <van-button size="mini" @click.stop="isMore = false">完成</van-button>
        </div>
        <van-icon name="more-o" v-else @click.stop="isMore = true" />
      </div>
    </van-cell>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        :title="item"
        icon="underway-o"
        @click="$emit('search', item)"
      >
        <van-icon name="close" v-if="isMore" @click.stop="deleteHistoryItem(index)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { setItem, getItem, removeItem } from '@/utils/storage'

export default {
  name: 'searchHistory',
  components: {},
  props: {},
  data () {
    return {
      isMore: false,
      isHistory: true,
      searchHistory: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.searchHistory = getItem('search-history')
  },
  mounted () {},
  methods: {
    deleteHistoryItem (index) {
      this.searchHistory.splice(index, 1)
      setItem('search-history', this.searchHistory)
      console.log(this.searchHistory)
    },
    deleteAllHistory () {
      this.searchHistory = []
      removeItem('search-history')
      // this.$emit('search', this.searchHistory)
      this.isMore = false
      // this.isHistory = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
