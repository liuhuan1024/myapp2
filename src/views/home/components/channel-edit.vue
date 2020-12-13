<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button size="mini" plain round type="danger" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item :class="{ activeClass : index === activeName }"  v-for="(channels, index) in userChannels" :key="index" class="grid-item myChannel" :text="channels.name" :icon="(isEdit && index !== 0) ? 'clear':''" @click="onUserChannelClick(index)" />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'channel-edit',
  data () {
    return {
      allChannels: [], // 所有频道数据列表
      isEdit: false
    }
  },
  created () {
    this.loadAllChannels()
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    activeName: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getChannels()
      console.log(data.data)
      this.allChannels = data.data.channels
    },

    onAdd (channel) {
      this.userChannels.push(channel)

      if (this.user) { // 如果登录
        // 存到线上
        console.log('登录了')
      } else {
        // 存在本地
        console.log('没登录')
        setItem('user-channel', this.userChannels)
      }
    },

    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) { // 如果编辑状态，并且当前频道不是第一个推荐频道
        this.deleteChannel(index)
      } else {
        this.switchChannel(index)
      }
    },

    deleteChannel (index) {
      if (this.activeName > index) { // 如果删除的是当前激活频道前一个频道
        this.$emit('update-active', this.activeName - 1) // 激活频道变量减1，并且切换home页的激活频道
      }
      this.userChannels.splice(index, 1)// 从用户频道列表中删除当前频道
      // 数据持久化
      if (this.user) { // 如果登录
        // 存到线上
        console.log('登录了')
      } else {
        // 存在本地
        console.log('没登录')
        setItem('user-channel', this.userChannels)
      }
    },

    switchChannel (index) {
      this.$emit('close') // 关闭popup弹出层
      this.$emit('update-active', index) // 切换频道
    }
  }
}
</script>

<style lang="scss" scoped>
  .channel-edit {
    padding-top: 54px;
    .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      &:active {
        background-color: #ccc;
      }
      .van-grid-item__text {
        font-size: 13px;
        color: #222;
        margin-top: 0;
      }
    }
      /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 16px;
      z-index: 99;
    }
  }
  .activeClass {
    /deep/ .van-grid-item__content {
      background-color: #52a8ff;
    }
    /deep/ .van-grid-item__text {
      color: #fff !important;
    }
  }
  }
</style>
