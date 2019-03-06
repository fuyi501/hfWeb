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

    <el-row :gutter="20" style="height:460px;margin-bottom:60px;" >
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
          <ve-pie :data="staffchartsData" :colors="colors"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="">
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
          </div>
          <ve-line :data="eventTypeChartsData" :settings="eventTypeChartsSetting" :loading="eventChartsLoading"></ve-line>
        </el-card>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="20" style="height:460px;margin-top:20px;">
      <el-col :span="8">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>饼图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ve-pie :data="staffchartsData"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>饼图</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div> 
            <ve-line :data="eventTypeChartsData" :settings="eventTypeChartsSetting"></ve-line>
        </el-card>
      </el-col>
    </el-row> -->

  </d2-container>
</template>

<script>
import { httpGet, httpPost } from '@/api/sys/http'
import dayjs from 'dayjs'
var scheduleEvent = require('node-schedule')
const getEventTypeUrl = 'http://192.168.2.254:8360/charts/eventtype'
const timeList = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
export default {
  components: {
  },
  data () {
    this.colors = ['#ff7a45','#40a9ff'],
    this.eventTypeChartsSetting = {
      axisSite: { right: ['异常率'] },
      yAxisType: ['normal', 'percent'],
      yAxisName: ['数值', '比率']
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
      searchTimeList: '',
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
          // { '日期': '18:00', '异常事件': '', '正常事件': '', '异常率': '' },
          // { '日期': '19:00', '异常事件': '', '正常事件': '', '异常率': '' },
          // { '日期': '20:00', '异常事件': '', '正常事件': '', '异常率': '' },
          // { '日期': '21:00', '异常事件': '', '正常事件': '', '异常率': '' },
          // { '日期': '22:00', '异常事件': '', '正常事件': '', '异常率': '' },
        ]
      },
      staffchartsData: {
        columns: ['员工类型', '员工数量'],
        rows: [
          { '员工类型': '正式工', '员工数量': 1393 },
          { '员工类型': '临时工', '员工数量': 3530 }
        ]
      }
    }
  },
  mounted () {
    console.log('首页')
    let nowTime = dayjs().hour()
    console.log('nowTime:', nowTime)
    this.searchTimeList = timeList.slice(0, nowTime-6)
    console.log(this.searchTimeList)
    this.getEventChartsData()
    // let i = 12
    // var intervalEvent = scheduleEvent.scheduleJob('*/100 * * * * *', ()=>{
    //   console.log('每5秒执行一次!')
    //   this.eventTypeChartsData.rows[i+1]['异常事件'] = Math.random()*3000
    //   this.eventTypeChartsData.rows[i+1]['正常事件'] = Math.random()*3000
    //   this.eventTypeChartsData.rows[i+1]['异常率'] = Math.random()
    //   this.eventTypeChartsData.rows.push({ '日期': i + ':00', '异常事件': Math.random()*3000, '正常事件': Math.random()*3000, '异常率': Math.random() },)
    //   i += 1
    // })
    // // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    // this.$once('hook:beforeDestroy', () => {    
    //   console.log('销毁定时器')        
    //   intervalEvent.cancel()                               
    // })
    
  },
  methods: {
    getEventChartsData () {
      console.log('this.chartsTypeInfo.event:', this.chartsTypeInfo.event)
      httpGet(getEventTypeUrl, {
        eventTime: this.searchTimeList.join(','),
        eventType: this.chartsTypeInfo.event
      }).then(res => {
        console.log('首页结果res：', res)
        this.eventTypeChartsData.rows = res.data.length ? res.data : []
      })
    },
    getChartsData () {
      
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
