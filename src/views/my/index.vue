<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        center
        class="base-info"
        :border="false"
      >
        <van-image
          slot="icon"
          round
          fit="cover"
          src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4251831859,110870345&fm=111&gp=0.jpg"
          class="avatar"
        />
        <div slot="title" class="name">{{myCurrent.username}}</div>
        <van-button size="small" round class="updata-btn">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div class="count">{{myCurrent.art_count}}</div>
          <div>头条</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="count">{{myCurrent.follow_count}}</div>
          <div>关注</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="count">{{myCurrent.fans_count}}</div>
          <div>粉丝</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="count">{{myCurrent.like_count}}</div>
          <div>获赞</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div class="not-login-wrap" @click="$router.push('/login')">
        <van-icon class="not-login-icon" name="manager" />
      </div>
      <span class="not-login-text">登录 / 注册</span>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon="browsing-history-o"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="logout" />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  data () {
    return {
      myCurrent: {}
    }
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '您确定退出吗？'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        // on cancel
        })
    },
    loadCurrentUser () {
      axios.get('/my').then((response) => {
        const currentUser = response.data.data
        // console.log(currentUser)
        // Toast.success('登陆成功')
        this.getUser(currentUser, this.$store.state.user)
      })
    },
    getUser (res, u) {
      for (const key in res) {
        // console.log(res[key].token, u)
        if (String(res[key].token) === String(u)) {
          this.myCurrent = res[key]
          console.log(this.myCurrent)
          break
        }
      }
      // console.log(res, u)
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.my-container {
  // 未登录
  .not-login {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    background:linear-gradient(to bottom, #3a9aff,#70b0f5);
    .not-login-wrap {
      display:flex;
      justify-content: center;
      align-items: center;
      width:80px;
      height: 80px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,.2);
      .not-login-icon {
        color: #3a9aff;
        background-color: #fff;
        font-size: 30px;
      }
    }
    .not-login-text {
      color: #fff;
      margin-top: 10px;
      font-size: 20px;
    }
  }
  .my-info {
    // background-color: #3a9aff;
    background:linear-gradient(to bottom, #3a9aff,#70b0f5);
    .base-info {
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: transparent;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .updata-btn {
        color: #666;
        height: 20px;
        font-size: 10px;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: transparent;
    }
  }
  .data-info {
    .data-info-item {
      height: 65px;
      color: #fff;
      font-size: 11px;
      .count {
        font-size: 18px;
      }
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 70px;
      /deep/ .van-icon-star-o{
        color:#eb5253;
      }
      /deep/ .van-icon-browsing-history-o {
        color: #ff9d1d;
      }
      /deep/ .van-grid-item__text {
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #f60;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
