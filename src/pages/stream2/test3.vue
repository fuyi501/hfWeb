<template>
  <d2-container >
    <template slot="header">
      摄像头拍照上传
    </template>
    <div class="d2-mb">
      <el-button type="primary" >
        <d2-icon name="camera"/>
        摄像头拍照
      </el-button>
      <el-button style="margin-left: 10px; margin-bottom: 10px;" type="success">
        <d2-icon name="upload"/>
        上传到服务器
      </el-button>
      <el-button style="margin-left: 10px; margin-bottom: 10px;" type="danger">
        <d2-icon name="smile-o"/>
        更新人脸库
      </el-button>
      <br/>
      <span style="font-size: 14px;">（1）请将脸部置于照片中间，眼睛看向摄像头，勿用手、墨镜、口罩等遮挡脸部。 </span><br/>
      <span style="font-size: 14px;">（2）第一张请按照证件照要求拍摄，用于显示；后四张请尽量做出不同的面部表情。 </span><br/>
      <span style="font-size: 14px;">（3）若有佩戴眼镜，请拍摄佩戴和摘下眼镜的照片各至少一张。 </span>
      <el-row type="flex" justify="end" class="d2-mb">
        <el-col :span="12" style="text-align:center; border:1px solid #000;">
          <video-player class="video-player vjs-custom-skin"
            :options="playerOptions"
            @loadeddata="onPlayerLoadeddata($event)"
          >
          </video-player>
          <video id=myPlayer class="video-js vjs-default-skin" style="width:500px;height:325px;" crossOrigin='anonymous' controls>
            <source src="https://192.168.9.15/hls/stream.m3u8" type="application/x-mpegURL">
            <p class="vjs-no-js">
              not support
            </p>
          </video>
        </el-col>
        <el-col :span="12" style="margin-left:20px;border:1px solid #000;">
          <!-- <canvas id="canvas" width="320" height="320"></canvas> -->
          <canvas id="canvas" width="600" height="337" useCORS="true" crossOrigin="anonymous" style="border:1px solid #000;"></canvas>
          <canvas id="canvas2" width="600" height="337" useCORS="true" crossOrigin="anonymous" style="border:1px solid #000;"></canvas>
        </el-col>
      </el-row>
      <el-button type="primary" @click="takePhoto">拍照</el-button>
      <el-button type="success" @click="confirmPhoto">确认</el-button>
    </div>
  </d2-container>
</template>

<script>
import 'videojs-contrib-hls/dist/videojs-contrib-hls.js'
// videojs
import videojs from 'video.js'
window.videojs = videojs
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

export default {
  data () {
    return {
      playerOptions: {
        // videojs and plugin options
        width: '360',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。
        // 值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        crossOrigin: 'anonymous',
        sources: [{
          crossOrigin: 'anonymous',
          type: 'application/x-mpegURL',
          src: 'https://192.168.9.15/hls/stream.m3u8'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg',
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      videoWidth: '',
      videoHeight: ''
    }
  },
  mounted () {
    console.log('hls 视频流播放')
    console.log('video.js: ', videojs)
    this.video = document.getElementById('myPlayer')
    console.log('this.video:', this.video)
    var player = videojs(this.video)
    player.play()
  },
  methods: {
    onPlayerLoadeddata (player) {
      this.videoWidth = player.videoWidth()
      this.videoHeight = player.videoHeight()
    },
    takePhoto () {
      console.log('拍照')
      var videoTag = document.getElementsByTagName('video')
      this.canvas = document.getElementById('canvas')
      // let canvas2 = document.getElementById('canvas2')
      // this.canvas.useCORS = true
      console.log('this.canvas:', this.canvas)
      // videoTag[0].crossOrigin = 'anonymous'
      this.context = this.canvas.getContext('2d')
      // let contextImg = canvas2.getContext('2d')
      // this.context.drawImage(videoTag[0], 50, 50, 1920, 1080, 0, 0, 600, 337)
      this.context.drawImage(videoTag[0], 0, 0, 600, 337)
      console.log('this.context:', this.context)

      // let img = new Image() // 创建新的图片对象
      let base64 = '4654' // base64
      // img.src = 'http://www.xxxx.png';
      alert('base64', base64)
      // this.canvas.crossOrigin = 'anonymous'
      // img.setAttribute("crossOrigin",'anonymous')
      // img.onload = () => { // 图片加载完，再draw 和 toDataURL
      // contextImg.drawImage(this.canvas, 0, 0, 600, 337)
      // base64 = canvas2.toDataURL('image/jpeg')
      // alert('base64', base64)

      let can = this.canvas

      const reader = new FileReader()
      alert(can.msToBlob())
      reader.readAsDataURL(can.msToBlob())
      reader.onloadend = (e) => {
        alert(e.target.result)
        alert(reader)
        const base64data = reader.result
        alert('base64data', base64data)
      }

      // }

      // let src = this.canvas.toDataURL('image/jpeg')
      // alert(base64)
    },
    confirmPhoto () {
      // let src = this.canvas.toDataURL('image/jpeg')
      // console.log('拍照 src', src)
      let canvas2 = document.getElementById('canvas2')
      let contextImg = canvas2.getContext('2d')
      contextImg.drawImage(this.video, 0, 0, 600, 337)
      console.log('contextImg:', contextImg)
      // base64 = canvas2.toDataURL('image/jpeg')

      const reader = new FileReader()
      alert(canvas2.msToBlob())
      reader.readAsDataURL(canvas2.msToBlob())
      reader.onloadend = (e) => {
        alert(e.target.result)
        alert(reader)
        const base64data = reader.result
        alert('base64data', base64data)
      }

      canvas2.msToBlob(function (blob) {
        alert('进来了')
        let newImg = document.createElement('img')
        let url = URL.createObjectURL(blob)
        alert('url', url)
        newImg.onload = function () {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url)
        }

        newImg.src = url
        document.body.appendChild(newImg)
      })

      // alert('base64', base64)
    }
  }
}
</script>
<style scoped>

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
