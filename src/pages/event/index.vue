<template>
  <d2-container>
    <template slot="header">
      <el-row>
        <el-col>
          <el-form 
            :inline="true" 
            :model="searchInfo" 
            size="medium"
            class="demo-form-inline">
            <el-form-item label="事件类型">
              <el-select v-model="searchInfo.event" placeholder="请选择">
                <el-option
                  v-for="item in eventOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="摄像头位置">
              <el-select v-model="searchInfo.video" placeholder="请选择">
                <el-option
                  v-for="item in videoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择时间">
              <el-date-picker
                v-model="searchInfo.time"
                type="datetimerange"
                align="right"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['06:00:00', '22:00:00']">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchEventInfo"><d2-icon name="search"/> 查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="refreshSearchInfo"><d2-icon name="refresh"/> 重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="deleteEventInfo" type="danger"><d2-icon name="trash"/> 批量删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="exportExcel" type="danger"><d2-icon name="upload"/> 导出pdf</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button @click="exportWord" type="danger"><d2-icon name="upload"/> 导出为word</el-button>
            </el-form-item> -->
          </el-form>
        </el-col>
      </el-row>
    </template>

    <d2-crud
      ref="d2Crud"
      v-loading="loading"
      :columns="columns"
      :data="data"
      :options="options"
      :title="eventTitle"
      selection-row
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange">
    </d2-crud>

    <el-row type="flex" justify="center">
      <el-button @click="loadingMoreInfo" type="text" v-if="loadingMore" style="width: 100%; font-size: 16px;"><d2-icon name="download"/> 点击加载更多 </el-button>
      <p v-else> 没有更多数据了！ </p>
    </el-row>
  </d2-container>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import html2Canvas from 'html2canvas'
import domtoimage from 'dom-to-image'
import JsPDF from 'jspdf'
import htmldocx from 'html-docx-js'
import Vue from 'vue'

import MyImg from './MyImg'
import MyEventInfo from './MyEventInfo'

import { httpGet, httpPost } from '@/api/sys/http'
import { mapState } from 'vuex'

const location = {
  "all": "所有摄像头",
  "Fnorth": "一车间一楼北楼梯间",
  "Fsouth": "一车间一楼南楼梯间",
  "Gate": "大门",
  "Lab": "实验楼",
  "Main_road": "盐酸小罐区主干道",
  "Sleft": "二车间一楼左侧楼梯口",
  "Sright": "二车间一楼右侧楼梯口",
  "Tank_eight": "原料大罐区8号罐",
  "Tank_four": "原料大罐区4号罐",
  "Tank_jl": "原料大罐区靠金陵路",
  "Tank_main": "原料大罐区主干道",
  "Area_R1_124": "蒸汽罐",
  "Area_R2_70": "蒸汽缓冲罐",
  "Area_R3_96": "6线外主干道",
  "Area_R4_88": "包装车间大门",
  "Area_R5_77": "液碱罐区",
  "Area_R5_86": "盐酸大罐区3号罐旁",
  "Area_R6_82": "盐酸小罐区主干道",
  "Area_R6_116": "仓库外",
  "Area_R7_126": "一车间靠三期主干道",
  "Area_R8_80": "厂区内主干道",
  "Area_R9_137": "装卸区主干",
  "Area_R10_136": "廊桥2",
  "Area_R11_81": "仓库装货区",
  "Area_R12_114": "货运门",
  "Area_R13_139": "盐酸处理主干入侵报警",
  "Area_R14_102": "二期原料罐区",
  "Area_R15_105": "原料小罐区",
  "Area_R16_108": "机修间外侧",
  "Area_R17_101": "原料大罐区园区内",
  "Area_R18_104": "原料大罐区靠金陵路2",
  "Area_R19_107": "机修班靠金陵路",
  "Area_A6_98": "原料大罐区主干道",
  "Area_A6_94": "原料大罐区8号罐",
  "Area_A6_99": "原料大罐区南面主干道",
  "Area_A6_95": "原料大罐区4号罐",
  "Area_A7_91": "原料小罐区1",
  "Area_A7_83": "盐酸小罐区主干道2",
  "Area_A7_92": "原料小罐区2",
  "Area_A7_84": "水洗塔1",
  "intrusion_xf_123": "办公室消防楼梯",
  "intrusion_xf_125":"一车间消防楼梯",
  "intrusion_xf_141":"二车间消防楼梯1",
  "intrusion_xf_140":"二车间消防楼梯2",
  "intrusion_xf_142":"二车间消防楼梯3"
}

const categoryType = {
  "all": "所有检测类型",
  "face": "人脸检测",
  "hat": "安全帽检测",
  "intrusion": "入侵检测",
  "area": "周界入侵检测",
  "road": "周界入侵检测"
}

