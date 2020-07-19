<template>
  <div class="app-container">
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'AppHeader',
  props: {

  },

  data() {
    return {
      drawer: false,
      navTab: true,
      oldScrollTop: 0, // 记录上一次滚动结束后的滚动距离
      scrollTop: 0, // 记录当前的滚动距离
      isPhone: false,
      main_media: 1200, // ipad 最大宽度
      main_phone: 719 // 手机 最大宽度
    }
  },

  computed: {
    ...mapGetters([
      'statusStyle'
    ])
  },

  watch: {
    scrollTop(newValue, oldValue) {
      setTimeout(() => {
        if (newValue === window.scrollY) { // 延时执行后当newValue等于window.scrollY，代表滚动结束
          if (this.oldScrollTop > newValue || newValue < 100) {
            this.navTab = true
          } else {
          // } else if (this.isPhone) {
            this.navTab = false
          }
          // console.log('滚动结束')
          this.oldScrollTop = newValue // 每次滚动结束后都要给oldScrollTop赋值
        }
      }, 15) // 必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
    }
  },

  created() {
    this.screenWidth = document.documentElement.clientWidth
    this.isPhone = this.screenWidth <= this.main_phone
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
  },

  mounted() {
    this.handleScroll()
  },

  beforeDestroy() {
    window.removeEventListener('scroll')
  },

  methods: {
    handleLogoClick() {
      this.$router.push('/')
    },

    handleScroll() {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      })
    },

    handleResize(event) {
      this.screenWidth = document.documentElement.clientWidth
      this.isPhone = this.screenWidth <= this.main_phone
    },

    handleSignIn() {
      this.$parent.loginFlag = true
    },

    handleSignUp() {
      this.$parent.registerFlag = true
    },

    handleGoShopcart() {
      if (this.$parent.isSupplementComplete) {
        this.$router.replace('/shopcart/index')
      } else {
        this.$parent.supplementInformationFlag = true
      }
    },

    getLanguageName() {
      return this.$parent.language === 'en' ? this.$t('header.lang_en') : this.$t('header.lang_zh')
    },

    handleNameDropdownCommand(option) {
      if (option === 'personal-center') {
        this.$router.replace('/personal-center/index')
      } else if (option === 'logout') {
        this.$store.dispatch('Logout')
        this.$router.push('/')
      }
    },

    handleDropdownCommand(lang) {
      if (lang === 'zh') {
        localStorage.setItem('locale', 'zh')
      } else if (lang === 'en') {
        localStorage.setItem('locale', 'en')
      }

      this.$i18n.locale = localStorage.getItem('locale')
      this.$store.dispatch('ToggleLanguage', localStorage.getItem('locale'))
    },
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
    },
    getTriggerMode() {
      if (window.innerWidth > 1200) {
        return 'hover'
      } else {
        return 'click'
      }
    },
    onLanguageDropdownCommand(command) {
      if (command === 'language-cn') {
        if (this.langVal === 'en-US') {
          this.$parent.langVal = this.langVal = 'zh-CN'
        }
      } else if (command === 'language-en') {
        // this.$parent.langVal = this.langVal = "en-US";
        if (this.langVal === 'zh-CN') {
          this.$emit('toggleInternational')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
