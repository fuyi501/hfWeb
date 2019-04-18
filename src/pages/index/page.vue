<template>
  <d2-container class="page">
    <!-- <el-row :gutter="20">
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:#2D8CF0;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:40px;color:#fff;margin:auto;margin-top:40px;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;margin-left:25%;margin-top:10px;text-align:center;color:#595959;">800</span><br/>
              <span style="margin-left:30%;color:#8c8c8c;">操作按钮</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:#2D8CF0;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:40px;color:#fff;margin:auto;margin-top:40px;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;margin-left:25%;margin-top:10px;text-align:center;color:#595959;">800</span><br/>
              <span style="margin-left:30%;color:#8c8c8c;">操作按钮</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:#2D8CF0;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:40px;color:#fff;margin:auto;margin-top:40px;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;margin-left:25%;margin-top:10px;text-align:center;color:#595959;">800</span><br/>
              <span style="margin-left:30%;color:#8c8c8c;">操作按钮</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:#2D8CF0;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:40px;color:#fff;margin:auto;margin-top:40px;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;margin-left:25%;margin-top:10px;text-align:center;color:#595959;">800</span><br/>
              <span style="margin-left:30%;color:#8c8c8c;">操作按钮</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:#2D8CF0;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:40px;color:#fff;margin:auto;margin-top:40px;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;margin-left:25%;margin-top:10px;text-align:center;color:#595959;">800</span><br/>
              <span style="margin-left:30%;color:#8c8c8c;">操作按钮</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:#2D8CF0;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:40px;color:#fff;margin:auto;margin-top:40px;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;margin-left:25%;margin-top:10px;text-align:center;color:#595959;">800</span><br/>
              <span style="margin-left:30%;color:#8c8c8c;">操作按钮</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row :gutter="20" style="height:400px;margin-bottom:30px;" >
      <el-col :span="16">
        <el-row :gutter="20" type="flex" justify="start" style="height: 50%;">
          <el-col :span="8">
            <el-card style="">
              <div slot="header" class="clearfix">
                <span>今日总事件</span>
              </div>
              <span style="font-size: 64px; color: #409EFF;"> {{ mainInfo.allEvent }} </span> <span>件</span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card style="">
              <div slot="header" class="clearfix">
                <span>今日总异常事件</span>
              </div>
              <span style="font-size: 64px; color: #F56C6C;"> {{ mainInfo.ycEvent }} </span> <span>件</span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card style="">
              <div slot="header" class="clearfix">
                <span>今日总正常事件</span>
              </div>
              <span style="font-size: 64px; color: #67C23A;"> {{ mainInfo.zcEvent }} </span> <span>件</span>
              <!-- <ve-histogram :data="newStaff" :settings="chartSettings" :colors="colors"></ve-histogram> -->
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" style="margin-top: 50px;">
          <el-col :span="8">
            <el-card style="">
              <div slot="header" class="clearfix">
                <span>总员工</span>
              </div>
              <span style="font-size: 64px; color: #409EFF;"> {{ mainInfo.allPerson }} </span> <span>人</span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card style="">
              <div slot="header" class="clearfix">
                <span>今日新增员工</span>
              </div>
              <span style="font-size: 64px; color: #67C23A;"> {{ mainInfo.newPerson }} </span> <span>人</span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <!-- <el-card style="">
              <div slot="header" class="clearfix">
                <span>新增员工</span>
              </div>
            </el-card> -->
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-card style="">
          <div slot="header" class="clearfix">
            <span>员工信息</span>
              <!-- <el-select style="float: right;" 
                @change="getEventChartsData"
                v-model="chartsTypeInfo.event" 
                size="mini" 
                placeholder="请选择">
                <el-option
                  v-for="item in eventOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
          </div>
          <div style="height: 300px; ">
            <ve-pie :data="staffchartsData" :colors="colors" :settings="chartSettings"></ve-pie>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height:460px;margin-top:20px;">
      <el-col :span="24">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>事件统计</span>
            <el-select style="float: right;" 
              @change="getEventChartsData"
              v-model="chartsTypeInfo.event" 
              size="mini" 
              placeholder="请选择">
              <el-option
                v-for="item in eventOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker style="float: right;" 
              v-model="searchDate"
              align="right"
              size="mini"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <ve-line :data="eventTypeChartsData" :settings="eventTypeChartsSetting"></ve-line>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { httpGet, httpPost } from '@/api/sys/http'
