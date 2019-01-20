<template>
  <d2-container >
    <template slot="header">语音报警</template>
    <div class="d2-mb">
      <el-row style="margin-left:0px;" :gutter="20">
        <el-col :span="10" style="width:480px;">
          <el-row style="height: 63px; width: 300px;" type="flex" align="middle" :gutter="10">
            <el-col ><div class="settingFont">报警设置</div></el-col>
            <el-col ><el-button type="primary" size="mini" @click="openAll">全部开启</el-button></el-col>
            <el-col ><el-button type="danger" size="mini" @click="openClose">全部关闭</el-button></el-col>
            <!-- <el-col ><el-button type="success" size="mini" @click="openClose">确认报警项</el-button></el-col> -->
          </el-row>
          <!-- <el-form
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
          </el-form> -->
          <el-form
            ref="alarmData"
            :model="alarmData"
            label-width="250px"
            :label-position="labelPosition">
            <el-form-item :label="(index+1) + ' ' + item.ch_name" size="medium" v-for="(item, index) in alarmData.data" v-bind:key="item.id">
              <el-switch v-model="item.is_alarm" @change="changeSwitch2(item)" active-text="开启报警" inactive-text="关闭报警" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10" style="width:540px;">
          <h3>报警列表</h3>
          <p v-if="ishaveaudio">没有报警数据</p>
          <div v-else>
            <aplayer
              ref="Aplayer"
              @play="paly"
              @pause="pause"
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
          </div>
          
        </el-col>
        <el-col :span="4" style="margin-left:20px;">
          <h3>事件大图</h3>
          <img :src="bigpic" style="width:533px;height:300px;" class="image">
          <p style="width:533px">{{ evenTitle }}</p>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import Aplayer from 'vue-aplayer'
