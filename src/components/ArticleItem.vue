<template>
  <van-cell-group class="article-item">
    <van-cell
      :to="{
        name: 'article',
        params: {
          articleId: article.art_id
        }
      }">
      <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <van-image
            fit="cover"
            v-for="(img, index) in article.cover.images"
            :key="index"
            :src="article.cover.images[0]"
          />
        </div>
        <div class="lable-wrap">
          <span>{{ article.aut_name }}</span>
          <span>评论({{ article.comm_count }})</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      requrie: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  .title {
    font-size: 16px;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 10px;
  }
  .cover-wrap {
    display: flex;
    .van-image {
      width: auto;
      height: 73px;
      padding: 6px 0;
      &:not(:last-child) {
      margin-right: 4px;
    }
    }
  }
  .lable-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 6px;
    }
  }
}
</style>
