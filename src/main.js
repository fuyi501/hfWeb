// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 模拟数据
import '@/mock'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'
import pluginImport from '@/plugin/import'
import pluginExport from '@/plugin/export'
// [ 可选插件组件 ] 图表
import VCharts from 'v-charts'
// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import D2Crud from '@d2-projects/d2-crud'

// 视频播放
// import VueVideoPlayer from 'vue-video-player'
// Vue.use(VueVideoPlayer)

// 音乐播放
// import Aplayer from 'vue-aplayer'
// Vue.use(Aplayer)

// Vue.use(ElementUI)
Vue.use(D2Crud)

// 核心插件
Vue.use(d2Admin)
Vue.use(pluginImport)
Vue.use(pluginExport)
Vue.use(VCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 检查最新版本
    this.$store.dispatch('d2admin/releases/checkUpdate')
    // 用户登录后从数据库加载一系列的设置
    this.$store.commit('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.commit('d2admin/fullscreen/listen')
  }
}).$mount('#app')
