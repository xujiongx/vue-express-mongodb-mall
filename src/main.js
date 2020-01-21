// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//懒加载
import VueLazyload from 'vue-lazyload'
//滚动加载插件
import Vuex from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'


Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/loading-svg/loading-bars.svg',
  // attempt: 1
})

// vuex
const store=new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName=nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount+=cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount=cartCount;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
