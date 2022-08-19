<template>
  <scroll-view class="container" style="height: 100%">
    <!-- 搜索头部 -->
    <view class="search-header">
      <view class="input-box">
        <image
          class="icon"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
        ></image>
        <input
          name="input"
          v-model="searchKeywords"
          class="keywrod"
          focus
          :placeholder="defaultKeyword.keyword || '请输入'"
          @input="getSearchList"
          @confirm="submit"
        />
        <image
          class="del"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
        ></image>
      </view>
      <view class="right" @click="goBack">取消</view>
    </view>
    <!-- 未搜索 -->
    <view v-if="!isShowResult" class="no-search">
      <!-- 历史搜索 -->
      <view class="serach-keywords search-history" v-if="historyKeywordList.length && !searchKeywords">
        <view class="h">
          <text class="title">历史记录</text>
          <image
            class="icon"
            src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png"
          ></image>
        </view>
        <view class="b">
          <view
            v-for="(item, index) in historyKeywordList"
            :key="index"
            class="item"
            hover-class="navigator-hover"
          >
            {{ item }}
          </view>
        </view>
      </view>
      <!-- 热门关键字 -->
      <view class="serach-keywords search-hot" v-if="!searchKeywords">
        <view class="h"><text class="title">热门搜索</text></view>
        <view class="b">
          <view
            v-for="(item, index) in hotKeywordList"
            :key="index"
            class="item"
            :class="{ active: item.is_hot === 1 }"
            hover-class="navigator-hover"
          >
            {{ item.keyword }}
          </view>
        </view>
      </view>
      <!-- 搜索建议 -->
      <view class="shelper-list" v-if="searchKeywords">
        <view v-for="(item, index) in searchResult" :key="index" class="item" hover-class="navigator-hover">
          {{ item }}
        </view>
      </view>
    </view>
    <view v-if="isShowResult" class="search-result">
      <good-list :keyWords="searchKeywords"></good-list>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      defaultKeyword: {},
      hotKeywordList: [],
      historyKeywordList: [],
      searchKeywords: '',
      isShowResult: false,
      timer: null,
      searchResult: [],
    }
  },
  onLoad() {
    this.initData()
  },
  methods: {
    async initData() {
      const { defaultKeyword, hotKeywordList } = await uni.$http.get('/search/index')
      console.log(defaultKeyword, hotKeywordList)
      this.defaultKeyword = defaultKeyword
      this.hotKeywordList = hotKeywordList
    },
    goBack() {
      uni.navigateBack()
    },
    getSearchList() {
      this.searchResult = []
      if (!this.searchKeywords.trim()) return
      if (this.timer) clearInterval(this.timer)
      this.timer = setTimeout(async () => {
        this.searchResult = await uni.$http.get('/search/helper?keyword=' + this.searchKeywords)
      }, 300)
    },
    submit() {
      this.isShowResult = true
    },
  },
}
</script>

<style lang="scss">
page {
  min-height: 100%;
  background-color: #f4f4f4;
}

.container {
  min-height: 100%;
  background-color: #f4f4f4;
}

.search-header {
  position: fixed;
  top: 0;
  width: 750rpx;
  height: 91rpx;
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0 31.25rpx;
  font-size: 29rpx;
  color: #333;
}

.search-header .input-box {
  position: relative;
  margin-top: 16rpx;
  float: left;
  width: 0;
  flex: 1;
  height: 59rpx;
  line-height: 59rpx;
  padding: 0 20rpx;
  background: #f4f4f4;
}

.search-header .icon {
  position: absolute;
  top: 14rpx;
  left: 20rpx;
  width: 31rpx;
  height: 31rpx;
}

.search-header .del {
  position: absolute;
  top: 3rpx;
  right: 10rpx;
  width: 53rpx;
  height: 53rpx;
  z-index: 10;
}

.search-header .keywrod {
  position: absolute;
  top: 0;
  left: 40rpx;
  width: 506rpx;
  height: 59rpx;
  padding-left: 30rpx;
}

.search-header .right {
  margin-top: 24rpx;
  margin-left: 31rpx;
  margin-right: 6rpx;
  width: 58rpx;
  height: 43rpx;
  line-height: 43rpx;
  float: right;
}

.no-search {
  height: auto;
  overflow: hidden;
  margin-top: 91rpx;
}

.serach-keywords {
  background: #fff;
  width: 750rpx;
  height: auto;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.serach-keywords .h {
  padding: 0 31.25rpx;
  height: 93rpx;
  line-height: 93rpx;
  width: 100%;
  color: #999;
  font-size: 29rpx;
}

.serach-keywords .title {
  display: block;
  width: 120rpx;
  float: left;
}

.serach-keywords .icon {
  margin-top: 19rpx;
  float: right;
  display: block;
  margin-left: 511rpx;
  height: 55rpx;
  width: 55rpx;
}

.serach-keywords .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding-left: 31.25rpx;
}

.serach-keywords .item {
  display: inline-block;
  width: auto;
  height: 48rpx;
  line-height: 48rpx;
  padding: 0 15rpx;
  border: 1px solid #999;
  margin: 0 31.25rpx 31.25rpx 0;
  font-size: 24rpx;
  color: #333;
}

.serach-keywords .item.active {
  color: #b4282d;
  border: 1px solid #b4282d;
}

.shelper-list {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  padding: 0 31.25rpx;
}

.shelper-list .item {
  height: 93rpx;
  width: 687.5rpx;
  line-height: 93rpx;
  font-size: 24rpx;
  color: #333;
  border-bottom: 1px solid #f4f4f4;
}

.sort {
  position: fixed;
  top: 91rpx;
  background: #fff;
  width: 100%;
  height: 78rpx;
}

.sort-box {
  background: #fff;
  width: 100%;
  height: 78rpx;
  overflow: hidden;
  padding: 0 30rpx;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
}

.sort-box .item {
  height: 78rpx;
  line-height: 78rpx;
  text-align: center;
  flex: 1;
  color: #333;
  font-size: 30rpx;
}

.sort-box .item .txt {
  display: block;
  width: 100%;
  height: 100%;
  color: #333;
}

.sort-box .item.active .txt {
  color: #b4282d;
}

.sort-box .item.by-price {
  background: url(//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png)
    155rpx center no-repeat;
  background-size: 15rpx 21rpx;
}

.sort-box .item.by-price.active.asc {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png)
    155rpx center no-repeat;
  background-size: 15rpx 21rpx;
}

.sort-box .item.by-price.active.desc {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png)
    155rpx center no-repeat;
  background-size: 15rpx 21rpx;
}

.sort-box-category {
  background: #fff;
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 40rpx 40rpx 0 0;
  border-bottom: 1px solid #d9d9d9;
}

.sort-box-category .item {
  height: 54rpx;
  line-height: 54rpx;
  text-align: center;
  float: left;
  padding: 0 16rpx;
  margin: 0 0 40rpx 40rpx;
  border: 1px solid #666;
  color: #333;
  font-size: 24rpx;
}

.sort-box-category .item.active {
  color: #b4282d;
  border: 1px solid #b4282d;
}

.search-result-empty {
  width: 100%;
  height: 100%;
  padding-top: 300rpx;
}

.search-result-empty .icon {
  margin: 0 auto;
  display: block;
  width: 240rpx;
  height: 240rpx;
}

.search-result-empty .text {
  display: block;
  width: 100%;
  height: 40rpx;
  font-size: 28rpx;
  text-align: center;
  color: #999;
}
</style>
