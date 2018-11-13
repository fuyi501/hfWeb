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
        width="886px"
        @open="openDialog"
        center>
        <el-row type="flex" justify="end" class="d2-mb">
          <el-col :span="12" style="text-align:center">
            <video id="myPlayer" ref="vid" width="320" height="320" controls preload="auto">
                <source src="rtmp://localhost/live/app" type="rtmp/flv">
                <p class="vjs-no-js">
                请开启Javascript脚本以便
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  支持HTML5 video播放器
                </a>
                </p>
            </video>
          </el-col>
          <el-col :span="12" style="text-align:center">
            <canvas id="canvas" width="320" height="320"></canvas>
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
          <el-button type="primary" @click="takePhoto">拍照</el-button>
          <el-button type="success" @click="confirmPhoto">确认</el-button>
          <el-button type="warning" @click="closeDialog">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import axios from 'axios'
import videojs from 'video.js'
const uploadImgUrl = 'https://192.168.9.15:8360/index/imgall'
const updateFaceUrl = 'https://192.168.9.15:8360/index/updateface'
export default {
  data () {
    return {
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
      this.fileTemp.splice(index, 1)
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
          axios.post(uploadImgUrl, {
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
      console.log('打开了')
      console.log('video.js: ', videojs)
      // var player = videojs('myPlayer', {
      //   width: 400,
      //   heigh: 200
      // })
      setTimeout(() => {
        this.video = document.getElementById('myPlayer')
        console.log('this.video:', this.video)
        videojs(this.video, {
          width: 320,
          height: 320
        })
        // if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
        //   // 调用用户媒体设备, 访问摄像头
        //   this.getUserMedia({ video: { width: 320, height: 320 } }, this.success, this.error)
        // } else {
        //   this.$alert('该浏览器不支持访问用户媒体设备', '提示', {
        //     confirmButtonText: '确定',
        //     type: 'warning',
        //     callback: action => {
        //     }
        //   })
        // }
      }, 100)
    },
    handleCamera () {
      this.cameraDialogVisible = true
    },
    takePhoto () {
      console.log('拍照')
      this.canvas = document.getElementById('canvas')
      console.log('this.canvas:', this.canvas)
      this.context = this.canvas.getContext('2d')
      this.context.drawImage(this.video, 0, 0, 320, 320)
      console.log('this.context:', this.context)
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
      } else if (this.imgInfo.count === '') {
        this.$alert('请选择是第几张照片', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        })
      } else {
        if (this.faceIds.indexOf(this.imgInfo.staff_id) === -1) {
          this.faceIds.push(this.imgInfo.staff_id)
        } else {
          console.log('已存在', this.imgInfo.staff_id)
        }
        let src = this.canvas.toDataURL('image/jpeg')
        let tempName = this.imgInfo.staff_id + '_' + this.imgInfo.name + '_' + this.imgInfo.count + '.jpg'
        if (this.fileTemp.indexOf(tempName) === -1) {
          // this.imgInfo.count += 1
          this.fileTemp.push(tempName)
          this.fileList2.push({
            status: 'ready',
            name: tempName,
            url: src
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
      console.log(error)
      if (error.name === 'NotFoundError') {
        this.$alert('没有找到摄像头设备，请检查是否有摄像头', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            this.cameraDialogVisible = false
          }
        })
      } else {
        this.$alert(`访问用户媒体设备失败：${error.name}，${error.message}`, '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            this.cameraDialogVisible = false
          }
        })
      }
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
