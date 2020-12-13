<template>
  <div class="article-container">
        <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

        <h1 class="title">{{ article.title }}</h1>
        <van-cell center class="user-info">
          <div slot="title" class="name">{{ article.aut_name }}</div>
          <div slot="label" class="pubdate">{{ article.pubdate | relativeTime }}</div>
          <van-image
            class="avatar"
            slot="icon"
            round
            fix="cover"
            :src="article.aut_photo"
          />
          <van-button
            class="follow-btn"
            :type="article.is_followed ? 'default' :'info'"
            round
            size="small"
            :icon="article.is_followed ? '' :'plus'"
          >{{ article.is_followed ? '已关注' : '关注'}}</van-button>
        </van-cell>
        <div ref="article-content" class="content markdown-body" v-html="article.content"></div>
  </div>
</template>

<script>
// 在组件中获取动态路由参数：
// 方法一：this.$route.params.xxx
// 方法二：props 传参，推荐
import './markdown.css'
import { getArticlesContent } from '@/api/article'
import { ImagePreview } from 'vant'
// ImagePreview({
//   images: [
//     'https://img.yzcdn.cn/vant/apple-1.jpg',
//     'https://img.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 0
// })
export default {
  name: 'articleContent',
  components: {},
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleId(this.articleId)
  },
  mounted () {},
  methods: {
    async getArticleId (articleId) {
      const { data } = await getArticlesContent(articleId)
      this.article = data.data
      // 数据改变影响视图更新(DOM数据)不是立即的
      // 所以如果需要在修改数据后马上操作被该数据
      // 影响的视图DOM，需要把这个代码放到$nextick中
      this.$nextTick(() => {
        this.handlerPreviewImage()
      })
    },
    handlerPreviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index, // 起始位置
            closeable: true // 弹出层的右上角显示关闭图标
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      font-size: 12px;
      color: #b4b4b4;
    }
    .avatar {
      width: 35px;
      height: 35px;
      padding-right: 8px;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
  ul {
    list-style: unset;
  }
</style>
