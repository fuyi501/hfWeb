<template>
  <d2-container >
    <template slot="header">语音报警</template>
    <div class="d2-mb">
      <el-row style="margin-left:0px;">
        <el-col :span="12" style="width:560px;">
          <el-row style="height: 63px; width: 300px;" type="flex" align="middle" :gutter="10">
            <el-col ><div class="settingFont">报警设置</div></el-col>
            <el-col ><el-button type="primary" size="mini" @click="openAll">全部开启</el-button></el-col>
            <el-col ><el-button type="danger" size="mini" @click="openClose">全部关闭</el-button></el-col>
            <!-- <el-col ><el-button type="success" size="mini" @click="openClose">确认报警项</el-button></el-col> -->
          </el-row>
          <el-form
            ref="alarmForm"
            :model="alarmForm"
            label-width="200px"
            :label-position="labelPosition">
            <el-form-item label="一车间一楼北楼梯间" size="medium">
              <el-switch v-model="alarmForm.Fnorth" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="一车间一楼南楼梯间">
              <el-switch v-model="alarmForm.Fsouth" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="大门">
              <el-switch v-model="alarmForm.Gate" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="实验楼">
              <el-switch v-model="alarmForm.Lab" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="盐酸小罐区主干道">
              <el-switch v-model="alarmForm.Main_road" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="西南交大9423实验室">
              <el-switch v-model="alarmForm.SWJTU" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="二车间一楼左侧楼梯口">
              <el-switch v-model="alarmForm.Sleft" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="二车间一楼右侧楼梯口">
              <el-switch v-model="alarmForm.Sright" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="原料大罐区8号罐">
              <el-switch v-model="alarmForm.Tank_eight" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="原料大罐区4号罐">
              <el-switch v-model="alarmForm.Tank_four" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="原料大罐区靠金陵路">
              <el-switch v-model="alarmForm.Tank_jl" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="原料大罐区主干道">
              <el-switch v-model="alarmForm.Tank_main" @change="changeSwitch" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="width:580px;">
          <h3>报警列表</h3>
          <aplayer
            autoplay
            v-if="flag"
            listMaxHeight='430px'
            theme="#b7daff"
            repeat="repeat-all"
            show-lrc
            :muted.sync="muted"
            :volume.sync="volume"
            :music='list3[0]'
            :list='list3'
          />
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import Aplayer from 'vue-aplayer'
import axios from 'axios'
import dayjs from 'dayjs'
const getAudio = 'http://192.168.9.15:8360/audio/playaudio'
export default {
  components: {
    Aplayer
  },
  data () {
    return {
      flag: false,
      volume: 1, // 音量
      muted: false, // 静音
      list3: [
        // {
        //   title: '实验楼员工未戴安全帽',
        //   artist: 'RADWIMPS',
        //   src: 'http://localhost:8360/static/audio/实验楼员工未戴安全帽.mp3',
        //   pic: './image/index.png'
        // }
      ],
      alarmForm: {
        Fnorth: true, // 一车间一楼北楼梯间
        Fsouth: true, // 一车间一楼南楼梯间
        Gate: true, // 大门
        Lab: true, // 实验楼
        Main_road: true, // 盐酸小罐区主干道
        SWJTU: true, // 西南交大9423实验室
        Sleft: true, // 二车间一楼左侧楼梯口
        Sright: true, // 二车间一楼右侧楼梯口
        Tank_eight: true, // 原料大罐区8号罐
        Tank_four: true, // 原料大罐区4号罐
        Tank_jl: true, // 原料大罐区靠金陵路
        Tank_main: true // 原料大罐区主干道
      },
      alarmString: ['Fnorth', 'Fsouth', 'Gate', 'Lab', 'Main_road', 'SWJTU', 'Sleft', 'Sright', 'Tank_eight', 'Tank_four', 'Tank_jl', 'Tank_main'],
      labelPosition: 'left'
    }
  },
  mounted () {
    console.log('音频 mounted')
    this.getData(this.alarmString)
  },
  methods: {
    openAll () {
      console.log('打开所有')
      for (let key in this.alarmForm) {
        this.alarmForm[key] = true
      }
      this.alarmString = []
      for (let key in this.alarmForm) {
        if (this.alarmForm[key]) {
          this.alarmString.push(key)
        }
      }
      console.log(this.alarmString)
      this.flag = false
      this.getData(this.alarmString)
    },
    openClose () {
      console.log('关闭所有')
      for (let key in this.alarmForm) {
        this.alarmForm[key] = false
      }
      this.flag = false
    },
    changeSwitch () {
      console.log(this.alarmForm)
      this.alarmString = []
      for (let key in this.alarmForm) {
        if (this.alarmForm[key]) {
          this.alarmString.push(key)
        }
      }
      console.log(this.alarmString)
      this.flag = false
      this.getData(this.alarmString)
    },
    getData (alarmString) {
      alarmString = alarmString.join(',')
      console.log('alarmString: ', alarmString)
      console.log('查询语音报警信息')
      axios.get(getAudio, {
        params: {
          alarmString: alarmString
        }
      })
        .then((res) => {
          console.log(res)
          this.list3 = []
          if (res.data.length > 0) {
            for (let i in res.data) {
              this.list3.push({
                title: res.data[i].text,
                artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                src: res.data[i].src,
                pic: './image/index.png'
              })
            }
            this.$notify({
              title: '获取成功',
              type: 'success'
            })
            console.log(this.list3)
            // 因为是异步请求，所以一开始播放器中是没有歌曲的，所有给了个v-if不然会插件默认会先生成播放器，导致报错(这个很重要)
            this.flag = true
          } else {
            this.$notify.error({
              title: '获取失败',
              message: res.data.errmsg
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
.settingFont {
  font-size: 1.17em;
  font-weight: bold;
}
</style>
