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
      </el-button>
      <el-button style="margin-left: 10px; margin-bottom: 10px;"
        type="danger"
        @click="updateFace"
        v-loading.fullscreen.lock="loading">
        <d2-icon name="smile-o"/>
        更新人脸库
      </el-button>
      <!-- <el-button style="margin-left: 10px; margin-bottom: 10px;"
        type="danger"
        @click="closeImg">
        <d2-icon name="smile-o"/>
        清空已上传的图片预览
      </el-button> -->
      <br/>
      <span style="font-size: 14px;">（1）请将脸部置于照片中间，眼睛看向摄像头，勿用手、墨镜、口罩等遮挡脸部。 </span><br/>
      <span style="font-size: 14px;">（2）第一张请按照证件照要求拍摄，用于显示；后四张请尽量做出不同的面部表情。 </span><br/>
      <span style="font-size: 14px;">（3）若有佩戴眼镜，请拍摄佩戴和摘下眼镜的照片各至少一张。 </span>
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
        width="1200px"
        @open="openDialog"
        center>
        <el-row type="flex" justify="end" class="d2-mb">
          <el-col :span="12" style="text-align:center">
            <video id=myPlayer class="video-js vjs-default-skin" style="width:500px;height:325px;" crossOrigin='anonymous' controls>
              <source src="http://localhost:8080/hls/stream.m3u8" type="application/x-mpegURL">
              <p class="vjs-no-js">
                not support
              </p>
          </video>
          </el-col>
          <el-col :span="12" style="text-align:center; margin-left:10px;">
            <canvas id="canvas" width="600" height="337"></canvas>
          </el-col>
        </el-row>
        <el-form :inline="true" :model="imgInfo" :rules="rules" ref="imgInfo" class="demo-form-inline">
          <el-form-item label="工号" prop="staff_id" >
            <el-input v-model="imgInfo.staff_id" placeholder="请输入用户工号"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name" >
            <el-input v-model="imgInfo.name" placeholder="请输入用户姓名">
              <!-- <template slot="append">.jpg</template> -->
            </el-input>
          </el-form-item>
          <el-form-item label="张数">
            <el-select v-model="imgInfo.count"
              placeholder="请选择">
              <el-option label="第 1 张" value="1"></el-option>
              <el-option label="第 2 张" value="2"></el-option>
              <el-option label="第 3 张" value="3"></el-option>
              <el-option label="第 4 张" value="4"></el-option>
              <el-option label="第 5 张" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="takePhoto">预拍照</el-button>
          <el-button type="success" @click="confirmPhoto">确认照片</el-button>
          <el-button type="warning" @click="closeDialog">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import axios from 'axios'
