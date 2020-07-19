<template>
  <div :class="hasGlobalDialog() ? 'active' : ''" class="app-dialog">
    <el-dialog :visible.sync="$parent.loginFlag" class="sign-in-dialog">
      <div class="sign-in-dialog-content">
        <div class="advert-image">
          <el-image :src="advertImage" fit="cover"/>
        </div>

        <div class="text-content">
          <h4>
            {{ $t('login.title_email') }}
          </h4>
          <el-form ref="loginForm" :model="loginForm">

            <el-form-item>
              <el-input v-model="loginForm.account" :placeholder="$t('login.account_email_placehold')"/>
            </el-form-item>

            <el-form-item>
              <el-input v-model="loginForm.password" :placeholder="$t('login.password_placehold')" type="password"/>
            </el-form-item>

            <el-form-item>
              <el-checkbox v-model="loginForm.rememberPassword">{{ $t('login.remember_password') }}</el-checkbox>
            </el-form-item>

            <el-form-item>
              <el-button :round="true" class="sign-in" type="primary" @click="handleLogin()">{{ $t('login.sign_in') }}</el-button>
            </el-form-item>

            <el-form-item>
              <el-button class="forget-password" type="text" @click="handleForgetPassword()">
                {{ $t('login.forget_password') }}
              </el-button>
            </el-form-item>

            <el-form-item class="go-register">
              <el-button type="text" @click="handleGoRegister()">
                {{ $t('login.no_account') }}
              </el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="$parent.registerFlag" class="sign-up-dialog">
      <div class="sign-up-dialog-content">
        <div class="advert-image">
          <el-image :src="advertImage" fit="cover"/>
        </div>

        <div class="text-content">
          <h4>
            {{ $t('register.title_email') }}
          </h4>
          <el-form ref="registerForm" :model="registerForm">

            <el-form-item>
              <el-input v-model="registerForm.account" :placeholder="$t('register.account_email_placehold')"/>
            </el-form-item>

            <el-form-item>
              <el-input v-model="registerForm.validateCode" :placeholder="$t('register.validate_code_placehold')">
                <el-button slot="append" type="text" @click="handleGetValidateCode()">
                  {{ $t('register.get_validate_code') }}
                </el-button>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="registerForm.password" :placeholder="$t('register.password_placehold')" type="password"/>
            </el-form-item>

            <el-form-item>
              <el-input v-model="registerForm.repassword" :placeholder="$t('register.repassword_placehold')" type="password"/>
            </el-form-item>

            <el-form-item>
              <el-button :round="true" class="sign-in" type="primary" @click="handleRegister()">{{ $t('register.confirm') }}</el-button>
            </el-form-item>

            <el-form-item class="go-login">
              <el-button type="text" @click="handleGoLogin()">
                {{ $t('register.go_login') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="$parent.forgetPasswordFlag" class="forget-password-dialog">
      <div class="forget-password-dialog-content">
        <div class="advert-image">
          <el-image :src="advertImage" fit="cover"/>
        </div>

        <div class="text-content">
          <h4>
            {{ $t('forget_password.title_email') }}
          </h4>
          <el-form ref="forgetPasswordForm" :model="forgetPasswordForm">

            <el-form-item>
              <el-input v-model="forgetPasswordForm.account" :placeholder="$t('forget_password.account_email_placehold')"/>
            </el-form-item>

            <el-form-item>
              <el-input v-model="forgetPasswordForm.validateCode" :placeholder="$t('forget_password.validate_code_placehold')">
                <el-button slot="append" type="text" @click="handleGetValidateCode()">
                  {{ $t('forget_password.get_validate_code') }}
                </el-button>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="forgetPasswordForm.password" :placeholder="$t('forget_password.password_placehold')" type="password"/>
            </el-form-item>

            <el-form-item>
              <el-input v-model="forgetPasswordForm.repassword" :placeholder="$t('forget_password.repassword_placehold')" type="password"/>
            </el-form-item>

            <el-form-item>
              <el-button :round="true" class="sign-in" type="primary" @click="handleGetbackPassword()">{{ $t('forget_password.confirm') }}</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="$parent.supplementInformationFlag" class="supplement-information-dialog">
      <div class="supplement-information-dialog-content">
        <h3>
          {{ $t('supplement_information.title') }}
        </h3>

        <h4>
          {{ $t('supplement_information.hello') }}
        </h4>

        <p v-html="$t('supplement_information.tips')"></p>

        <el-button type="primary" @click="handleGoSupplement()">
          {{ $t('supplement_information.go_supplement') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="$parent.commonErrorFlag" class="common-error-dialog">
      <div class="common-error-dialog-content">
        <h3>
          {{ $parent.commonTitle }}
        </h3>
        <p>
          {{ $parent.commonMessage }}
        </p>
        <div class="button-wrapper">
          <el-button :round="true" type="primary" @click="handleConfirmCommonError()">
            {{ $parent.commonConfirmButtonText }}
          </el-button>
          <el-button :round="true" @click="handleCancelCommonError()">
            {{ $t('common.cancel') }}
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="$parent.commonDeleteFlag" class="common-delete-dialog">
      <div class="common-delete-dialog-content">
        <h3>
          {{ $parent.commonTitle }}
        </h3>
        <p>
          {{ $parent.commonMessage }}
        </p>
        <div class="button-wrapper">
          <el-button :round="true" type="primary" @click="handleConfirmCommonDelete()">
            {{ $parent.commonConfirmButtonText }}
          </el-button>
          <el-button :round="true" @click="handleCancelCommonDelete()">
            {{ $t('common.cancel') }}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/common'

export default {
  name: 'AppDialog',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        rememberPassword: false
      },

      registerForm: {
        account: '',
        validateCode: '',
        password: '',
        repassword: ''
      },

      forgetPasswordForm: {
        account: '',
        validateCode: '',
        password: '',
        repassword: ''
      },

      advertImage: ''
    }
  },

  watch: {
    '$parent.loginFlag': function(flag) {
      if (!this.advertImage && flag) {
        this.fetchAdvert()
      }
    },

    '$parent.registerFlag': function(flag) {
      if (!this.advertImage && flag) {
        this.fetchAdvert()
      }
    },

    '$parent.forgetPasswordFlag': function(flag) {
      if (!this.advertImage && flag) {
        this.fetchAdvert()
      }
    }
  },

  created() {
    this.getAccountFromCache()
  },

  mounted() {

  },

  methods: {
    fetchAdvert() {
      api.getAdvert().then(response => {
        if (response.Status === 1) {
          const result = response.Result
          if (result && result.length > 0) {
            this.advertImage = result[0].img
          }
        } else {
          this.$notify.error({
            title: this.$t('common.dialog_title'),
            message: response.ErrMsg
          })
        }
      }).catch(error => {
        console.error(error)
        this.$notify.error({
          title: this.$t('common.dialog_title'),
          message: error.message
        })
      })
    },

    hasGlobalDialog() {
      return this.$parent.loginFlag || this.$parent.registerFlag || this.$parent.forgetPasswordFlag || this.$parent.supplementInformationFlag || this.$parent.commonErrorFlag || this.$parent.commonDeleteFlag
    },

    getAccountFromCache() {
      this.loginForm.account = localStorage.getItem('cached-account')
      this.loginForm.password = localStorage.getItem('cached-password')
    },

    setAccountToCache() {
      localStorage.setItem('cached-account', this.loginForm.account)
      localStorage.setItem('cached-password', this.loginForm.password)
    },

    clearAccountCache() {
      localStorage.removeItem('cached-account')
      localStorage.removeItem('cached-password')
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(response => {
              this.loading = false
              this.$parent.loginFlag = false

              if (response.Status === 1) {
                if (this.loginForm.rememberPassword) {
                  this.setAccountToCache()
                } else {
                  this.clearAccountCache()
                }

                const supplementInformationFlag = this.$parent.isSupplementComplete
                if (!supplementInformationFlag) {
                  this.fetchEnterpriseInformation()
                }
              } else {
                this.$notify.error({
                  title: this.$t('common.dialog_title'),
                  message: response.ErrMsg
                })
              }
            })
            .catch(error => {
              this.loading = false
              this.$notify.error({
                title: this.$t('common.dialog_title'),
                message: error.ErrMsg
              })
            })
        } else {
          this.$notify.error({
            title: this.$t('common.dialog_title'),
            message: 'error submit'
          })
          return false
        }
      })
    },

    fetchEnterpriseInformation() {
      api.getEnterpriseInfo().then(response => {
        if (response.Status === 1 && response.Result) {
          this.$store.dispatch('ToggleSupplementState', true)
        } else {
          this.$parent.supplementInformationFlag = true
        }
      }).catch(error => {
        console.error(error)
      })
    },

    handleRegister() {

    },

    handleGetbackPassword() {

    },

    handleForgetPassword() {
      this.$parent.loginFlag = false
      this.$parent.forgetPasswordFlag = true
    },

    handleGoRegister() {
      this.$parent.loginFlag = false
      this.$parent.registerFlag = true
    },

    handleGetValidateCode() {

    },

    handleGoLogin() {
      this.$parent.registerFlag = false
      this.$parent.loginFlag = true
    },

    handleGoSupplement() {
      this.$parent.supplementInformationFlag = false
      this.$router.push('/supplement-information/index')
    },

    handleConfirmCommonDelete() {
      this.$parent.commonDeleteFlag = false

      if (this.$parent.commonCallback) {
        this.$parent.commonCallback()
      }
    },

    handleCancelCommonDelete() {
      this.$parent.commonDeleteFlag = false
    },

    handleConfirmCommonError() {
      this.$parent.commonErrorFlag = false

      if (this.$parent.commonCallback) {
        this.$parent.commonCallback()
      }
    },

    handleCancelCommonError() {
      this.$parent.commonErrorFlag = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
