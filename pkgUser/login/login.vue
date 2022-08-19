<template>
  <view class="container">
    <view class="form-box">
      <view class="form-item">
        <input class="input" v-model="formData.mobile" placeholder="请输入手机号" auto-focus />
        <image v-if="formData.mobile.length > 0" class="clear" src="/static/images/clear_input.png"></image>
      </view>

      <view class="form-item">
        <input class="input" v-model="formData.password" data-key="password" password placeholder="密码" />
        <image
          class="clear"
          v-if="formData.password.length > 0"
          src="/static/images/clear_input.png"
          @click="clearInput"
        ></image>
      </view>

      <button type="default" class="login-btn" @click="startLogin">登录</button>

      <view class="form-item-text">
        <navigator url="/pkgUser/reg/reg" class="register">注册账号</navigator>
        <navigator url="/pages/auth/reset/reset" class="reset">忘记密码</navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        mobile: '18855189828',
        password: '123456',
      },
    }
  },
  methods: {
    async startLogin() {
      const { token, userInfo } = await uni.$http.post('/auth/login', this.formData)
      this.$store.commit('user/setToken', token)
      this.$store.commit('user/setUserInfo', userInfo)

      // uni.setStorageSync('token', token)
      // uni.setStorageSync('userInfo', userInfo)
      uni.showToast({
        title: '登入成功',
      })
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/my/my',
        })
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.form-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  margin-top: 96rpx;
  background: #fff;
}

.form-item {
  position: relative;
  background: #fff;
  height: 96rpx;
  border-bottom: 1px solid #d9d9d9;
}

.form-item .input {
  position: absolute;
  top: 26rpx;
  left: 0;
  display: block;
  width: 100%;
  height: 44rpx;
  background: #fff;
  color: #333;
  font-size: 30rpx;
}

.form-item-code {
  margin-top: 32rpx;
  height: auto;
  overflow: hidden;
  width: 100%;
}

.form-item-code .form-item {
  float: left;
  width: 350rpx;
}

.form-item-code .code-img {
  float: right;
  margin-top: 4rpx;
  height: 88rpx;
  width: 236rpx;
}

.form-item .clear {
  position: absolute;
  top: 26rpx;
  right: 18rpx;
  z-index: 2;
  display: block;
  background: #fff;
  height: 44rpx;
  width: 44rpx;
}

.login-btn {
  margin: 60rpx 0 40rpx 0;
  height: 96rpx;
  line-height: 96rpx;
  color: #fff;
  font-size: 30rpx;
  width: 100%;
  background: #b4282d;
  border-radius: 6rpx;
}

.form-item-text {
  height: 35rpx;
  width: 100%;
}

.form-item-text .register {
  display: block;
  height: 34rpx;
  float: left;
  font-size: 28rpx;
  color: #999;
}

.form-item-text .reset {
  display: block;
  height: 34rpx;
  float: right;
  font-size: 28rpx;
  color: #999;
}
</style>
