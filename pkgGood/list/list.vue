<template>
  <view class="container">
    <view class="cate-nav">
      <scroll-view scroll-x="true" class="cate-nav-body" style="width: 750rpx">
        <view
          class="item"
          :class="{ active: item.id === currentCategory.id }"
          v-for="item in brotherCategory"
          :key="item.id"
          @click="tabChange(item)"
        >
          <view class="name">{{ item.name }}</view>
        </view>
      </scroll-view>
    </view>
    <scroll-view>
      <good-list
        v-if="cataId && isShow"
        :cateIdNum="cataId"
        isCataShow
        :cata-info="currentCategory"
      ></good-list>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cataId: '',
      brotherCategory: [],
      currentCategory: {},
      isShow: true,
    }
  },
  onLoad(options) {
    this.cataId = options.cataId
    this.initData()
  },
  methods: {
    async initData() {
      const { brotherCategory, currentCategory } = await uni.$http.get('/goods/category?id=' + this.cataId)
      this.brotherCategory = brotherCategory
      this.currentCategory = currentCategory
    },
    tabChange(val) {
      console.log(val)
      this.currentCategory = val
      this.isShow = false
      this.cataId = val.id
      this.$nextTick(_ => {
        this.isShow = true
      })
    },
  },
}
</script>

<style lang="scss">
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
</style>
