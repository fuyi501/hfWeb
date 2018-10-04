<template>
  <d2-container>
    <template slot="header">
      <el-row type="flex" justify="start">
        <el-upload :before-upload="importExcel" action="default">
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
    <d2-crud
      :columns="columns"
      :data="data"
      title="上传表格"
      add-mode
      :add-button="addButton"
      :pagination="pagination"
      :form-rules="formRules"
      :rowHandle="rowHandle"
      :form-template="formTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      :options="options"/>
  </d2-container>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
const uploadTableUrl = 'https://192.168.9.15:8360/index/savetable'

export default {
  data () {
    return {
      header: [],
      columns: [],
      data: [],
      pagination: {
        pageSize: 20,
        layout: 'prev, pager, next, total'
      },
      rowHandleTemp: {
        columnHeader: '操作',
        width: '190px',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small'
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true
        }
      },
      rowHandle: {
        // columnHeader: ''
      },
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      formTemplate: {},
      formTempStaff: {
        staff_id: {
          title: '工号',
          value: ''
        },
        name: {
          title: '姓名',
          value: ''
        },
        gender: {
          title: '性别',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '男',
                label: '男'
              },
              {
                value: '女',
                label: '女'
              }
            ]
          }
        },
        department: {
          title: '部门',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '生产部',
                label: '生产部'
              },
              {
                value: '研发部',
                label: '研发部'
              },
              {
                value: '行政部',
                label: '行政部'
              }
            ]
          }
        },
        team: {
          title: '班次',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '一班',
                label: '一班'
              },
              {
                value: '二班',
                label: '二班'
              },
              {
                value: '三班',
                label: '三班'
              },
              {
                value: '全勤班',
                label: '全勤班'
              }
            ]
          }
        },
        workshop: {
          title: '车间',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '一车间',
                label: '一车间'
              },
              {
                value: '二车间',
                label: '二车间'
              },
              {
                value: '实验楼',
                label: '实验楼'
              }
            ]
          }
        },
        post: {
          title: '职位',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '工人',
                label: '工人'
              },
              {
                value: '研发人员',
                label: '研发人员'
              },
              {
                value: '行政人员',
                label: '行政人员'
              }
            ]
          }
        },
        telephone: {
          title: '手机号码',
          value: ''
        },
        working_state: {
          title: '工作类型',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '正式工',
                label: '正式工'
              },
              {
                value: '临时工',
                label: '临时工'
              }
            ]
          }
        },
        note: {
          title: '备注',
          value: ''
        }
      },
      formTempSche: {
        t_id: {
          title: '工号',
          value: ''
        },
        date: {
          title: '日期',
          value: '',
          component: {
            name: 'el-date-picker'
          }
        },
        team: {
          title: '班次',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '一班',
                label: '一班'
              },
              {
                value: '二班',
                label: '二班'
              },
              {
                value: '三班',
                label: '三班'
              }
            ]
          }
        },
        begin_time: {
          title: '开始时间',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '08:00:00',
                label: '08:00:00'
              },
              {
                value: '20:00:00',
                label: '20:00:00'
              }
            ]
          }
        },
        end_time: {
          title: '结束时间',
          value: '',
          component: {
            name: 'el-select',
            options: [
              {
                value: '08:00:00',
                label: '08:00:00'
              },
              {
                value: '20:00:00',
                label: '20:00:00'
              }
            ]
          }
        },
        note: {
          title: '备注',
          value: ''
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      formRules: {
        // 员工表
        staff_id: [ { required: true, message: '请输入工号', trigger: 'blur' } ],
        name: [ { required: true, message: '请输入姓名', trigger: 'blur' } ],
        gender: [ { required: true, message: '请选择性别', trigger: 'blur' } ],
        department: [ { required: true, message: '请选择部门', trigger: 'blur' } ],
        team: [ { required: true, message: '请选择班次', trigger: 'blur' } ],
        workshop: [ { required: true, message: '请选择车间', trigger: 'blur' } ],
        post: [ { required: true, message: '请选择职位', trigger: 'blur' } ],
        telephone: [ { pattern: /^1[34578]\d{9}$/, message: '手机号码输入错误' } ],
        working_state: [ { required: true, message: '请工作类型', trigger: 'blur' } ],
        // 排班表
        t_id: [ { required: true, message: '请输入id号', trigger: 'blur' } ],
        date: [ { required: true, message: '请选择日期', trigger: 'blur' } ],
        begin_time: [ { required: true, message: '请选择开始时间', trigger: 'blur' } ],
        end_time: [ { required: true, message: '请选择结束时间', trigger: 'blur' } ]
      },
      options: {
        rowClassName ({ row, rowIndex }) {
          if (rowIndex % 2 === 1) {
            return 'warning-row'
          } else {
            return ''
          }
        }
      }
    }
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    importExcel (file) {
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          console.log('header:', header)
          console.log('results:', results)
          this.columns = []
          this.data = []
          setTimeout(() => {
            console.log('没数据', this.data.length, this.columns)
            this.header = header
            if (header.length === 10) {
              this.formTemplate = this.formTempStaff
            } else if (header.length === 6) {
              this.formTemplate = this.formTempSche
            }
            this.columns = header.map(e => {
              return {
                title: e,
                key: e
              }
            })
            this.data = results
            this.rowHandle = this.rowHandleTemp
            this.$notify({
              title: '导入成功',
              type: 'success'
            })
          }, 600)
        })
      return false
    },
    exportExcel () {
      if (this.data.length > 0) {
        this.$export.excel({
          columns: this.columns,
          data: this.data
        })
          .then(() => {
            this.$notify({
              title: '导出成功',
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
          type: 'warning'
        }).then(() => {
          let tableType = ''
          if (this.header.length === 10) {
            tableType = 'staff'
          } else if (this.header.length === 6) {
            tableType = 'schedule'
          }
          console.log('this.data: ', this.data, tableType)
          axios.post(uploadTableUrl, {
            tableInfo: this.data,
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
                this.$notify.error({
                  title: '上传失败',
                  message: res.data.desc
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
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        if (this.header.length === 6) {
          row.date = dayjs(row.date).format('YYYY-MM-DD')
        }
        this.data.push(row)
        console.log('add this.data: ', this.data)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        if (this.header.length === 6) {
          row.date = dayjs(row.date).format('YYYY-MM-DD')
        }
        this.data.splice(index, 1, row)
        console.log('edit this.data: ', this.data)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.data.splice(index, 1)
        console.log('remove this.data: ', this.data)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    }
  }
}
</script>

<style>
.el-table .warning-row {
  /* background: oldlace; */
}

.el-table .success-row {
  /* background: #f0f9eb; */
}
</style>
