<template>
  <div class="home-container">
    <van-nav-bar>
      <van-button
        class="home-search-btn"
        round
        icon="search"
        slot="title"
        type="info"
        to="/search"
        >搜 索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="activeName" class="abc">
      <van-tab
        :title="channel.name"
        v-for="channel in channelsArr"
        :key="channel.id"
        ><article-list :channel="channel" /></van-tab>
        <div slot="nav-right" class="nav-right-null"></div>
      <div slot="nav-right" class="nav-more-btn">
        <van-icon class="wap-nav-btn" name="wap-nav" is-link @click="showPopup" />
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      round
      :style="{ height: '99%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :overlay-style="{ backgroundColor: 'transparent' }"
    >
      <channel-edit
        :user-channels="channelsArr"
        :activeName="activeName"
        @close="isChannelEditShow = false"
        @update-active="onUpdataActive"
       />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      activeName: 0,
      channelsArr: [],
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      if (this.user) { // 如果登录
        // 读取线上数据
        const { data } = await getUserChannels()
        this.channelsArr = data.data.channels
      } else if (getItem('user-channel')) { // 如果本地有数据，就读本地数据，没有则读取网上推荐数据
        console.log('没登录')
        this.channelsArr = getItem('user-channel')
      } else {
        const { data } = await getUserChannels()
        this.channelsArr = data.data.channels
      }
    },
    showPopup () {
      this.isChannelEditShow = true
    },
    onUpdataActive (index) {
      this.activeName = index
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
    /deep/ .nav-right-null {
        flex-shrink: 0;
        width: 40px;
        height: 10px;
    }
    .nav-more-btn {
      position: fixed;
      right: 0;
      background-color: rgba(255,255,255,0.9);
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height:100%;
        opacity: 0.5;
        background:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.3),rgba(0,0,0,0));
      }
    }
    /deep/ .van-tabs__line {
      margin-bottom: 6px;
      background-color: #1989fa;
    }
  }
</style>
