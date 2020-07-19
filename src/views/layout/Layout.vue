<template>
  <div class="app-wrapper">
    <app-header/>
    <app-main/>
    <app-footer/>
    <!-- <app-dialog/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppHeader, AppFooter, AppMain } from './components'

export default {
  name: 'Layout',

  components: {
    AppHeader,
    AppFooter,
    AppMain
  },

  data() {
    return {
      loginFlag: false,
      registerFlag: false,
      forgetPasswordFlag: false,
      supplementInformationFlag: false,
      commonErrorFlag: false,
      commonDeleteFlag: false,

      commonTitle: '',
      commonMessage: '',
      commonConfirmButtonText: '',
      commonCallback: null
    }
  },

  computed: {
    ...mapGetters([
      'language',
      'cartCount',
      'isSupplementComplete',
      'token',
      'name',
      'email'
    ])
  },

  methods: {
    showCommonErrorDialog(callback = null, title = this.$t('common.dialog_title'), message = this.$t('common.common_error_message'), confirmText = this.$t('common.retry')) {
      this.commonTitle = title
      this.commonMessage = message
      this.commonConfirmButtonText = confirmText
      this.commonErrorFlag = true
      this.commonCallback = callback
    },

    showCommonDeleteDialog(callback = null, title = this.$t('common.dialog_title'), message = this.$t('common.is_confirm_oper', [this.$t('common.delete')]), confirmText = this.$t('common.confirm')) {
      this.commonTitle = title
      this.commonMessage = message
      this.commonConfirmButtonText = confirmText
      this.commonCallback = callback
      this.commonDeleteFlag = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
