<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/**app.wxss**/
.container {
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC';
}

view,
image,
text,
navigator {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.test {
  background-color: rgb(139, 61, 61);
}

/*每个页面公共css */
</style>
