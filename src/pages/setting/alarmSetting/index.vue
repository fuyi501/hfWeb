<template>
  <d2-container>
    <d2-crud
      :columns="columns"
      :data="data"
      title="语音报警区域设置"
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
      @dialog-cancel="handleDialogCancel"/>
  </d2-container>
</template>

<script>
import MyTag from './MyTag'
import MyTag2 from './MyTag2'
import axios from 'axios'
const addDataUrl = 'http://192.168.17.15:8360/audio/addaudio'
const getDataUrl = 'http://192.168.17.15:8360/audio/getaudio'
const editDataUrl = 'http://192.168.17.15:8360/audio/editaudio'
const deleteDataUrl = 'http://192.168.17.15:8360/audio/deleteaudio'
export default {
  components: {
    MyTag
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          key: 'id'
          // width: '80'
        },
        {
          title: '英文简称',
          key: 'en_name'
          // width: '140'
        },
        {
          title: '中文名称',
          key: 'ch_name'
          // width: '200'
        },
        {
          title: '是否报警',
          key: 'is_alarm',
          // width: '100',
          component: {
            name: MyTag2
          }
        },
        {
          title: '备注',
          key: 'note'
          // width: '200'
        }
      ],
      data: [],
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
        size: 'medium',
        type: 'primary'
      },
      formTemplate: {
        id: {
          title: '序号',
          value: ''
        },
        en_name: {
          title: '英文简称',
          value: ''
        },
        ch_name: {
          title: '中文名称',
          value: ''
        },
        is_alarm: {
          title: '是否报警',
          value: 1,
          component: {
            name: MyTag
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
        // 排班表
        id: [ { required: true, message: '请输入序号', trigger: 'blur' } ],
        en_name: [ { required: true, message: '请输入英文简称', trigger: 'blur' } ],
        ch_name: [ { required: true, message: '请输入中文名称', trigger: 'blur' } ],
        is_alarm: [ { required: true, message: '请选择是否报警', trigger: 'blur' } ]
      }
    }
  },
  mounted () {
    console.log('语音报警设置 mounted')
    this.getData()
  },
  methods: {
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log('添加数据:', row)
        row.id = Number(row.id)
        this.addData(row)
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        let newRow = {
          id: row.id,
          en_name: row.en_name,
          ch_name: row.ch_name,
          is_alarm: row.is_alarm,
          note: row.note
        }
        console.log(newRow)
        this.data.splice(index, 1, newRow)
        this.editData(newRow)
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.deleteData(row)
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
      axios.get(getDataUrl)
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            for (let i in res.data.data) {
              this.data.push({
                id: res.data.data[i].id,
                en_name: res.data.data[i].en_name,
                ch_name: res.data.data[i].ch_name,
                is_alarm: res.data.data[i].is_alarm,
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
        audioData: row
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
        audioData: row
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
        audioData: row
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
