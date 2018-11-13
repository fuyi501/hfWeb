<template>
  <d2-container >
    <template slot="header">用户头像上传</template>
    <div class="d2-mb">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://192.168.100.240:8360/index/saveimg"
        :show-file-list="true"
        :data= 'userInfo'
        name='avatar'
        :file-list="fileList2"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePreview"
        :on-change="change"
        :on-remove="remove"
        list-type="picture"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="primary" @click="handleCamera">摄像头拍照</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>
      <el-dialog
        title="摄像头拍照"
        :visible.sync="cameraDialogVisible"
        width="60%"
        @open="openDialog"
        center>
        <el-row type="flex" justify="end">
          <el-col :span="12" style="text-align:center">
            <video id="video" ref="vid" width="320" height="320" controls></video>
          </el-col>
          <el-col :span="12" style="text-align:center">
            <canvas id="canvas" width="320" height="320"></canvas>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="takePhoto">拍照</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button type="primary" @click="close">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      video: '',
      canvas: '',
      context: '',
      imageUrl: '',
      fileList2: [],
      userInfo: { uid: 12345 },
      cameraDialogVisible: false
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log('返回', res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    handlePreview (file) {
      console.log(file)
    },
    change (file, fileList) {
      this.fileList2.push(file)
      console.log(file.name, this.fileList2)
    },
    remove (file, fileList) {
      let index = this.fileList2.indexOf(file)
      console.log('index:', index)
      this.fileList2.splice(index, 1)
      console.log('remove: ', file, this.fileList2)
    },
    submitUpload () {
      console.log('上传提交')
      this.$refs.upload.submit()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    openDialog () {
      console.log('打开了')
      setTimeout(() => {
        this.video = document.getElementById('video')
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')
        // console.log('this.video:', this.video)
        // let vid = this.$refs.vid
        // console.log('this.vid:', vid)
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
          // 调用用户媒体设备, 访问摄像头
          this.getUserMedia({ video: { width: 320, height: 320 } }, this.success, this.error)
        } else {
          alert('不支持访问用户媒体')
        }
      }, 100)
    },
    handleCamera () {
      this.cameraDialogVisible = true
    },
    takePhoto () {
      this.context.drawImage(this.video, 0, 0, 320, 320)
    },
    confirm () {
      let src = this.canvas.toDataURL('image/jpeg')
      console.log('src:', src)
      console.log('图片：', this.convertBase64ToBlob(src))
      console.log('图片：', URL.createObjectURL(this.convertBase64ToBlob(src)))
      this.fileList2.push({
        status: 'ready',
        name: '123',
        url: URL.createObjectURL(this.convertBase64ToBlob(src))
      })
    },
    close () {
      this.cameraDialogVisible = false
    },
    // 访问用户媒体设备的兼容方法
    getUserMedia (constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        // 最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
      } else if (navigator.webkitGetUserMedia) {
        // webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
      } else if (navigator.mozGetUserMedia) {
        // firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error)
      } else if (navigator.getUserMedia) {
        // 旧版API
        navigator.getUserMedia(constraints, success, error)
      }
    },
    success (stream) {
      // 兼容webkit核心浏览器
      // let CompatibleURL = window.URL || window.webkitURL
      // 将视频流设置为video元素的源
      console.log(stream)
      // video.src = CompatibleURL.createObjectURL(stream)
      this.video.srcObject = stream
      this.video.play()
    },
    error (error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`)
    },
    // 将base64转换为文件对象
    convertBase64ToBlob (base64) {
      var base64Arr = base64.split(',')
      var imgtype = ''
      var base64String = ''
      if (base64Arr.length > 1) {
        // 如果是图片base64，去掉头信息
        base64String = base64Arr[1]
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'))
      }
      // 将base64解码
      var bytes = atob(base64String)
      // var bytes = base64
      var bytesCode = new ArrayBuffer(bytes.length)
      // 转换为类型化数组
      var byteArray = new Uint8Array(bytesCode)
      // 将base64转换为ascii码
      for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i)
      }
      // 生成Blob对象（文件对象）
      return new Blob([bytesCode], { type: imgtype })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
