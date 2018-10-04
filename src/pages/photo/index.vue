<template>
  <d2-container >
    <template slot="header">
      摄像头拍照上传
    </template>
    <div class="d2-mb">
      <el-button type="primary" @click="handleCamera">
        <d2-icon name="camera"/>
        摄像头拍照
      </el-button>
      <el-button style="margin-left: 10px; margin-bottom: 10px;" type="success" @click="submitUpload">
        <d2-icon name="upload"/>
        上传到服务器
      </el-button><br/>
      <span style="font-size: 14px;"> 请拍摄清楚人脸照片，人脸处于照片中间，便于识别。 </span>
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :show-file-list="true"
        :file-list="fileList2"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePreview"
        :on-change="change"
        :on-remove="remove"
        list-type="picture"
        :auto-upload="false">
      </el-upload>
      <el-dialog
        title="摄像头拍照"
        :visible.sync="cameraDialogVisible"
        width="886px"
        @open="openDialog"
        center>
        <el-row type="flex" justify="end" class="d2-mb">
          <el-col :span="12" style="text-align:center">
            <video id="video" ref="vid" width="320" height="320" controls></video>
          </el-col>
          <el-col :span="12" style="text-align:center">
            <canvas id="canvas" width="320" height="320"></canvas>
          </el-col>
        </el-row>
        <el-form :inline="true" :model="imgInfo" :rules="rules" ref="imgInfo" class="demo-form-inline">
          <el-form-item label="工号" prop="staff_id" style="margin-left:50px;">
            <el-input v-model="imgInfo.staff_id" placeholder="请输入用户工号"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name" style="margin-left:50px;">
            <el-input v-model="imgInfo.name" placeholder="请输入用户姓名">
              <!-- <template slot="append">.jpg</template> -->
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="takePhoto">拍照</el-button>
          <el-button type="primary" @click="confirmPhoto">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import axios from 'axios'
const uploadImgUrl = 'https://192.168.9.15:8360/index/img'
export default {
  data () {
    return {
      video: '',
      canvas: '',
      context: '',
      imageUrl: '',
      fileList2: [],
      imgInfo: {
        staff_id: '',
        name: ''
      },
      rules: {
        staff_id: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ]
      },
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
      console.log(file.name, this.fileList2)
    },
    remove (file, fileList) {
      let index = this.fileList2.indexOf(file)
      console.log('index:', index)
      this.fileList2.splice(index, 1)
      console.log('remove: ', file, this.fileList2)
    },
    submitUpload () {
      // this.$refs.upload.submit()
      if (this.fileList2.length > 0) {
        this.imgUpload()
      } else {
        this.$message.error('请先进行拍照')
      }
    },
    imgUpload () {
      for (let i in this.fileList2) {
        if (this.fileList2[i].status === 'ready') {
          axios.post(uploadImgUrl, {
            imgInfo: this.fileList2[i]
          })
            .then((res) => {
              console.log(res)
              if (res.data.code === 2000) {
                this.fileList2[i].status = 'success'
                this.$notify({
                  title: '上传成功',
                  type: 'success'
                })
              } else if (res.data.code === 2001) {
                this.$alert('图片名称已存在，请重新上传', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  center: true
                }).then(() => {
                  this.fileList2.splice(i, 1)
                }).catch(() => {
                  console.log('错误')
                })
              } else if (res.data.code === 2002) {
                this.$confirm('文件格式错误', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  center: true
                }).then(() => {
                  this.fileList2.splice(i, 1)
                }).catch(() => {
                  console.log('错误')
                })
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      }
    },
    openDialog () {
      console.log('打开了')
      setTimeout(() => {
        this.video = document.getElementById('video')
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
          // 调用用户媒体设备, 访问摄像头
          this.getUserMedia({ video: { width: 320, height: 320 } }, this.success, this.error)
        } else {
          this.$alert('不支持访问用户媒体', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
            }
          })
        }
      }, 100)
    },
    handleCamera () {
      this.cameraDialogVisible = true
    },
    takePhoto () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      this.context.drawImage(this.video, 0, 0, 320, 320)
    },
    confirmPhoto () {
      if (this.canvas === '') {
        this.$alert('请先进行拍照', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      } else if (this.imgInfo.staff_id === '') {
        this.$alert('请输入工号', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      } else if (this.imgInfo.name === '') {
        this.$alert('请输入姓名', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      } else {
        let src = this.canvas.toDataURL('image/jpeg')
        this.fileList2.push({
          status: 'ready',
          name: this.imgInfo.staff_id + '_' + this.imgInfo.name + '.jpg',
          url: src
        })
        this.cameraDialogVisible = false
      }
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
