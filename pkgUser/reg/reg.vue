<template>
  <view class="reg-container">
    <u--form labelWidth="100" labelAlign="center" :model="formData" :rules="rules" ref="form">
      <u-form-item label="手机" prop="nickname">
        <u--input v-model="formData.nickname" border="bottom" placeholder="请输入手机"></u--input>
      </u-form-item>
      <u-form-item label="昵称" prop="mobile">
        <u--input v-model="formData.mobile" border="bottom" placeholder="请输入昵称"></u--input>
      </u-form-item>
      <u-form-item label="密码" prop="password">
        <u--input v-model="formData.password" border="bottom" placeholder="请输入密码"></u--input>
      </u-form-item>
      <u-form-item label="再次输入" prop="agpassword">
        <u--input v-model="formData.agpassword" border="bottom" placeholder="请再次输入密码"></u--input>
      </u-form-item>
      <u-button type="primary" @click="submit">提交</u-button>
      <text>\n</text>
      <u-button @click="reset">重置</u-button>
    </u--form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: '666',
        mobile: '18855189828',
        password: '123456',
        agpassword: '123456',
      },
      rules: {
        nickname: {
          type: 'string',
          required: true,
          message: '请检查',
          trigger: ['change', 'blur'],
        },
        mobile: {
          type: 'string',
          required: true,
          message: '请检查',
          trigger: ['change', 'blur'],
        },
        password: {
          type: 'string',
          required: true,
          message: '请检查',
          trigger: ['change', 'blur'],
        },
        agpassword: [
          {
            type: 'string',
            required: true,
            message: '请检查',
            trigger: ['change', 'blur'],
          },
          {
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return this.formData.password === value
            },
            message: '两次密码不一致',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur'],
          },
        ],
      },
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validate()
      } catch (error) {
        console.log(error)
        return
      }
      const data = await uni.$http.post('/auth/register', this.formData)
      wx.showToast({
        title: data,
      })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pkgUser/login/login',
        })
      }, 300)
    },
    reset() {},
  },
}
</script>

<style lang="scss">
.reg-container {
  padding: 50rpx 80rpx;
}
</style>