import 'videojs-contrib-hls/dist/videojs-contrib-hls.js'
// videojs
import videojs from 'video.js'
window.videojs = videojs
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// 单张照片逐一上传
const uploadImgUrl = 'http://192.168.9.15:8360/index/img'
// 五张一起上传，这里后台是异步执行，出错，暂不使用
const uploadImgAllUrl = 'http://192.168.9.15:8360/index/imgall'
const updateFaceUrl = 'http://192.168.9.15:8360/index/updateface'
export default {
  data () {
    return {
      videoWidth: '',
      videoHeight: '',
      video: '',
      canvas: '',
      context: '',
      imageUrl: '',
      fileList2: [],
      fileTemp: [],
      faceIds: [],
      imgInfo: {
        staff_id: '',
        name: '',
        count: ''
      },
      rules: {
        staff_id: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请选择第几张', trigger: 'change' }
        ]
      },
      cameraDialogVisible: false,
      isUpdate: false, // 是否更新人脸库
      loading: false
    }
  },
  mounted () {
    console.log('hls 视频流播放')
    // console.log('video.js: ', videojs)
    // this.video = document.getElementById('myPlayer')
    // console.log('this.video:', this.video)
    // var player = videojs(this.video)
    // player.play()
  },
  methods: {
    onPlayerLoadeddata (player) {
      this.videoWidth = player.videoWidth()
      this.videoHeight = player.videoHeight()
    },
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
      this.fileTemp.splice(index, 1)
      console.log('remove: ', file, this.fileList2)
    },
    submitUpload () {
      // this.$refs.upload.submit()
      if (this.fileList2.length > 0) {
        this.$notify({
          message: '开始上传照片',
          type: 'success'
        })
        this.imgUpload2()
      } else {
        this.$message.error('请先进行拍照')
      }
    },
    // 一次性上传五张照片
    imgUpload () {
      let tempFileList = []
      if (this.fileList2.length % 5 === 0) {
        for (let i in this.fileList2) {
          console.log('图片', this.fileList2[i])
          if (this.fileList2[i].status === 'ready') {
            tempFileList.push(this.fileList2[i])
          }
        }
        if (tempFileList.length === 5) {
          axios.post(uploadImgAllUrl, {
            imgInfo: tempFileList
          })
            .then((res) => {
              console.log(res)
              if (res.data.data.code === 2000) {
                for (let i in this.fileList2) {
                  this.fileList2[i].status = 'success'
                }
                this.isUpdate = true // 上传成功后可以更新人脸库
                this.fileTemp = [] // 上传成功后临时文件名字列表清空
                this.$notify({
                  title: '上传成功',
                  type: 'success'
                })
                this.$alert('上传成功，请点击更新人脸库进行人脸库的更新', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  callback: action => {
                  }
                })
              } else if (res.data.data.code === 2001) {
                this.$alert(res.data.desc + '，请勿重新上传', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                  // center: true
                }).then(() => {
                  this.fileList2 = []
                }).catch(() => {
                  console.log('错误')
                })
              } else if (res.data.data.code === 2002) {
                this.$confirm('文件格式错误', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                  // center: true
                }).then(() => {
                  this.fileList2 = []
                }).catch(() => {
                  console.log('错误')
                })
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      } else {
        this.$alert('必须为同一人的5张照片，请检查拍摄是否完整', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      }
    },
    // 单张照片逐一上传
    imgUpload2 () {
      this.$notify({
        message: '上传照片中',
        type: 'success'
      })
      if (this.fileList2.length % 5 === 0) {
        for (let i in this.fileList2) {
          console.log('图片', this.fileList2[i])
          if (this.fileList2[i].status === 'ready') {
            axios.post(uploadImgUrl, {
              imgInfo: this.fileList2[i]
            })
              .then((res) => {
                console.log(res)
                if (res.data.code === 2000) {
                  this.fileList2[i].status = 'success'
                  this.isUpdate = true // 上传成功后可以更新人脸库
                  this.fileTemp = [] // 上传成功后临时文件名字列表清空
                  this.$notify({
                    title: '上传成功',
                    type: 'success'
                  })
                } else if (res.data.code === 2001) {
                  this.$alert(res.data.desc + '，请勿重新上传', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                    // center: true
                  }).then(() => {
                    this.fileList2.splice(i, 1)
                  }).catch(() => {
                    console.log('错误')
                  })
                } else if (res.data.code === 2002) {
                  this.$confirm('文件格式错误', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                    // center: true
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
      } else {
        this.$alert('必须为同一人的5张照片，请检查拍摄是否完整', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      }
    },
    openDialog () {
      console.log('打开了 dialog')
      // this.video = document.getElementById('video')
      // console.log('video.js: ', videojs)
      this.video = document.getElementById('myPlayer')
      console.log('this.video:', this.video)
      var player = videojs(this.video)
      player.play()
    },
    handleCamera () {
      this.cameraDialogVisible = true
    },
    takePhoto () {
      console.log('拍照')
      // var videoTag = document.getElementsByTagName('video')
      // this.video = videoTag[0]
      this.video = document.getElementById('myPlayer')
      // console.log(this.video)
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      this.context.drawImage(this.video, 0, 0, 500, 281)
    },
    confirmPhoto () {
      // 这里是最坑的地方，根据 canvas 获取到 base64
      // let src = this.canvas.toDataURL('image/jpeg')
      var src = ''
      let that = this
      // console.log(this.canvas)
      const reader = new FileReader()
      // console.log(this.canvas.msToBlob())
      reader.readAsDataURL(this.canvas.msToBlob())
      reader.onloadend = function (e) {
        src = e.target.result
        console.log(e.target.result)
        console.log(src)
        // that.$notify({ title: '图片base64：' + src })
        that.saveImg(src)
      }
    },
    saveImg (src) {
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
      } else if (this.imgInfo.count === '') {
        this.$alert('请选择是第几张照片', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      } else {
        // this.$notify({ title: '进来了' })
        if (this.faceIds.indexOf(this.imgInfo.staff_id) === -1) {
          this.faceIds.push(this.imgInfo.staff_id)
        } else {
          console.log('已存在', this.imgInfo.staff_id)
        }
        let tempName = this.imgInfo.staff_id + '_' + this.imgInfo.name + '_' + this.imgInfo.count + '.jpg'
        if (this.fileTemp.indexOf(tempName) === -1) {
          // this.imgInfo.count += 1
          this.fileTemp.push(tempName)
          this.fileList2.push({
            status: 'ready',
            name: tempName,
            url: src
          })
          this.$notify({
            message: '第' + this.imgInfo.count + '张照片拍摄成功',
            type: 'success'
          })
        } else {
          console.error('已存在该图片')
          this.$notify({
            title: '第' + this.imgInfo.count + '张照片已存在，请拍摄下一张',
            type: 'error'
          })
        }
        // this.cameraDialogVisible = false
      }
    },
    closeDialog () {
      this.cameraDialogVisible = false
    },
    updateFace () {
      if (this.isUpdate) {
        this.loading = true
        setTimeout(() => {
          if (this.loading) {
            this.loading = false
            this.$alert('更新失败, 请再次点击更新人脸库', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            })
          }
        }, 10000)
        axios.post(updateFaceUrl, {
          faceIds: this.faceIds
        })
          .then((res) => {
            console.log(res)
            if (res.data.data.code === 2000) {
              this.faceIds = []
              this.isUpdate = false
              this.loading = false
              this.fileList2 = []
              this.$notify({
                title: '更新成功',
                type: 'success'
              })
            } else if (res.data.data.code === 2002) {
              this.$alert('更新失败', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {
                console.log('更新失败')
              }).catch(() => {
                console.log('错误')
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$alert('请先上传到服务器再更新人脸库', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          console.log('确定')
        }).catch(() => {
          console.log('错误')
        })
      }
    },
    closeImg () {
      for (let i in this.fileList2) {
        if (this.fileList2[i].status === 'success') {
          this.fileList2.splice(i, 1)
        }
      }
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
