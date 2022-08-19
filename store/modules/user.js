export default {
  namespaced: true,
  state: {
    token: uni.getStorageSync('token'),
    userInfo: uni.getStorageSync('userInfo') || {},
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      uni.setStorageSync('token', data)
    },
    setUserInfo(state, data) {
      state.userInfo = data
      uni.setStorageSync('userInfo', data)
    },
    quit(state, data) {
      state.token = ''
      state.userInfo = {}
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
    },
  },
  actions: {},
}
