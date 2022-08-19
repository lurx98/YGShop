<template>
  <scroll-view class="scroll-box" scroll-y="true" @scrolltolower="scrollTolower">
    <view class="cate-item">
      <view class="h" v-if="isCataShow">
        <text class="name">{{ cataInfo.front_name }}</text>
        <text class="desc">{{ cataInfo.front_desc }}</text>
      </view>
      <view class="b">
        <navigator
          class="item"
          :class="{ 'item-b': index % 2 === 1 }"
          v-for="(item, index) in list"
          :key="item.id"
          :url="'/pkgGood/detail/detail?cataId=' + item.id"
        >
          <image class="img" :src="item.list_pic_url" background-size="cover"></image>
          <text class="name">{{ item.name }}</text>
          <text class="price">￥{{ item.retail_price }}</text>
        </navigator>
      </view>
    </view>
    <view v-if="loading">加载中</view>
    <view v-if="finish && list.length">没有更多了</view>
    <view v-if="finish && list.length === 0">没有改商品</view>
  </scroll-view>
</template>

<script>
export default {
  name: 'good-list',
  props: {
    isCataShow: {
      type: Boolean,
      default: false,
    },
    keyWords: {
      type: String,
    },
    cateIdNum: {
      type: [String, Number],
    },
    cataInfo: {
      type: Object,
    },
  },
  data() {
    return {
      queryData: {
        keyword: this.keyWords,
        categoryId: this.cateIdNum,
        page: 1,
        size: 10,
      },
      count: 1,
      list: [],
      loading: false,
      finish: false,
    }
  },
  created() {
    this.initData()
  },

  methods: {
    async initData() {
      this.loading = true
      try {
        const { count, data } = await uni.$http.get('/goods/list', this.queryData)
        this.count = count
        this.list.push(...data)
        this.loading = false
        if (this.list.length === this.count) {
          this.finish = true
        } else {
          this.queryData.page++
        }
      } catch (error) {
        this.loading = false
      }
    },
    scrollTolower() {
      console.log('di')
      if (this.loading) return
      if (this.finish) return
      this.initData()
    },
  },
}
</script>

<style lang="scss">
.scroll-box {
  border: 5rpx solid red;
  position: fixed;
  top: 100rpx;
  box-sizing: border-box;
  height: calc(100vh - 100rpx);
}
.cate-item {
  // margin-top: 100rpx;
  position: flex;
  height: auto;
  overflow: hidden;
}

.cate-item .h {
  height: 145rpx;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cate-item .h .name {
  display: block;
  height: 35rpx;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .h .desc {
  display: block;
  height: 24rpx;
  font-size: 24rpx;
  color: #999;
}

.cate-item .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .list-filter {
  height: 80rpx;
  width: 100%;
  background: #fff;
  margin-bottom: 6.25rpx;
}

.cate-item .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  padding-bottom: 33.333rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
}

.cate-item .b .item-b {
  margin-left: 6.25rpx;
}

.cate-item .item .img {
  width: 302rpx;
  height: 302rpx;
}

.cate-item .item .name {
  display: block;
  width: 365.625rpx;
  height: 35rpx;
  margin: 11.5rpx 0 22rpx 0;
  text-align: center;
  overflow: hidden;
  padding: 0 20rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}
</style>
