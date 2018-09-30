// layout
import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { meta, title: '首页' },
        component: () => import('@/pages/index')
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/pages/table'),
        meta: { meta, title: '表格处理' }
      },
      {
        path: '/face',
        name: 'face',
        component: () => import('@/pages/face'),
        meta: { meta, title: '人脸照片上传' }
      },
      {
        path: '/picture',
        name: 'picture',
        component: () => import('@/pages/picture'),
        meta: { meta, title: '照片上传' }
      },
      {
        path: '/photo',
        name: 'photo',
        component: () => import('@/pages/photo'),
        meta: { meta, title: '摄像头拍照' }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
