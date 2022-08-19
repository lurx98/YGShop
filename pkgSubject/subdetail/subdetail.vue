<template>
  <scroll-view class="container">
    <scroll-view class="content" v-html="content"></scroll-view>
    <view class="topic-goods"></view>
    <scroll-view class="comments">
      <view class="h">
        <text class="t">精选留言</text>
        <navigator url="/pages/commentPost/commentPost">
          <image
            class="i"
            src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/comment-add-2aca147c3f.png"
          ></image>
        </navigator>
      </view>
      <!-- 有留言 -->
      <view class="has-comments">
        <view class="b">
          <view class="item">
            <view class="info">
              <view class="user">
                <image class="avatar" src="/static/demo/idx-brand.jpg"></image>
                <text class="nickname">昵称</text>
              </view>
              <view class="time">2021-11-12</view>
            </view>
            <view class="comment">东西真不错</view>
          </view>
          <view class="item">
            <view class="info">
              <view class="user">
                <image class="avatar" src="/static/demo/idx-brand.jpg"></image>
                <text class="nickname">昵称</text>
              </view>
              <view class="time">2021-11-12</view>
            </view>
            <view class="comment">东西真不错</view>
          </view>
        </view>
        <view class="load">
          <navigator url="/pages/topicComment/topicComment">查看更多</navigator>
        </view>
      </view>
      <!-- 没有留言  -->
      <!-- <view class="no-comments">
        <view class="b">    
            <image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-comment-560f87660a.png"></image>
            <text class="txt">等你来留言</text>
        </view>
    </view> -->
    </scroll-view>
    <scroll-view class="topic-list">
      <view class="h">
        <text class="txt">专题推荐</text>
      </view>
      <view class="b">
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
      </view>
    </scroll-view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      queryData: {
        page: 1,
        size: 3,
      },
      list: [],
    }
  },
  async onLoad(options) {
    const { content } = await uni.$http.get('/topic/detail', options)
    const { data } = await uni.$http.get('/topic/list', this.queryData)
    this.content = content.replaceAll('<img', '<img style="width:100%;"')
    this.list = data
  },
}
</script>

<style lang="scss">
.content {
  width: 100%;
  height: auto;
  font-size: 0;
}

.content image {
  display: inline-block;
  width: 100%;
}

.comments {
  width: 100%;
  height: auto;
  padding-left: 30rpx;
  background: #fff;
  margin-top: 20rpx;
}

.comments .h {
  height: 93rpx;
  line-height: 93rpx;
  width: 720rpx;
  padding-right: 30rpx;
  border-bottom: 1px solid #d9d9d9;
}

.comments .h .t {
  display: block;
  float: left;
  width: 50%;
  font-size: 29rpx;
  color: #333;
}

.comments .h .i {
  display: block;
  float: right;
  margin-top: 30rpx;
  width: 33rpx;
  height: 33rpx;
}

.comments .b {
  height: auto;
  width: 720rpx;
}

.comments .item {
  height: auto;
  width: 720rpx;
  overflow: hidden;
  border-bottom: 1px solid #d9d9d9;
}

.comments .info {
  height: 127rpx;
  width: 100%;
  padding: 33rpx 0 27rpx 0;
}

.comments .user {
  float: left;
  width: auto;
  height: 67rpx;
  line-height: 67rpx;
  font-size: 0;
}

.comments .user .avatar {
  display: block;
  float: left;
  width: 67rpx;
  height: 67rpx;
  margin-right: 17rpx;
  border-radius: 50%;
}

.comments .user .nickname {
  display: block;
  width: auto;
  float: left;
  height: 66rpx;
  overflow: hidden;
  font-size: 29rpx;
  line-height: 66rpx;
}

.comments .time {
  display: block;
  float: right;
  width: auto;
  height: 67rpx;
  line-height: 67rpx;
  color: #7f7f7f;
  font-size: 25rpx;
  margin-right: 30rpx;
}

.comments .comment {
  width: 720rpx;
  padding-right: 30rpx;
  line-height: 45.8rpx;
  margin-bottom: 30rpx;
  font-size: 29rpx;
  color: #333;
}

.comments .load {
  width: 720rpx;
  height: 108rpx;
  line-height: 108rpx;
  text-align: center;
  font-size: 38.5rpx;
}

.no-comments {
  height: 297rpx;
}

.no-comments .txt {
  height: 43rpx;
  line-height: 43rpx;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 29rpx;
  color: #7f7f7f;
}

.no-comments .icon {
  margin: 48rpx auto 18rpx auto;
  height: 130rpx;
  display: block;
  width: 115rpx;
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
</style>