import axios from 'axios'
import dayjs from 'dayjs'
import Vue from 'vue'
var schedule = require('node-schedule')
const getAudioInfo = 'http://192.168.100.240:8360/audio/getaudio'
const intervalGetInfo = 'http://192.168.100.240:8360/audio/intervalget'
const editDataUrl = 'http://192.168.100.240:8360/audio/editaudio'
const openCloseAllUrl = 'http://192.168.100.240:8360/audio/opencloseall'
const getAudio = 'http://192.168.100.240:8360/audio/playaudio'
export default {
  components: {
    Aplayer
  },
  data () {
    return {
      flag: false,
      ishaveaudio: false, // 是否有报警数据
      volume: 1, // 音量
      muted: false, // 静音
      bigImgInfo: [],
      list3: [
        // {
        //   title: '实验楼员工未戴安全帽',
        //   artist: 'RADWIMPS',
        //   src: 'http://localhost:8360/static/audio/实验楼员工未戴安全帽.mp3',
        //   pic: './image/index.png'
        // }
      ],
      alarmData: {
        data: []
      },
      // alarmForm: {
      //   Fnorth: true, // 一车间一楼北楼梯间
      //   Fsouth: true, // 一车间一楼南楼梯间
      //   Gate: true, // 大门
      //   Lab: true, // 实验楼
      //   Main_road: true, // 盐酸小罐区主干道
      //   SWJTU: true, // 西南交大9423实验室
      //   Sleft: true, // 二车间一楼左侧楼梯口
      //   Sright: true, // 二车间一楼右侧楼梯口
      //   Tank_eight: true, // 原料大罐区8号罐
      //   Tank_four: true, // 原料大罐区4号罐
      //   Tank_jl: true, // 原料大罐区靠金陵路
      //   Tank_main: true // 原料大罐区主干道
      // },
      alarmString: ['Fnorth', 'Fsouth', 'Gate', 'Lab', 'Main_road', 'SWJTU', 'Sleft', 'Sright', 'Tank_eight', 'Tank_four', 'Tank_jl', 'Tank_main'],
      labelPosition: 'left',
      bigpic: './image/index.png',
      evenTitle: '',
      maxid: 0, // 最大的id号
      interval: '' // 定时查询数据执行对象
    }
  },
  watch: {
    list3 () {
      console.log('this.list3的长度：', this.list3.length)
      // 如果音频列表超过300，则重新刷新一次
      if(this.list3.length > 300){
        this.flag = false
        this.getData(this.alarmString)
      } else if( this.list3.length === 0) {
        this.ishaveaudio = true
      }
    }
  },
  mounted () {
    console.log('音频 mounted')
    this.getAudioInfo()
    var intervalTask = schedule.scheduleJob('*/2 * * * * *', ()=>{
      console.log('每2秒执行一次!');
      this.intervalGet()
    });
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {    
      console.log('销毁定时器')        
      intervalTask.cancel()                               
    })
  },
  beforeDestroy() {
    console.log('报警页面销毁')
  },
  methods: {
    paly () {
      console.log('开始播放')
      console.log(this.$refs.Aplayer.currentMusic)
      let info = this.$refs.Aplayer.currentMusic
      for (let item of this.bigImgInfo) {
        if (item.small_picture === info.pic) {
          console.log('大图：', item)
          this.bigpic = item.big_picture
          this.evenTitle = item.title
        }
      }
    },
    pause () {
      console.log('暂停')

    },
    openAll () {
      console.log('打开所有')
      for (let i in this.alarmData.data) {
        this.alarmData.data[i].is_alarm = true
      }
      this.alarmString = []
      for (let i in this.alarmData.data) {
        if (this.alarmData.data[i].is_alarm) {
          this.alarmString.push(this.alarmData.data[i].en_name)
        }
      }
      console.log(this.alarmString)
      this.flag = false
      this.openCloseAllAudioData('openall')
      this.getData(this.alarmString)
    },
    openClose () {
      console.log('关闭所有')
      for (let i in this.alarmData.data) {
        this.alarmData.data[i].is_alarm = false
      }
      this.flag = false
      this.alarmString = []
      this.openCloseAllAudioData('closeall')
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
    changeSwitch2 (item) {
      // 切换这里会出现问题，flase 的时候打不开 true ，实际上是因为 js 传递的是引用，
      // data.is_alarm = Number(data.is_alarm) 这句话将 布尔值变为数字时 影响了 this.alarmData.data 真正的值
      // 解决办法就是 修改了之后，再在 this.editAudioData() 方法中修改一次 data.is_alarm = Boolean(data.is_alarm)
      // 考虑再三，还是后台修改比较好。
      console.log('切换：', item, Number(item.is_alarm), this.alarmData.data[item.id - 1])
      // setTimeout(() => {}, 300)
      this.alarmString = []
      for (let i in this.alarmData.data) {
        if (this.alarmData.data[i].is_alarm) {
          this.alarmString.push(this.alarmData.data[i].en_name)
        }
      }
      console.log(this.alarmString)
      this.flag = false
      this.getData(this.alarmString)
      this.editAudioData(item)
    },
    getAudioInfo () {
      console.log('查询报警数据')
      this.alarmString = []
      axios.get(getAudioInfo)
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            for (let i in res.data.data) {
              // this.alarmData.data.push({
              //   id: res.data.data[i].id,
              //   en_name: res.data.data[i].en_name,
              //   ch_name: res.data.data[i].ch_name,
              //   is_alarm: Boolean(res.data.data[i].is_alarm),
              //   note: res.data.data[i].note
              // })

              Vue.set( // 这样就能被vue监控到，更新视图
                this.alarmData.data,
                i,
                {
                  id: res.data.data[i].id,
                  en_name: res.data.data[i].en_name,
                  ch_name: res.data.data[i].ch_name,
                  is_alarm: Boolean(res.data.data[i].is_alarm),
                  note: res.data.data[i].note
                })

              // 判断哪些设置了报警
              if (res.data.data[i].is_alarm) {
                this.alarmString.push(res.data.data[i].en_name)
              }
            }
            console.log('获取的数据：', this.alarmData.data, this.alarmString)
            this.getData(this.alarmString)
            this.$notify({
              title: '获取成功',
              type: 'success'
            })
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
                id: res.data[i].id,
                title: res.data[i].text,
                artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                src: res.data[i].src,
                pic: res.data[i].small_picture
              })
              this.bigImgInfo.push({
                id: res.data[i].id,
                title: res.data[i].text,
                artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                src: res.data[i].src,
                big_picture: res.data[i].big_picture,
                small_picture: res.data[i].small_picture
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
            this.$notify({
              title: '没有异常数据',
              type: 'success'
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 更改报警设置
    editAudioData (data) {
      console.log('编辑更新数据', data)
      // 后台修改这个值
      // data.is_alarm = Number(data.is_alarm)
      console.log('编辑更新数据', this.alarmData.data[data.id - 1])
      axios.post(editDataUrl, {
        audioData: data
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            // 后台修改这个值
            // data.is_alarm = Boolean(data.is_alarm)
            this.$notify({
              title: '编辑成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '编辑失败',
              message: res.data.errmsg
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 打开关闭全部设置
    openCloseAllAudioData (data) {
      console.log('打开关闭全部设置', data)
      axios.post(openCloseAllUrl, {
        audioData: data
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            // 后台修改这个值
            this.$notify({
              title: '编辑成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '编辑失败',
              message: res.data.errmsg
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 定时获取报警信息
    intervalGet () {
      console.log(this.alarmString)
      let alarmString = this.alarmString.join(',')
      if (this.list3.length !== 0) {
        console.log('定时查询语音报警信息alarmString: ', alarmString, '最大的id号：', this.list3[this.list3.length-1].id)
        axios.get(intervalGetInfo, {
          params: {
            alarmString: alarmString,
            maxid: this.list3[this.list3.length-1].id
          }
        })
          .then((res) => {
            console.log(res)
            if (res.data.length > 0) {
              for (let i in res.data) {
                this.list3.push({
                  id: res.data[i].id,
                  title: res.data[i].text,
                  artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                  src: res.data[i].src,
                  pic: res.data[i].small_picture
                })
                this.bigImgInfo.push({
                  id: res.data[i].id,
                  title: res.data[i].text,
                  artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                  src: res.data[i].src,
                  big_picture: res.data[i].big_picture,
                  small_picture: res.data[i].small_picture
                })
              }
              this.$notify({
                title: '获取 ' + res.data.length + ' 条新的数据',
                type: 'success'
              })
              console.log(this.list3)
            } else {
              // this.$notify.error({
              //   title: '没有数据',
              //   message: res.data.errmsg
              // })
              console.log('2秒--没有数据')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      } else {
        axios.get(intervalGetInfo, {
          params: {
            alarmString: alarmString
          }
        })
          .then((res) => {
            console.log(res)
            if (res.data.length > 0) {
              for (let i in res.data) {
                this.list3.push({
                  id: res.data[i].id,
                  title: res.data[i].text,
                  artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                  src: res.data[i].src,
                  pic: res.data[i].small_picture
                })
                this.bigImgInfo.push({
                  id: res.data[i].id,
                  title: res.data[i].text,
                  artist: dayjs(res.data[i].time).format('YYYY-MM-DD HH:mm:ss'),
                  src: res.data[i].src,
                  big_picture: res.data[i].big_picture,
                  small_picture: res.data[i].small_picture
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
              console.log('this.list3为空，2秒查询--没有数据')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
      
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
