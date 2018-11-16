<template>
  <d2-container>
    <d2-crud
      :columns="columns"
      :data="data"
      title="员工管理"
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
const addDataUrl = 'https://192.168.100.240:8360/index/addtable'
const getDataUrl = 'https://192.168.100.240:8360/index/gettable'
const editDataUrl = 'https://192.168.100.240:8360/index/edittable'
const deleteDataUrl = 'https://192.168.100.240:8360/index/deletetable'
const tableType = 'staff'
export default {
  data () {
    let validateId = (rule, value, callback) => {
      this.staffIdSet.has(Number(value)) ? callback(new Error('该工号已存在')) : callback()
    }
    return {
      columns: [
        {
          title: '工号',
          key: 'staff_id'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'gender',
          filters: [
            { text: '男', value: '男' },
            { text: '女', value: '女' }
          ],
          filterMethod (value, row) {
            return row.gender === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '部门',
          key: 'department',
          filters: [
            { text: '生产部', value: '生产部' },
            { text: '研发部', value: '研发部' },
            { text: '行政部', value: '行政部' }
          ],
          filterMethod (value, row) {
            return row.department === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '班次',
          key: 'team',
          filters: [
            { text: '一班', value: '一班' },
            { text: '二班', value: '二班' },
            { text: '三班', value: '三班' },
            { text: '全勤班', value: '全勤班' }
          ],
          filterMethod (value, row) {
            return row.team === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '车间',
          key: 'workshop',
          filters: [
            { text: '一车间', value: '一车间' },
            { text: '二车间', value: '二车间' },
            { text: '实验楼', value: '实验楼' }
          ],
          filterMethod (value, row) {
            return row.workshop === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '职位',
          key: 'post',
          filters: [
            { text: '工人', value: '工人' },
            { text: '研发人员', value: '研发人员' },
            { text: '行政人员', value: '行政人员' }
          ],
          filterMethod (value, row) {
            return row.post === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '手机号码',
          key: 'telephone'
        },
        {
          title: '工作类型',
          key: 'working_state',
          filters: [
            { text: '正式工', value: '正式工' },
            { text: '临时工', value: '临时工' }
          ],
          filterMethod (value, row) {
            return row.working_state === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '备注',
          key: 'note'
        }
      ],
      data: [],
      staffIdSet: '',
      pagination: {
        pageSize: 20,
        layout: 'prev, pager, next, total'
      },
      rowHandle: {
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
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      formTemplate: {
        // staff_id: {
        //   title: '工号',
        //   value: ''
        // },
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
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      formRules: {
        // 员工表
        staff_id: [ { required: true, message: '请输入工号', trigger: 'blur' },
          { pattern: /^\d+$/, message: '只能输入数字' },
          { validator: validateId, trigger: 'blur' } ],
        name: [ { required: true, message: '请输入姓名', trigger: 'blur' } ],
        gender: [ { required: true, message: '请选择性别', trigger: 'blur' } ],
        department: [ { required: true, message: '请选择部门', trigger: 'blur' } ],
        team: [ { required: true, message: '请选择班次', trigger: 'blur' } ],
        workshop: [ { required: true, message: '请选择车间', trigger: 'blur' } ],
        post: [ { required: true, message: '请选择职位', trigger: 'blur' } ],
        telephone: [ { pattern: /^1[34578]\d{9}$/, message: '手机号码输入错误' } ],
        working_state: [ { required: true, message: '请工作类型', trigger: 'blur' } ]
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
    console.log('员工管理 mounted')
    this.getData()
  },
  methods: {
    handleRowAdd (row, done) {
      console.log('添加数据')
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.addData(row)
        // this.$message({
        //   message: '保存成功',
        //   type: 'success'
        // })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowEdit ({ index, row }, done) {
      console.log('编辑数据')
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.editData(row)
        // this.$message({
        //   message: '编辑成功',
        //   type: 'success'
        // })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.deleteData(row)
        // this.$message({
        //   message: '删除成功',
        //   type: 'success'
        // })
        done()
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    },
    getData () {
      console.log('查询数据')
      axios.get(getDataUrl, {
        params: {
          type: tableType
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            this.staffIdSet = new Set()
            for (let i in res.data.data) {
              this.staffIdSet.add(res.data.data[i].staff_id)
              this.data.push({
                staff_id: res.data.data[i].staff_id,
                name: res.data.data[i].name,
                gender: res.data.data[i].gender,
                department: res.data.data[i].department,
                team: res.data.data[i].team,
                workshop: res.data.data[i].workshop,
                post: res.data.data[i].post,
                telephone: res.data.data[i].telephone,
                working_state: res.data.data[i].working_state,
                note: res.data.data[i].note
              })
            }
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
    editData (row) {
      console.log('编辑更新数据')
      axios.post(editDataUrl, {
        type: tableType,
        tableData: row
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
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
    deleteData (row) {
      console.log('删除数据')
      axios.post(deleteDataUrl, {
        type: tableType,
        tableData: row
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            this.$notify({
              title: '删除成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '删除失败',
              message: res.data.errmsg
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    addData (row) {
      console.log('添加数据')
      axios.post(addDataUrl, {
        type: tableType,
        tableData: row
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            this.$notify({
              title: '添加成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '添加失败',
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

<style>
.el-table .warning-row {
  /* background: oldlace; */
}

.el-table .success-row {
  /* background: #f0f9eb; */
}
</style>
