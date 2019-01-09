import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  console.log('这里是路由拦截, 权限验证的开始', to)
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)

  // 测试路由验证
  // let zhi = to.matched.some(r => {
  //   console.log('r::::::::', r, 'r.meta.requiresAuth', r.meta.title, r.meta.requiresAuth)
  // })
  // let zhi = to.matched.some(r => r.meta.requiresAuth)
  // console.log('zhizhizhizhi:', zhi)

  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.requiresAuth)) {
    console.log('路由   进来了')
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 在请求的时候都会做相应拦截，如果token过期，则会删除token，所以在这里路由拦截的时候也就通不过了
    // 请根据自身业务需要修改
    const token = util.cookies.get('token')

    console.log('路由拦截, 权限验证token', token)

    if (token && token !== 'undefined') {
      console.log('有token：', token)
      next()
    } else {
      console.log('没有token')
      // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
      // 这个 cookie(redirect) 会在登录后自动删除
      util.cookies.set('redirect', to.fullPath)
      // 没有登录的时候跳转到登录界面
      next({
        name: 'login'
      })
    }
  } else {

    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(to => {
  console.log('router.afterEach路由拦截, 权限验证')
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.commit('d2admin/page/open', { name, params, query })
  // 更改标题
  util.title(to.meta.title)
})

export default router
