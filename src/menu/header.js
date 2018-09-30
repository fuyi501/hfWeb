// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/table', title: '表格处理', icon: 'table' },
  {
    title: '照片上传',
    icon: 'folder-o',
    children: [
      { path: '/picture', title: '照片上传', icon: 'picture-o' },
      { path: '/photo', title: '摄像头拍照', icon: 'camera' }
    ]
  },
  { path: '/face', title: '测试', icon: 'folder-o' }
]
