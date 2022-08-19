<template>
  <view class="search">
    <navigator url="/pkgGood/search/search" class="input">
      <image class="icon"></image>
      <text class="txt">商品搜索, 共{{ count }}款好物</text>
    </navigator>
  </view>
</template>

<script>
export default {
  name: 'my-search',
  data() {
    return {
      count: 0,
    }
  },
  created() {
    this.getCount()
  },
  methods: {
    async getCount() {
      const { goodsCount } = await uni.$http.get('/goods/count')
      this.count = goodsCount
    },
  },
}
</script>

<style lang="scss">
.search {
  height: 88rpx;
  width: 100%;
  padding: 0 30rpx;
  background: #fff;
  display: flex;
  align-items: center;
}

.search .input {
  width: 690rpx;
  height: 56rpx;
  background: #ededed;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search .icon {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png)
    center no-repeat;
  background-size: 100%;
  width: 28rpx;
  height: 28rpx;
}

.search .txt {
  height: 42rpx;
  line-height: 42rpx;
  color: #666;
  padding-left: 10rpx;
  font-size: 30rpx;
}
</style>