import dayjs from 'dayjs'
var scheduleEvent = require('node-schedule')
const getEventTypeUrl = 'http://192.168.2.254:8360/charts/eventtype'
const getMainInfoUrl = 'http://192.168.2.254:8360/charts/maininfo'
const timeList = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
export default {
  components: {
  },
  data () {
    this.colors = ['#40a9ff','#ff7a45'],
    this.eventTypeChartsSetting = {
      axisSite: { right: ['异常率'] },
      yAxisType: ['normal', 'percent'],
      yAxisName: ['数值', '比率']
    }
    this.chartSettings = {
      radius: 100,
      offsetY: 160,
      height: 200
    }
    return {
      eventOptions: [
        { value: 'all', label: '所有', }, 
        { value: 'face', label: '人脸检测' }, 
        { value: 'intrusion', label: '入侵检测' },
        { value: 'hat', label: '安全帽检测' }, 
        { value: 'area', label: '周界入侵检测' }
      ],
      chartsTypeInfo: {
        event: 'all',
      },
      eventChartsLoading: false,
      searchDate: '',
      eventTypeChartsData: {
        columns: ['日期', '异常事件', '正常事件', '异常率'],
        rows: [
          { '日期': '06:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '07:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '08:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '09:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '10:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '11:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '12:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '13:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '14:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '15:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '16:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '17:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '18:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '19:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '20:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '21:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
          { '日期': '22:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        ]
      },
      staffchartsData: {
        columns: ['员工类型', '员工数量'],
        rows: [
          { '员工类型': '正式工', '员工数量': 168 },
          { '员工类型': '临时工', '员工数量': 57 }
        ]
      },
      newStaff: {
        columns: ['日期', '新增员工'],
        rows: [
          { '日期': '3/17', '新增员工': 5 },
          { '日期': '3/18', '新增员工': 1 },
          { '日期': '3/19', '新增员工': 2 },
          { '日期': '3/20', '新增员工': 3 },
          { '日期': '3/21', '新增员工': 1 },
          { '日期': '3/22', '新增员工': 2 }
        ]
      },
      mainInfo: {
        allEvent: 0, // 总事件
        ycEvent: 0, // 异常事件
        zcEvent: 0, // 正常事件
        allPerson: 0, // 总人数
        newPerson: 0 // 新增人数
      },
      defaultData: [
        { '日期': '06:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '07:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '08:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '09:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '10:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '11:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '12:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '13:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '14:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '15:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '16:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '17:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '18:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '19:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '20:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '21:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
        { '日期': '22:00', '异常事件': 0, '正常事件': 0, '异常率': 0 },
      ]
    }
  },
  created () {
    console.log('created')
    this.searchDate = dayjs().format('YYYY-MM-DD')
    console.log(this.searchDate)
    this.getMainInfoData()
    this.getEventChartsData()
  },
  mounted () {
    console.log('首页')
    // this.searchDate = dayjs().format('YYYY-MM-DD')
    // console.log(this.searchDate)
    
    // this.getEventChartsData()

    var intervalEvent = scheduleEvent.scheduleJob('*/60 * * * * *', ()=>{
      console.log('每1min执行一次!')
      this.getMainInfoData()
      // this.getEventChartsData()
    })
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {    
      console.log('销毁定时器')        
      intervalEvent.cancel()                               
    })
    
  },
  methods: {
    getEventChartsData () {
      console.log('this.chartsTypeInfo.event:', this.chartsTypeInfo.event)
      httpGet(getEventTypeUrl, {
        eventTime: this.searchDate,
        eventType: this.chartsTypeInfo.event
      }).then(res => {
        console.log('首页结果res：', res)
        this.eventTypeChartsData.rows = res.data.length ? res.data : this.defaultData
        if (res.data.length === 0) {
          this.$notify({
            title: '成功',
            message: '没有数据',
            type: 'success'
          })
        }
      })
    },
    getMainInfoData () {
      console.log('getMainInfoData:')
      httpGet(getMainInfoUrl).then(res => {
        console.log('首页结果res：', res)
        this.mainInfo = res.data
        
      })
    }

  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}

.inner {
  position: absolute;
  top: 20px;
  right:  20px;
  bottom: 20px;
  left: 20px;
}
</style>
