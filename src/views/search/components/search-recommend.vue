<template>
  <div class="search-recommend">
    <van-cell-group>
      <van-cell
        v-for="(item, index) in suggestions"
        :key="index"
        icon="search"
        @click="$emit('search', item)"
      >
        <div slot="title" v-html="highLight(item)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'searchRecommend',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],
      timer: null
    }
  },
  computed: {},
  watch: {
    // searchText () {
    //   console.log('hello')
    // }
    searchText: {
      // 1.lodash插件防抖
      handler: debounce(async function () {
        if (this.searchText !== '') {
          const { data } = await getSearchSuggestions(this.searchText)
          this.suggestions = data.data.options
          // console.log(this.suggestions)
        }
      }, 500)
      // 2.手写防抖
      // handler () {
      //   if (this.timer) {
      //     clearTimeout(this.timer)
      //   }
      //   this.timer = setTimeout(async () => {
      //     if (this.searchText !== '') {
      //       const { data } = await getSearchSuggestions(this.searchText)
      //       this.suggestions = data.data.options
      //       console.log(this.suggestions)
      //       this.timer = null
      //     }
      //   }, 500)
      // }
      // immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    highLight (str) {
      // const exp = '/' + this.searchText + '/gi' // 这样不行
      const exp = new RegExp(this.searchText, 'gi')
      // console.log(exp)
      const strs = str.replace(exp, `<span style="color: red">${this.searchText}</span>`)
      // console.log(strs)
      return strs
    }
  }
}
</script>

<style scoped lang="scss"></style>
