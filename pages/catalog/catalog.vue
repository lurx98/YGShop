<template>
  <view class="container">
    <my-search></my-search>
    <view class="catalog">
      <scroll-view class="nav" scroll-y="true">
        <view
          v-for="(item, index) in categoryList"
          :key="item.id"
          class="item"
          :class="{ active: index === currentActive }"
          @click="changeHandle(item, index)"
        >
          {{ item.name }}
        </view>
      </scroll-view>
      <scroll-view class="cate" scroll-y="true">
        <navigator :url="toList" class="banner">
          <image class="image" :src="currentCategory.banner_url"></image>
          <view class="txt">{{ currentCategory.front_name }}</view>
        </navigator>
        <view class="hd">
          <text class="line"></text>
          <text class="txt">{{ currentCategory.name }}</text>
          <text class="line"></text>
        </view>
        <view class="bd">
          <navigator
            v-for="(item, index) in currentCategory.subCategoryList"
            :key="item.id"
            :url="'/pkgGood/list/list?cataId=' + item.id"
            class="item"
            :class="{ last: index % 3 === 0 }"
          >
            <image class="icon" :src="item.wap_banner_url"></image>
            <text class="txt">{{ item.name }}</text>
          </navigator>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      currentCategory: {},
      currentActive: 0,
    }
  },
  onLoad() {
    this.initData()
  },
  computed: {
    toList() {
      if (this.currentCategory) {
        if (this.currentCategory.subCategoryList) {
          return '/pkgGood/list/list?cataId=' + this.currentCategory.subCategoryList[0].id
        }
      }
    },
  },
  methods: {
    async initData() {
      const { categoryList, currentCategory } = await uni.$http.get('/catalog/index')
      console.log(categoryList, currentCategory)
      this.categoryList = categoryList
      this.currentCategory = currentCategory
    },
    async changeHandle(item, val) {
      this.currentActive = val
      const { currentCategory } = await uni.$http.get('/catalog/current?id=' + item.id)
      this.currentCategory = currentCategory
    },
  },
}
</script>

<style lang="scss">
page {
  height: 100%;
}

.container {
  background: #f9f9f9;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.catalog {
  flex: 1;
  width: 100%;
  background: #fff;
  display: flex;
  border-top: 1px solid #fafafa;
}

.catalog .nav {
  width: 162rpx;
  height: 100%;
}

.catalog .nav .item {
  text-align: center;
  line-height: 90rpx;
  width: 162rpx;
  height: 90rpx;
  color: #333;
  font-size: 28rpx;
  border-left: 6rpx solid #fff;
}

.catalog .nav .item.active {
  color: #ab2b2b;
  font-size: 36rpx;
  border-left: 6rpx solid #ab2b2b;
}

.catalog .cate {
  border-left: 1px solid #fafafa;
  flex: 1;
  height: 100%;
  padding: 0 30rpx 0 30rpx;
}

.banner {
  display: block;
  height: 222rpx;
  width: 100%;
  position: relative;
}

.banner .image {
  position: absolute;
  top: 30rpx;
  left: 0;
  border-radius: 4rpx;
  height: 192rpx;
  width: 100%;
}

.banner .txt {
  position: absolute;
  top: 30rpx;
  text-align: center;
  color: #fff;
  font-size: 28rpx;
  left: 0;
  height: 192rpx;
  line-height: 192rpx;
  width: 100%;
}

.catalog .hd {
  height: 108rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.catalog .hd .txt {
  font-size: 24rpx;
  text-align: center;
  color: #333;
  padding: 0 10rpx;
  width: auto;
}

.catalog .hd .line {
  width: 40rpx;
  height: 1px;
  background: #d9d9d9;
}

.catalog .bd {
  height: auto;
  width: 100%;
  overflow: hidden;
}

.catalog .bd .item {
  display: block;
  float: left;
  height: 216rpx;
  width: 144rpx;
  margin-right: 34rpx;
}

.catalog .bd .item.last {
  margin-right: 0;
}

.catalog .bd .item .icon {
  height: 144rpx;
  width: 144rpx;
}

.catalog .bd .item .txt {
  display: block;
  text-align: center;
  font-size: 24rpx;
  color: #333;
  height: 72rpx;
  width: 144rpx;
}
</style>
