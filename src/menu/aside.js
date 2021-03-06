// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/table', title: '上传表格', icon: 'table' },
  { path: '/areaControl', title: '区域控制', icon: 'map' },
  { path: '/audio', title: '语音报警', icon: 'volume-up' },
  { path: '/event', title: '报警事件', icon: 'file-pdf-o' },
  {
    title: '人脸采集',
    icon: 'file-image-o',
    children: [
      { path: '/picture', title: '上传照片', icon: 'picture-o' },
      { path: '/stream', title: '视频采集', icon: 'camera' }
    ]
  },
  { path: '/staff', title: '员工管理', icon: 'user-circle' },
  { path: '/sche', title: '排班表', icon: 'bars' },
  {
    title: '设置',
    icon: 'cog',
    children: [
      { path: '/alarmSetting', title: '报警设置', icon: 'cog' }
    ]
  }
  // ,
  // {
  //   title: '测试页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/face', title: '上传图片', icon: 'folder-o' },
  //     { path: '/table2', title: '上传表格', icon: 'table' },
  //     { path: '/photo', title: '摄像头拍照', icon: 'camera' },
  //     { path: '/stream2', title: '测试视频流', icon: 'camera' }
  //   ]
  // }
]
