<template>
  <div class="home-container">
    <van-nav-bar>
      <van-button
        class="home-search-btn"
        round
        icon="search"
        slot="title"
        type="info"
        >搜 索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="activeName">
      <van-tab
        :title="channel.name"
        v-for="channel in channelsArr"
        :key="channel.id"
        >{{ channel.name }}的内容</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'

export default {
  data () {
    return {
      activeName: 'a',
      channelsArr: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channelsArr = data.data.channels
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    /deep/ .van-nav-bar__title{
      max-width: none;
    }
    /deep/ .home-search-btn {
      width: 255px;
      height: 34px;
      border:none;
      outline:none;
      background-color: #52a8ff;
    }
  }
</style>
