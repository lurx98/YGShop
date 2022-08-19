<template>
  <view class="container">
    <scroll-view class="topic-list" scroll-y="true">
      <navigator
        v-for="item in list"
        :key="item.id"
        class="item"
        :url="'/pkgSubject/subdetail/subdetail?id=' + item.id"
      >
        <image class="img" :src="item.scene_pic_url"></image>
        <view class="info">
          <text class="title">{{ item.title }}</text>
          <text class="desc">{{ item.subtitle }}</text>
          <text class="price">{{ item.price_info }}元起</text>
        </view>
      </navigator>
    </scroll-view>
    <view v-if="loading">加载中</view>
    <view v-if="finished">没有更多了</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      queryData: {
        page: 1,
        size: 3,
      },
      finished: false,
      loading: false,
      count: 0,
    }
  },
  onLoad(options) {
    console.log('subject 页面生命周期onLoad---监听页面加载')
    this.initData()
  },
  methods: {
    async initData() {
      this.loading = true
      try {
        const { count, data } = await uni.$http.get('/topic/list', this.queryData)
        console.log(data)
        this.count = count
        this.list = [...this.list, ...data]
        this.loading = false
        if (this.list.length === this.count) {
          this.finished = true
        } else {
          this.queryData.page++
        }
      } catch (error) {
        this.loading = false
      }
    },
    async onPullDownRefresh() {
      this.list = []
      this.queryData = {
        page: 1,
        size: 3,
      }
      this.count = 0
      await this.initData()
      uni.stopPullDownRefresh()
    },
    onReachBottom() {
      console.log('到底了')
      if (this.finished === true) return
      if (this.loading === true) return
      this.initData()
    },
  },
}
</script>

<style lang="scss">
page,
.container {
  width: 750rpx;
  background: #f4f4f4;
}
.topic-list {
  width: 750rpx;
  background: #f4f4f4;
}

.topic-list .item {
  width: 100%;
  height: 625rpx;
  overflow: hidden;
  background: #fff;
  margin-bottom: 20rpx;
}

.topic-list .img {
  width: 100%;
  height: 415rpx;
}

.topic-list .info {
  width: 100%;
  height: 210rpx;
  overflow: hidden;
}

.topic-list .title {
  display: block;
  text-align: center;
  width: 100%;
  height: 33rpx;
  line-height: 35rpx;
  color: #333;
  overflow: hidden;
  font-size: 35rpx;
  margin-top: 30rpx;
}

.topic-list .desc {
  display: block;
  text-align: center;
  position: relative;
  width: auto;
  height: 24rpx;
  line-height: 24rpx;
  overflow: hidden;
  color: #999;
  font-size: 24rpx;
  margin-top: 16rpx;
  margin-bottom: 30rpx;
}

.topic-list .price {
  display: block;
  text-align: center;
  width: 100%;
  height: 27rpx;
  line-height: 27rpx;
  overflow: hidden;
  color: #b4282d;
  font-size: 27rpx;
}

.page {
  width: 750rpx;
  height: 108rpx;
  background: #fff;
  margin-bottom: 20rpx;
}

.page view {
  height: 108rpx;
  width: 50%;
  float: left;
  font-size: 29rpx;
  color: #333;
  text-align: center;
  line-height: 108rpx;
}

.page .prev {
  border-right: 1px solid #d9d9d9;
}

.page .disabled {
  color: #ccc;
}
</style>
