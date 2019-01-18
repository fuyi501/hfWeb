<template>
  <d2-container class="page">
    <div v-if="isGet">
      <!-- 上一栏 -->
      <el-row style="margin-left:0px;">
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R2.is_forbidden}" @click="changeState('R2')">{{areaRoad.R2.area_name}}</div>
          <!-- <div class="area-road text-center" @click="changeState('R2')" v-if="areaRoad.R2.is_forbidden">{{areaRoad.R2.area_name}}</div>
          <div class="area-road text-center" style="background-color:red;" @click="changeState('R2')" v-else>{{areaRoad.R2.area_name}}rwer</div> -->
        </el-col>
        <el-col :span="4">
          <el-row>
            <div class="area-road1 text-center3" :class="{'active': areaRoad.R1.is_forbidden}" @click="changeState('R1')">{{areaRoad.R1.area_name}}</div>
          </el-row>
          <el-row>
            <div class="area260 text-center260" :class="{'active': areaRoad.A1.is_forbidden}" @click="changeState('A1')">
              <p>{{areaRoad.A1.area_name}}</p>
              {{areaRoad.A1.ch_name}}
            </div>
          </el-row>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R3.is_forbidden}" @click="changeState('R3')">{{areaRoad.R3.area_name}}</div>
        </el-col>
        <el-col :span="3">
          <div class="area1 area-text" :class="{'active': areaRoad.A2.is_forbidden}" @click="changeState('A2')">
            <p>{{areaRoad.A2.area_name}}</p>
            {{areaRoad.A2.ch_name}}
          </div>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R4.is_forbidden}" @click="changeState('R4')">{{areaRoad.R4.area_name}}</div>
        </el-col>
        <el-col :span="5">
          <el-row>
            <div class="area2 text-center1">办公楼</div>
          </el-row>
          <el-row>
            <div class="area-road1 text-center3" :class="{'active': areaRoad.R5.is_forbidden}" @click="changeState('R5')">{{areaRoad.R5.area_name}}</div>
          </el-row>
          <el-row>
            <div class="area2 area-text160" :class="{'active': areaRoad.A3.is_forbidden}" @click="changeState('A3')">
              <p>{{areaRoad.A3.area_name}}</p>
              {{areaRoad.A3.ch_name}}
            </div>
          </el-row>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R6.is_forbidden}" @click="changeState('R6')">{{areaRoad.R6.area_name}}</div>
        </el-col>
        <el-col :span="3">
          <div class="area1 area-text" :class="{'active': areaRoad.A4.is_forbidden}" @click="changeState('A4')">
            <p>{{areaRoad.A4.area_name}}</p>
            {{areaRoad.A4.ch_name}}
          </div>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R7.is_forbidden}" @click="changeState('R7')" >{{areaRoad.R6.area_name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="area1 area-text" :class="{'active': areaRoad.A5.is_forbidden}" @click="changeState('A5')">
            <p>{{areaRoad.A5.area_name}}</p>
            {{areaRoad.A5.ch_name}}
          </div>
        </el-col>
      </el-row>
      <!-- 中间路 -->
      <el-row style="margin-left:0px;">
        <el-col :span="6">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R8.is_forbidden}" @click="changeState('R8')">{{areaRoad.R8.area_name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R9.is_forbidden}" @click="changeState('R9')">{{areaRoad.R9.area_name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R10.is_forbidden}" @click="changeState('R10')">{{areaRoad.R10.area_name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R11.is_forbidden}" @click="changeState('R11')">{{areaRoad.R11.area_name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R12.is_forbidden}" @click="changeState('R12')">{{areaRoad.R12.area_name}}</div>
        </el-col>
      </el-row>
      <!-- 下一栏 -->
      <el-row style="margin-left:0px;">
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R13.is_forbidden}" @click="changeState('R13')">{{areaRoad.R13.area_name}}</div>
        </el-col>
        <el-col :span="8">
          <div class="area1 area-text" :class="{'active': areaRoad.A6.is_forbidden}" @click="changeState('A6')">
            <p>{{areaRoad.A6.area_name}}</p>
            {{areaRoad.A6.ch_name}}
          </div>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R14.is_forbidden}" @click="changeState('R14')">{{areaRoad.R14.area_name}}</div>
        </el-col>
        <el-col :span="5">
          <div class="area1 area-text" :class="{'active': areaRoad.A7.is_forbidden}" @click="changeState('A7')">
            <p>{{areaRoad.A7.area_name}}</p>
            {{areaRoad.A7.ch_name}}
          </div>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R15.is_forbidden}" @click="changeState('R15')">{{areaRoad.R15.area_name}}</div>
        </el-col>
        <el-col :span="3">
          <div class="area1 area-text" :class="{'active': areaRoad.A8.is_forbidden}" @click="changeState('A8')">
            <p>{{areaRoad.A8.area_name}}</p>
            {{areaRoad.A8.ch_name}}
          </div>
        </el-col>
        <el-col :span="1">
          <div class="area-road text-center" :class="{'active': areaRoad.R16.is_forbidden}" @click="changeState('R16')">{{areaRoad.R16.area_name}}</div>
        </el-col>
        <el-col :span="3">
          <div class="area1 area-text" :class="{'active': areaRoad.A9.is_forbidden}" @click="changeState('A9')">
            <p>{{areaRoad.A9.area_name}}</p>
            {{areaRoad.A9.ch_name}}
          </div>
        </el-col>
      </el-row>
      <!-- 下边路 -->
      <el-row style="margin-left:0px;">
        <el-col :span="10">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R17.is_forbidden}" @click="changeState('R17')">{{areaRoad.R17.area_name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R18.is_forbidden}" @click="changeState('R18')">{{areaRoad.R18.area_name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="area-road60 text-center60" :class="{'active': areaRoad.R19.is_forbidden}" @click="changeState('R19')">{{areaRoad.R19.area_name}}</div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
const getDataUrl = 'http://192.168.100.240:8360/area/areainfo'
const editDataUrl = 'http://192.168.100.240:8360/area/editareainfo'
export default {
  data () {
    return {
      isGet: false,
      areaRoad: {}
    }
  },
  mounted () {
    console.log('区域控制')
    console.log(this['R2'])

    this.getData()
  },
  methods: {
    changeState (value) {
      console.log(value)
      this.areaRoad[value].is_forbidden = this.areaRoad[value].is_forbidden === 0 ? 1 : 0
      console.log(this.areaRoad[value])
      this.editData(this.areaRoad[value])
    },
    getData () {
      console.log('查询数据')
      axios.get(getDataUrl)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            for (let i in res.data) {
              Vue.set( // 这样就能被vue监控到，更新视图
                this.areaRoad,
                res.data[i].area_name,
                {
                  area_name: res.data[i].area_name,
                  ch_name: res.data[i].ch_name,
                  is_forbidden: res.data[i].isforbidden
                })
              // 下面这种获取到的数据不会被 vue 监听到，修改里面的值不会更新视图
              // this.areaRoad[res.data[i].area_name] = {
              //   area_name: res.data[i].area_name,
              //   ch_name: res.data[i].ch_name,
              //   is_forbidden: res.data[i].isforbidden
              // }
            }
            console.log(this.areaRoad)
            this.isGet = true
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
    editData (areaData) {
      console.log('更新区域')
      axios.post(editDataUrl, {
        areaData: areaData
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            this.$notify({
              title: '设置成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '设置失败',
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

<style lang="scss" scoped>
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.active {
  background-color: red !important;
}
.el-col {
  // margin-top: 20px;
}
.area-road {
  min-height:300px;
  background:#fff;
}
.area-road60 {
  min-height:60px;
  background:#fff;
}
.area260 {
  border-radius:50px;
  // min-height:260px;
  background:#99a9bf;
}
.area1 {
  border-radius:50px;
  background:#99a9bf;
}
.area-text { // 300
  text-align:center;
  vertical-align:middle;
  padding: 115px 0px;
}
.area-text160 {
  text-align:center;
  vertical-align:middle;
  padding: 45px 0px;
}
.area2 {
  border-radius:50px;
  // min-height:100px;
  background:#99a9bf;
}
.area3 {
  border-radius:50px;
  min-height:160px;
  background:#99a9bf;
}
.area-road1 {
  min-height:40px;
  background:#fff;
}

.area4 {
  border-radius:50px;
  min-height:250px;
  background:#99a9bf;
}
.area-road2 {
  min-height:250px;
  background:#fff;
}
.text-center {
  text-align:center;
  vertical-align:middle;
  line-height:300px;
}
.text-center260 {
  text-align:center;
  vertical-align:middle;
  // line-height:260px;
  padding: 95px 0px;
}
.text-center1 {
  text-align:center;
  vertical-align:middle;
  line-height:100px;
}
.text-center2 {
  text-align:center;
  vertical-align:middle;
  line-height:160px;
}
.text-center3 {
  text-align:center;
  vertical-align:middle;
  line-height:40px;
}
.text-center60 {
  text-align:center;
  vertical-align:middle;
  line-height:60px;
}
</style>
