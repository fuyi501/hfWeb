// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/table2', title: '上传表格', icon: 'table' },
  {
    title: '采集照片',
    icon: 'file-image-o',
    children: [
      { path: '/picture', title: '上传照片', icon: 'picture-o' },
      { path: '/photo', title: '摄像头拍照', icon: 'camera' },
      { path: '/stream', title: '视频流', icon: 'camera' }
    ]
  },
  { path: '/staff', title: '员工管理', icon: 'user-circle' },
  { path: '/sche', title: '排班表', icon: 'bars' },
  {
    title: '测试',
    icon: 'folder-o',
    children: [
      { path: '/face', title: '上传图片', icon: 'folder-o' },
      { path: '/table', title: '上传表格', icon: 'table' },
      { path: '/stream2', title: '测试视频流', icon: 'camera' }
    ]
  }
]
