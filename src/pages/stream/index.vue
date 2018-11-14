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
        <el-col :span="12" style="text-align:center">
          <!-- <video id=myPlayer class="video-js vjs-default-skin" style="width:100%;" controls>
            <source src="http://127.0.0.1:8080/hls/stream.m3u8" type="application/x-mpegURL">
            <p class="vjs-no-js">
              not support
            </p>
          </video> -->
        </el-col>
        <el-col :span="12" style="text-align:center">
          <canvas id="canvas" width="320" height="320"></canvas>
        </el-col>
        <el-col :span="12" style="text-align:center">
          <video-player class="video-player vjs-custom-skin"
            :options="playerOptions"
          >
          </video-player>
        </el-col>
      </el-row>
      <!-- <el-row type="flex" justify="end" class="d2-mb">
        <el-col style="text-align:center">
          <canvas id="canvas" width="320" height="320"></canvas>
        </el-col>
      </el-row> -->
      <el-button type="primary" @click="takePhoto">拍照</el-button>
      <el-button type="success" @click="confirmPhoto">确认</el-button>
    </div>
  </d2-container>
</template>

<script>
// import 'video.js/dist/video-js.css'
// import videojs from 'video.js'
// // window.videojs = videojs
// // hls plugin for videojs6
import 'videojs-contrib-hls/dist/videojs-contrib-hls.js'
// videojs
import videojs from 'video.js'
window.videojs = videojs

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// hls plugin for videojs6
// require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

export default {
  data () {
    return {
      playerOptions: {
        // videojs and plugin options
        height: '360',
        width: '360',
        sources: [{
          type: 'application/x-mpegURL',
          src: 'http://127.0.0.1:8080/hls/stream.m3u8'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg',
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  mounted () {
    // const s = document.createElement('script')
    // s.type = 'text/javascript'
    // s.src = 'https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.14.1/videojs-contrib-hls.js'
    // document.body.appendChild(s)

    console.log('打开了')
    console.log('video.js: ', videojs)
    this.video = document.getElementById('myPlayer')
    console.log('this.video:', this.video)
    var player = videojs(this.video)
    player.play()
  },
  methods: {
    takePhoto () {
      console.log('拍照')
      var jsDivTagName = document.getElementsByTagName('video')
      for (var m = 0; m < jsDivTagName.length; m++) {
        console.log(jsDivTagName[m])
        alert(jsDivTagName[m])
      }
      this.canvas = document.getElementById('canvas')
      console.log('this.canvas:', this.canvas)
      this.context = this.canvas.getContext('2d')
      this.context.drawImage(jsDivTagName[0], 0, 0, 320, 320)
      console.log('this.context:', this.context)
    },
    confirmPhoto () {
      let src = this.canvas.toDataURL('image/jpeg')
      console.log('拍照 src', src)
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
