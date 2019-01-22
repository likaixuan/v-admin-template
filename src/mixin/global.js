import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      publicPath: process.env.VUE_APP_PUBLIC_PATH
    }
  }
})
