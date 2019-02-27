<template>
  <d2-container >
    <template slot="header">
      <el-row type="flex" justify="start">
        <el-upload :before-upload="handleUpload" action="default">
          <el-button type="success">
            <d2-icon name="file-excel-o"/>
            选择要导入的 .xlsx 表格
          </el-button>
        </el-upload>
        <el-button style="margin-left:20px" type="primary" @click="exportExcel">
          <d2-icon name="download"/>
          导出 Excel
        </el-button>
        <el-button style="margin-left:20px" type="danger" @click="uploadTable">
          <d2-icon name="upload"/>
          上传到服务器
        </el-button>
      </el-row>
    </template>
    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label">
      </el-table-column>
      <el-table-column
        v-if="operation"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑信息"
      :visible.sync="dialogVisible"
      width="50%"
      @open="openDialog"
      center>
      <el-form :rules="rules" :label-position="labelPosition" label-width="120px" :model="row" ref="row">
        <template v-for="(item, index) in row.rowInfo">
          <el-form-item
            v-if="item.label === 'telephone'"
            :prop="'rowInfo.' + index + '.label'"
            :key="index"
            :label="item.label">
            <el-input v-model="item.data"></el-input>
          </el-form-item>
          <el-form-item
            v-else
            :key="index"
            :label="item.label">
            <el-input v-model="item.data"></el-input>
          </el-form-item>
        </template>
        <!-- <el-form-item
          v-for="(item, index) in rowInfo"
          :key="index"
          :label="item.label">
          <el-input v-model="item.data"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelModify">取消</el-button>
        <el-button type="primary" @click="confirmModify">确定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import axios from 'axios'
const uploadTableUrl = 'http://192.168.9.15:8360/index/savetable'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      console.log(rule, '值：', value)
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      console.log('检测：', reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的11手机号'))
      }
    }
    return {
      operation: false,
      dialogVisible: false,
      labelPosition: 'left',
      row: {
        rowInfo: []
      },
      tempIndex: 0,
      header: [],
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      },
      rules: {
        telephone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleUpload (file) {
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          console.log('header:', header)
          this.header = header
          console.log('results:', results)
          this.table.columns = header.map(e => {
            return {
              label: e,
              prop: e
            }
          })
          this.table.data = results
          this.operation = true
        })
      return false
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.row.rowInfo = []
      this.tempIndex = index
      this.dialogVisible = true
      let temp = ''
      for (let key in this.header) {
        temp = row[this.header[key]] ? row[this.header[key]] : ''
        this.row.rowInfo.push({
          label: this.header[key],
          data: temp
        })
      }
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.table.data.splice(index, 1)
    },
    openDialog () {
      console.log('打开了')
    },
    cancelModify () {
      this.dialogVisible = false
      this.row.rowInfo = []
    },
    confirmModify () {
      console.log(this.row.rowInfo)
      let temp = {}
      for (let i in this.row.rowInfo) {
        temp[this.row.rowInfo[i].label] = this.row.rowInfo[i].data
      }
      console.log(temp)
      this.table.data.splice(this.tempIndex, 1, temp)
      this.dialogVisible = false
      this.row.rowInfo = []
    },
    exportExcel () {
      if (this.table.data.length > 0) {
        this.$export.excel({
          columns: this.table.columns,
          data: this.table.data
        })
          .then(() => {
            this.$notify({
              title: '成功导出表格',
              type: 'success'
            })
          })
      } else {
        this.$message.error('请先上传文件')
      }
    },
    uploadTable () {
      console.log(this.header.length)
      if (this.header.length > 0) {
        this.$confirm('确认要上传？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let tableType = ''
          if (this.header.length === 10) {
            tableType = 'staff'
          } else if (this.header.length === 6) {
            tableType = 'schedule'
          }
          axios.post(uploadTableUrl, {
            tableInfo: this.table.data,
            tableType: tableType
          })
            .then((res) => {
              console.log(res)
              if (res.data.code === 2000) {
                this.$notify({
                  title: '上传成功',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '上传失败',
                  message: res.data.desc,
                  type: 'success'
                })
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }).catch(() => {
        })
      } else {
        this.$message.error('请先上传文件')
      }
    }
  }
}
</script>
