<template>
  <d2-container class="page">
    <el-row>
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
  </d2-container>
</template>

<script>
import { httpGet, httpPost } from '@/api/sys/http'
const getDataUrl = 'http://192.168.9.15:8360/index/gettable'

export default {
  components: {
  },
  data () {
    return {
      currentDate: new Date()
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
