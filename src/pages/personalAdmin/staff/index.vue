<template>
  <d2-container>
    <template slot="header">
      <p>删除员工的数据之后，请点击<strong> 更新人脸库按钮 </strong>进行更新，更新大概需要<strong> 40秒 </strong>时间，请耐心等待！</p>
      <el-row>
        <el-col>
          <el-form 
            :inline="true" 
            :model="searchInfo" 
            size="mini"
            class="demo-form-inline">
            <el-form-item label="工号">
              <el-input v-model="searchInfo.staff_id" placeholder="工号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="searchInfo.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchStaffInfo"><d2-icon name="search"/> 查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="refreshStaffInfo"><d2-icon name="refresh"/> 重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="deleteStaffInfo" type="danger"><d2-icon name="trash"/> 批量删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateFace2" type="danger" v-loading.fullscreen.lock="loading"><d2-icon name="refresh"/> 更新人脸库</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      
      
    </template>
    <d2-crud
      ref="d2Crud"
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
      :options="options"
      selection-row
      @selection-change="handleSelectionChange">
    </d2-crud>
  </d2-container>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

import { httpGet, httpPost } from '@/api/sys/http'
import MyTag2 from './MyTag2'
import { mapState } from 'vuex'
const updateFaceUrl = 'http://192.168.9.15:8360/img/updateface' // 更新人脸库
const searchStaffInfoUrl = 'http://192.168.9.15:8360/staff/search' // 查询员工信息
const deleteStaffInfoUrl = 'http://192.168.9.15:8360/staff/deletemanystaffinfo' // 批量删除员工信息
const addDataUrl = 'http://192.168.9.15:8360/index/addtable'
const getDataUrl = 'http://192.168.9.15:8360/index/gettable'
const editDataUrl = 'http://192.168.9.15:8360/index/edittable'
const deleteDataUrl = 'http://192.168.9.15:8360/index/deletetable'
const tableType = 'staff'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  data () {
    // let validateId = (rule, value, callback) => {
    //   this.staffIdSet.has(Number(value)) ? callback(new Error('该工号已存在')) : callback()
    // }
    return {
      searchInfo: {
        staff_id: '',
        name: ''
      },
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
          title: '是否已录入人脸',
          key: 'photo_name',
          width: '170',
          component: {
            name: MyTag2
          }
        },
        {
          title: '有效工作时间',
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
          confirm: true,
          show (index, row) {
            // if (this.info.name === '安环部') {
            //   if (row.working_state === '临时工') {
            //     return true
            //   } else {
            //     return false
            //   }
            // }
            return true
          }
        }
      },
      addButton: {
        icon: 'el-icon-plus',
        size: 'small',
        type: 'primary'
      },
      formTemplate: {
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
        photo_name: {
          title: '是否已录入人脸',
          value: '',
          component: {
            name: MyTag2
          }
        },
        note: {
          title: '有效工作时间',
          value: '',
          component: {
            name: 'el-date-picker',
            span: 12
          }
        }
      },
      formOptions: {
        labelWidth: '120px',
        labelPosition: 'left',
        saveLoading: false
      },
      formRules: {
        // 员工表
        staff_id: [ { required: true, message: '请输入工号', trigger: 'blur' },
          { pattern: /^\d+$/, message: '只能输入数字' }
          // { validator: validateId, trigger: 'blur' } // 取消校验工号的单一性，改在新增点击新增按钮的时候校验。
        ],
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
      },
      loading: false, // 更新人脸库时的加载动画
      selectionRow: false,
      deleteManyInfo: [] // 要批量删除的员工信息
    }
  },
  mounted () {
    console.log('员工管理 mounted', this.info.name, this.rowHandle)
    if (this.info.name === '安环部') {
      this.rowHandle.remove.disabled = (index, row) => {
        console.log(row.working_state)
        if (row.working_state === '临时工') {
          return false
        } else {
          return true
        }
      }
    }
    this.getData()
  },
  methods: {
    handleRowAdd (row, done) {
      console.log('添加数据', row, this.staffIdSet.has(Number(row.staff_id)))
      if (this.staffIdSet.has(Number(row.staff_id))) { // 已存在该工号
        this.$alert('该工号已存在', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.formOptions.saveLoading = true
        setTimeout(() => {
          console.log(row)
          row.note = dayjs(row.note).format('YYYY-MM-DD')
          this.addData(row)
          // this.$message({
          //   message: '保存成功',
          //   type: 'success'
          // })
          done()
          this.formOptions.saveLoading = false
        }, 300)
      }
    },
    handleRowEdit ({ index, row }, done) {
      console.log('编辑数据')
      console.log(this.formTemplate)
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
        if (row.working_state === '临时工') {
          this.staffIdSet.delete(row.staff_id) // 从员工集合中删除 员工id
          this.deleteData(row)
          done()
        } else {
          if (this.info.name === '安环部') {
            this.$alert('您没有权限删除正式员工', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          } else {
            this.staffIdSet.delete(row.staff_id) // 从员工集合中删除 员工id
            this.deleteData(row)
            done()
          }
        }
        // this.$message({
        //   message: '删除成功',
        //   type: 'success'
        // })
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
      // httpGet(getDataUrl, {
      //   type: tableType
      // })
        .then((res) => {
          console.log('员工管理数据：', res)
          if (res.data.errno === 0) {
            this.data = []
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
                telephone: res.data.data[i].telephone === '' || res.data.data[i].telephone === 'null' ? '' : res.data.data[i].telephone,
                working_state: res.data.data[i].working_state,
                photo_name: res.data.data[i].photo_name,
                note: res.data.data[i].note === '' || res.data.data[i].note === 'null' ? '' : res.data.data[i].note
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
    },
    updateFace2 () {
			this.$confirm('确定要更新人脸库么？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.updateFace()
			}).catch(()=>{
				console.log('取消')
			})
		},
		updateFace () {
			console.log('更新人脸库')
      this.loading = true
      setTimeout(() => {
        if (this.loading) {
          this.loading = false
          this.$alert('更新失败, 请再次点击更新人脸库', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      }, 45000)
      
      axios.post(updateFaceUrl, {
        updateStaffInfo: [],
        type: 'delete'
      })
        .then((res) => {
          console.log(res)
          if (res.data.data.code === 2000) {
            this.loading = false
            this.$notify({
              title: '更新成功',
              type: 'success'
            })
          } else if (res.data.data.code === 2002) {
            this.$alert('更新失败', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询按钮
    searchStaffInfo () {
      console.log('查询员工信息')
      axios.post(searchStaffInfoUrl, {
        staffInfo: this.searchInfo
      })
        .then((res) => {
          console.log('查询员工信息', res)
          if (res.data.errno === 0) {
            this.data = []
            for (let i in res.data.data) {
              this.data.push({
                staff_id: res.data.data[i].staff_id,
                name: res.data.data[i].name,
                gender: res.data.data[i].gender,
                department: res.data.data[i].department,
                team: res.data.data[i].team,
                workshop: res.data.data[i].workshop,
                post: res.data.data[i].post,
                telephone: res.data.data[i].telephone === '' || res.data.data[i].telephone === 'null' ? '' : res.data.data[i].telephone,
                working_state: res.data.data[i].working_state,
                photo_name: res.data.data[i].photo_name,
                note: res.data.data[i].note === '' || res.data.data[i].note === 'null' ? '' : res.data.data[i].note
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
        .catch((err) => {
          console.log(err)
        })
    },
    // 重置按钮 
    refreshStaffInfo () {
      console.log('重置按钮')
      this.getData()
    },
    // 批量删除按钮
    deleteStaffInfo () {
      if(this.deleteManyInfo.length > 0) {
        this.$confirm('确定删除这些员工的信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('批量删除员工信息')
          axios.post(deleteStaffInfoUrl, {
            deleteStaffInfo: this.deleteManyInfo
          })
            .then((res) => {
              console.log('批量删除员工信息', res)
              if (res.data.errno === 0) {
                this.getData()
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
            .catch((err) => {
              console.log(err)
            })
        }).catch(()=>{
          console.log('取消')
        })
      } else {
        this.$alert('请先选择要删除的员工', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    // 处理批量删除
    handleSelectionChange (selection) {
      console.log('多选：', selection)
      this.deleteManyInfo = []
      this.deleteManyInfo = selection
      console.log(this.deleteManyInfo)
    }
  }
}
</script>

<style>
.d2-container-full__header {
  padding: 0px 20px !important;
}
.demo-form-inline {
  /* padding-top: 20px; */
  padding-bottom: 0px;
}
.el-table .warning-row {
  /* background: oldlace; */
}

.el-table .success-row {
  /* background: #f0f9eb; */
}
</style>
