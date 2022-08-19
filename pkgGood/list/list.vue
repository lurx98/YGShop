<template>
  <view class="container">
    <view class="cate-nav">
      <scroll-view scroll-x="true" class="cate-nav-body" style="width: 750rpx">
        <view class="item active">
          <view class="name">子分类名</view>
        </view>
        <view class="item">
          <view class="name">子分类名</view>
        </view>
        <view class="item">
          <view class="name">子分类名</view>
        </view>
        <view class="item">
          <view class="name">子分类名</view>
        </view>
        <view class="item">
          <view class="name">子分类名</view>
        </view>
        <view class="item">
          <view class="name">子分类名</view>
        </view>
        <view class="item">
          <view class="name">子分类名</view>
        </view>
      </scroll-view>
    </view>
    <scroll-view scroll-y="true" class="scroll-box">
      <good-list v-if="cataId" :cateIdNum="cataId"></good-list>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cataId: '',
    }
  },
  onLoad(options) {
    console.log(options)
    this.cataId = options.cataId
    console.log(this.cataId)
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
.container {
  background: #f9f9f9;
}
.cate-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.cate-nav-body {
  height: 84rpx;
  white-space: nowrap;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.cate-nav .item {
  display: inline-block;
  height: 84rpx;
  min-width: 130rpx;
  padding: 0 15rpx;
}

.cate-nav .item .name {
  display: block;
  height: 84rpx;
  padding: 0 20rpx;
  line-height: 84rpx;
  color: #333;
  font-size: 30rpx;
  width: auto;
}

.cate-nav .item.active .name {
  color: #ab2b2b;
  border-bottom: 2px solid #ab2b2b;
}

.cate-item {
  margin-top: 94rpx;
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
