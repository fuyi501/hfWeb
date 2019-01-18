<template>
  <d2-container class="page">
    <el-row :gutter="20">
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
    </el-row>

    <el-row :gutter="20" style="height:460px;margin-top:20px;">
      <el-col :span="8">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>饼图</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
          <ve-pie :data="chartData" v-bind="pubSetting"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>饼图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="height:460px;margin-top:20px;">
      <el-col :span="8">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>饼图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ve-pie :data="chartData" v-bind="pubSetting"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="height:460px;">
          <div slot="header" class="clearfix">
            <span>饼图</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
          <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { httpGet, httpPost } from '@/api/sys/http'
const getDataUrl = 'http://192.168.100.240:8360/index/gettable'

export default {
  components: {
  },
  data () {
    return {
      currentDate: new Date(),
      chartData: {
        columns: ['工作类型', '员工数量'],
        rows: [
          { '工作类型': '正式工', '员工数量': 138 },
          { '工作类型': '临时工', '员工数量': 50 }
        ]
      },
      chartSettings1: {
        axisSite: { right: ['异常率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      },
      chartData1: {
        columns: ['日期', '异常事件', '正常事件', '异常率'],
        rows: [
          { '日期': '1/1', '异常事件': 1393, '正常事件': 1093, '异常率': 0.32 },
          { '日期': '1/2', '异常事件': 3530, '正常事件': 3230, '异常率': 0.26 },
          { '日期': '1/3', '异常事件': 2923, '正常事件': 2623, '异常率': 0.76 },
          { '日期': '1/4', '异常事件': 1723, '正常事件': 1423, '异常率': 0.49 },
          { '日期': '1/5', '异常事件': 3792, '正常事件': 3492, '异常率': 0.323 },
          { '日期': '1/6', '异常事件': 4593, '正常事件': 4293, '异常率': 0.78 }
        ]
      },
      pubSetting: {
        height: '360px'
      }
    }
  },
  mounted () {
    console.log('首页')
    httpGet(getDataUrl, {
          type: 'staff'
        }).then(res=>{
          console.log('首页结果res：', res)
        })
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
</style>
