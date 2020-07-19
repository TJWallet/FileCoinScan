<template>
  <section class="app-main">
    <!-- <transition name="el-fade-in" mode="out-in"> -->
    <!-- <router-view :key="key"></router-view> -->
    <router-view/>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  methods: {
    key(input) {
      return input !== undefined ? input + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped>

</style>
