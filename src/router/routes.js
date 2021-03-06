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
      // 人脸识别
      { path: '/picture', name: 'picture', component: () => import('@/pages/faceRecognition/picture'), meta: { meta, title: '照片上传' } },
      { path: '/stream', name: 'stream', component: () => import('@/pages/faceRecognition/stream'), meta: { meta, title: '视频流' } },
      // 人事管理
      { path: '/table', name: 'table2', component: () => import('@/pages/personalAdmin/table'), meta: { meta, title: '上传表格' } },
      { path: '/staff', name: 'staff', component: () => import('@/pages/personalAdmin/staff'), meta: { requiresAuth: true, title: '员工管理' } },
      { path: '/sche', name: 'sche', component: () => import('@/pages/personalAdmin/sche'), meta: { requiresAuth: true, title: '排班表' } },
      // 测试页面
      { path: '/areaControl', name: 'areaControl', component: () => import('@/pages/personalAdmin/areaControl'), meta: { meta, title: '区域控制' } },
      { path: '/table2', name: 'table', component: () => import('@/pages/test/table2'), meta: { meta, title: '上传表格' } },
      { path: '/face', name: 'face', component: () => import('@/pages/test/face'), meta: { meta, title: '人脸照片上传' } },
      { path: '/photo', name: 'photo', component: () => import('@/pages/faceRecognition/photo'), meta: { meta, title: '摄像头拍照' } },
      { path: '/stream2/test2', name: 'stream2test2', component: () => import('@/pages/test/stream2/test2.vue'), meta: { meta, title: '测试视频流' } },
      { path: '/audio', name: 'audio', component: () => import('@/pages/test/audio'), meta: { meta, title: '语音报警' } },
      // 设置
      { path: '/alarmSetting', name: 'alarmSetting', component: () => import('@/pages/setting/alarmSetting'), meta: { meta, title: '报警设置' } },
      // 报警事件
      { path: '/event', name: 'event', component: () => import('@/pages/event'), meta: { meta, title: '报警事件' } }
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
