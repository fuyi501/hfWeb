<template>
  <d2-container>
    <d2-crud
      :columns="columns"
      :data="data"
      title="排班表"
      add-mode
      :add-button="addButton"
      :pagination="pagination"
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
import axios from 'axios'
import dayjs from 'dayjs'
const addDataUrl = 'https://192.168.9.15:8360/index/addtable'
const getDataUrl = 'https://192.168.9.15:8360/index/gettable'
const editDataUrl = 'https://192.168.9.15:8360/index/edittable'
const deleteDataUrl = 'https://192.168.9.15:8360/index/deletetable'
export default {
  data () {
    return {
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '班次',
          key: 'team',
          filters: [
            { text: '一班', value: '一班' },
            { text: '二班', value: '二班' },
            { text: '三班', value: '三班' }
          ],
          filterMethod (value, row) {
            return row.team === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '开始时间',
          key: 'begin_time',
          filters: [
            { text: '08:00:00', value: '08:00:00' },
            { text: '20:00:00', value: '20:00:00' }
          ],
          filterMethod (value, row) {
            return row.begin_time === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '结束时间',
          key: 'end_time',
          filters: [
            { text: '08:00:00', value: '08:00:00' },
            { text: '20:00:00', value: '20:00:00' }
          ],
          filterMethod (value, row) {
            return row.end_time === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '备注',
          key: 'note'
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
        size: 'small'
      },
      formTemplate: {
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
      }
    }
  },
  mounted () {
    console.log('mounted')
    this.getData()
  },
  methods: {
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        row.date = dayjs(row.date).format('YYYY-MM-DD')
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
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        let newRow = {
          t_id: row.t_id,
          date: dayjs(row.date).format('YYYY-MM-DD'),
          team: row.team,
          begin_time: row.begin_time,
          end_time: row.end_time,
          note: row.note
        }
        console.log(newRow)
        this.data.splice(index, 1, newRow)
        this.editData(newRow)
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
          type: 'sche'
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            for (let i in res.data.data) {
              this.data.push({
                t_id: res.data.data[i].t_id,
                date: dayjs(res.data.data[i].date).format('YYYY-MM-DD'),
                team: res.data.data[i].team,
                begin_time: res.data.data[i].begin_time,
                end_time: res.data.data[i].end_time,
                // begin_time: dayjs(res.data.data[i].date + ' ' + res.data.data[i].begin_time).format('HH:mm:ss'),
                // end_time: dayjs(res.data.data[i].date + ' ' + res.data.data[i].end_time).format('HH:mm:ss'),
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
        type: 'sche',
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
        type: 'sche',
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
        type: 'sche',
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
