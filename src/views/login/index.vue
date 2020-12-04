<template>
  <div class="login-container">
    <van-nav-bar title="登录 / 注册" left-arrow @click-left="$router.back()" />

    <van-cell-group>
      <van-field v-model="user.moblie" left-icon="smile-o" placeholder="请输入手机号" />
      <van-field v-model="user.code" clearable left-icon="music-o" placeholder="请输入验证码">
        <template #button>
          <van-button size="mini" rounds>发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-con">
      <van-button class="login-btn" type="info" block @click="onlogin">登录</van-button>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user'
import { Toast } from 'vant'
import axios from 'axios'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        moblie: 'admin',
        code: '123456'
      }
    }
  },
  methods: {
    // async onlogin () {
    //   Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true
    //   })
    //   try {
    //     const res = await login(this.user)
    //     console.log(res)
    //     Toast.success('登陆成功')
    //   } catch (error) {
    //     console.log('登录失败', error)
    //     Toast.fail('登陆失败')
    //   }
    //   this.$axios.get('/login').then(response => {})
    // }
    onlogin () {
      axios.get('/login').then((response) => {
        const userList = response.data.data
        Toast.success('登陆成功')
        this.abc(userList, this.user)
      })
    },
    abc (res, u) {
      for (const key in res) {
        if (res[key].username === u.moblie && res[key].password === u.code) {
          Toast.success('登陆成功')
          this.$store.commit('setUser', res[key].token)
          this.$router.push('/my')
          // 将后端返回的数据，放到vuex中
          break
        } else {
          Toast.success('登陆失败')
        }
      }
      // console.log(res, u)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn-con {
  margin: 20px 20px;
  .login-btn {
    border: none;
  }
  .van-button__text {
    font-size: 20px;
  }
}
</style>