const searchEventInfoUrl = 'http://192.168.2.254:8360/event/search' // 查询员工信息
const getAudioInfo = 'http://192.168.2.254:8360/audio/getaudio'

export default {
  components: {
    MyImg,
    MyEventInfo
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  data () {
    return {
      eventOptions: [
        { value: 'all', label: '所有', }, 
        { value: 'face', label: '人脸检测' }, 
        { value: 'intrusion', label: '入侵检测' },
        { value: 'hat', label: '安全帽检测' }, 
        { value: 'area', label: '周界入侵检测' }
      ],
      videoOptions: [
        { value: 'all', label: '所有' }
      ],
      searchInfo: {
        event: 'all',
        video: 'all',
        time: ''
      },
      columns: [
        // { title: '事件ID号', key: 'eventId', width: '200'},
        { title: '事件图片', key: 'eventPicture', width: '600', component: { name: MyImg }},
        { title: '事件信息', key: 'eventInfo', component: { name: MyEventInfo }}
      ],
      rowHandle: {
        width: '200',
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true
        }
      },
      options: {
        highlightCurrentRow: true
      },
      data: [],
      selectionRow: false,
      eventTitle: '异常事件',
      deleteManyInfo: [], // 要批量删除的事件信息
      loading: false,
      selectWrap: '',
      isScroll: true,
      loadingMore: false
    }
  },
  created () {
    this.getAudioInfo()
  },
  mounted () {
    console.log('报警事件查询 mounted')

    // setTimeout(()=>{
    //   this.selectWrap = document.querySelector('.d2-container-full__body')
    //   console.log('this.selectWrap元素', this.selectWrap)
    //   this.selectWrap.addEventListener('scroll', this.handleScroll, true)
    // }, 2000)

  },
  // destroyed: function () {
  //   console.log('离开页面, 清楚滚动事件')
  //   this.selectWrap.removeEventListener('scroll', this.handleScroll)   //  离开页面清除（移除）滚轮滚动事件
  // },
  methods: {
    loadingMoreInfo () {
      this.loading = true
      let sendInfo = {
        event: this.searchInfo.event,
        video: this.searchInfo.video,
        startTime: dayjs(this.searchInfo.time[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs(this.searchInfo.time[1]).format('YYYY-MM-DD HH:mm:ss'),
        maxid: this.data[this.data.length - 1].eventId
      }
      axios.post(searchEventInfoUrl, {
        eventInfo: sendInfo
      })
        .then((res) => {
          console.log('异常事件结果：', res)
          if (res.data.errno === 0) {
            if (res.data.data.length > 0) {
              for (let i in res.data.data) {
                this.data.push({
                  eventId: res.data.data[i].id,
                  eventPicture: res.data.data[i].big_picture,
                  eventInfo: {
                    id: res.data.data[i].id,
                    category: res.data.data[i].category,
                    channel_name: res.data.data[i].channel_name,
                    text: res.data.data[i].text,
                    datetime: res.data.data[i].datetime,
                    status: res.data.data[i].status,
                  }
                })
              }
              this.loading = false
              this.$notify({
                title: '获取成功',
                type: 'success'
              })
            } else {
              this.loadingMore = false
              this.loading = false
              this.$notify({
                title: '没有数据',
                type: 'success'
              })
            }
            
          } else {
            this.$notify.error({
              title: '获取失败',
              message: res.data.errmsg
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleScroll () {
      let sign = 200
      let scrollDistance = this.selectWrap.scrollHeight - this.selectWrap.scrollTop - this.selectWrap.clientHeight
      console.log('scrollDistance', this.selectWrap.scrollHeight, this.selectWrap.scrollTop, this.selectWrap.clientHeight, scrollDistance)
      if(scrollDistance < 2000){
        if (this.isScroll) {
          this.isScroll = false
          
          }
      }
    },
    // 获取报警信息，首先获取到用户报警的设置数据，再根据设置获取音频信息
    getAudioInfo () {
      console.log('查询报警数据')
      axios.get(getAudioInfo)
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            for (let i in res.data.data) {
              this.videoOptions.push({
                value: res.data.data[i].en_name, 
                label: res.data.data[i].ch_name
              })
            }
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
    // 查询按钮
    searchEventInfo () {
      console.log('查询异常事件', this.searchInfo)
      if (this.searchInfo.time === '') {
        this.$alert('选择时间不能为空', '提示', {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
      } else {
        // this.selectWrap.scrollTop = this.selectWrap.scrollTop ? 0 : ''

        let sendInfo = {
          event: this.searchInfo.event,
          video: this.searchInfo.video,
          startTime: dayjs(this.searchInfo.time[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs(this.searchInfo.time[1]).format('YYYY-MM-DD HH:mm:ss')
        }
        this.eventTitle = categoryType[sendInfo.event] + '_' + location[sendInfo.video] + '_' + sendInfo.startTime + '_' + sendInfo.endTime
        this.loading = true
        axios.post(searchEventInfoUrl, {
          eventInfo: sendInfo
        })
          .then((res) => {
            console.log('异常事件结果：', res)
            if (res.data.errno === 0) {
              this.data = []
              if (res.data.data.length > 0) {
                this.loadingMore = true
                for (let i in res.data.data) {
                  this.data.push({
                    eventId: res.data.data[i].id,
                    eventPicture: res.data.data[i].big_picture,
                    eventInfo: {
                      id: res.data.data[i].id,
                      category: res.data.data[i].category,
                      channel_name: res.data.data[i].channel_name,
                      text: res.data.data[i].text,
                      datetime: res.data.data[i].datetime,
                      status: res.data.data[i].status,
                    }
                  })
                }
                this.loading = false
                this.$notify({
                  title: '获取成功',
                  type: 'success'
                })
              } else {
                this.loading = false
                this.eventTitle = '异常事件'
                this.$notify({
                  title: '没有数据',
                  type: 'success'
                })
              }
              
            } else {
              this.loading = false
              this.$notify.error({
                title: '获取失败',
                message: res.data.errmsg
              })
            }
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
      
    },
    // 重置按钮 
    refreshSearchInfo () {
      console.log('重置按钮')
      this.searchInfo = {
        event: 'all',
        video: 'all',
        time: ''
      }
    },
    // 单击某一行
    handleRowClick (row, event, column) {
      console.log('单击：', row)
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    // 处理批量删除
    handleSelectionChange (selection) {
      this.deleteManyInfo = selection.map(ele => {
        return ele.eventId
      })
    },
    deleteEventInfo () {
      console.log(this.deleteManyInfo)
      let newData = this.data.filter(item => {
        return this.deleteManyInfo.indexOf(item.eventId) < 0
      })
      console.log('new:', newData)
      this.data = newData
    },
    exportExcel () {
      console.log('导出excel')
      if (this.data.length > 0) {
        this.getPdf()
      } else {
        this.$message.error('没有数据可以导出')
      }
    },
    exportWord () {
      console.log('导出为word')
      if (this.data.length > 0) {
        var htmlDom = document.querySelector('.d2-container-full__body')
        console.log('this.htmlDom:', htmlDom)
        var converted = htmldocx.asBlob(htmlDom, {orientation: 'landscape', margins: {top: 720}})
        console.log('converted:', converted)

        saveAs(converted, 'test.docx')
      } else {
        this.$message.error('没有数据可以导出')
      }
    },
    //将特定部分转成pdf并下载
    getPdf () {
      var title = this.eventTitle
      var htmlContentDom = document.querySelector('.d2-container-full__body')
      let dom2 = document.getElementsByClassName('d2-container-full__body')[0]
      var pageHeight1 = Number(htmlContentDom.scrollHeight) + 500 + 'px'
      console.log('页面高度：', pageHeight1, Number(htmlContentDom.offsetHeight), htmlContentDom.scrollHeight)

      html2Canvas(htmlContentDom, {
        allowTaint: true,
        height: pageHeight1,
        width: 1250,
        windowHeight: pageHeight1,
        y: pageHeight1
      }).then(function (canvas) {

        // let contentWidth = canvas.width
        let contentWidth = 1150 // 设置为固定值
        let contentHeight = canvas.height

        // 一页pdf显示html页面生成的canvas高度
        let pageHeight = contentWidth / 592.28 * 841.89

        // html的页面高度
        let leftHeight = Number(htmlContentDom.scrollHeight)

        let position = 0 // 用于分页，当超过一页后分页显示
        let imgWidth = 595.28 // 生成页面的宽度
        let imgHeight = 592.28 / contentWidth * canvas.height // 生成页面的高度

        console.log(contentWidth, contentHeight, pageHeight, pageHeight1, leftHeight, imgWidth, imgHeight)

        // 返回图片URL，参数：图片格式和清晰度(0-1)
        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        // 方向默认竖直，尺寸ponits，格式a4【595.28,841.89]
        var pdf = new JsPDF('', 'pt', 'a4')

        if (leftHeight < pageHeight) {
          // 需要dataUrl格式
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            // 需要dataUrl格式
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(title + '.pdf')
      })
    }
  }
}
</script>

<style>
.d2-container-full__header {
  padding: 10px 20px !important;
}
.d2-crud-title {
  font-size: 24px !important;
  font-weight: bold;
}
.demo-form-inline {
  padding-top: 10px;
  padding-bottom: 0px;
}
.el-table .warning-row {
  /* background: oldlace; */
}

.el-table .success-row {
  /* background: #f0f9eb; */
}
</style>
