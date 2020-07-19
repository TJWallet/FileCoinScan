<template>
  <div class="app-footer">
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {

  },
  data() {
    return {

    }
  },
  methods: {
    goUrl(url, selector) {
      if (this.$route.name === 'Home' && url === 'Home') {
        this.goAnchor(selector)
        return
      }
      this.drawer = false
      this.$router.push({
        name: url, // 路径
        params: {
          selector: selector // 参数2
        }
      })
    },
    goAnchor(selector) {
      this.menuDisplay = false
      this.drawer = false
      const anchor = document.getElementById(selector)
      const total = anchor.offsetTop
      let distance = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      let step = total / 50
      if (distance < total) {
        (function smoothDown() {
          if (distance < total) {
            distance += step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
        })()
      } else {
        const newTotal = distance - total
        step = newTotal / 50;
        (function smoothUp() {
          if (distance > total) {
            distance -= step
            document.documentElement.scrollTop = distance
            setTimeout(smoothUp, 5)
          } else {
            document.documentElement.scrollTop = total
          }
        })()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
