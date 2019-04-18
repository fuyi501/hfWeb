<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
    <el-dialog
      :title="value"
      :visible.sync="dialogVisible"
      width="30%">
      <el-row type="flex" justify="center">
        <img height="300px" :src="img64"/>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
const getStaffImgUrl = 'http://192.168.2.254:8360/staff/getimg' // 获取员工图片

export default {
  props: {
    value: {
      // type: Boolean,
      require: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      img64: ''
    };
  },
  computed: {
    type () {
      return this.value !== '' ? 'blue' : 'danger'
    },
    text () {
      return this.value !== '' ? '已录入，点击查看' : '未录入人脸'
    }
  },
  methods: {
    handleClick () {
      // this.$emit('input', !this.value)
      // this.$emit('input', this.value === 1 ? 0 : 1)
      console.log(this.value)
      this.dialogVisible = true
      this.getImg()
    },
    getImg () {
      axios.get(getStaffImgUrl, {
        params: {
          img: this.value
        }
      })
        .then((res) => {
          console.log(res)
          if(res.data.data.code === 2000) {
            this.img64 = res.data.data.img
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
