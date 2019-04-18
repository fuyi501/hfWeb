<template>
  <d2-container >
    <template slot="header">用户照片上传</template>
    <div class="d2-mb">
      <el-row>
        <el-form :inline="true" :model="imgInfo" :rules="rules" ref="imgInfo" class="demo-form-inline" style="margin-top: 0px;">
          <el-form-item label="工号" prop="staff_id" >
            <!-- <el-input v-model="imgInfo.staff_id" placeholder="请输入用户工号" style="width:150px;"></el-input> -->
            <el-autocomplete  style="width:150px;"
              v-model="imgInfo.staff_id"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入用户工号"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name" >
            <el-input v-model="imgInfo.name" placeholder="请输入用户姓名" style="width:150px;"></el-input>
          </el-form-item>
        </el-form>
        <el-upload
          class="upload-demo"
          ref="upload"
          :multiple="true"
          :action="uploadUrl"
          :show-file-list="true"
          :data="imgInfo"
          name='avatar'
          :file-list="fileList2"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePreview"
          :on-change="change"
          :on-remove="remove"
          list-type="picture"
          :auto-upload="false">
          <el-button slot="trigger" type="primary">
            <d2-icon name="picture-o"/>
            选取图片
          </el-button>
          <el-button style="margin-left: 10px;" type="success" @click="submitUpload">
            <d2-icon name="upload"/>
            上传到服务器
          </el-button>
					<el-button type="danger" @click="updateFace2" v-loading.fullscreen.lock="loading" v-if="isUpdate">
						更新人脸库
					</el-button>
          <div slot="tip" class="el-upload__tip" style="font-size:14px">只能上传
            <span style="color: red;">jpg</span>
            文件，jpg 文件请以：
            <span style="color: red;">工号_姓名_编号.jpg</span> 格式添加上传（编号为1-5）。
          </div>
          <p>上传所有员工的人脸数据后，再点击<strong> 更新人脸库按钮 </strong>进行更新，更新大概需要<strong> 20秒 </strong>时间，请耐心等待！</p>
        </el-upload>
      </el-row>
    </div>
  </d2-container>
</template>

<script>

import axios from 'axios'

const updateFaceUrl = 'http://192.168.2.254:8360/uploadimg/updateface'
const getDataUrl = 'http://192.168.2.254:8360/img/getstaffinfo'

export default {
  data () {
    return {
      uploadUrl: 'http://192.168.2.254:8360/uploadimg/saveimg',
      imageUrl: '',
      fileList2: [],
      staff_Info: [], // 员工信息
      imgInfo: { // 图片信息，生成小图的名称
        staff_id: '',
        name: '',
        count: 0
      },
      rules: {
        staff_id: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ]
      },
      checkInfo: [],
      loading: false,
      isUpdate: false,
      updateStaffInfo: [],
      uploadCount: 0
    }
  },
  mounted () {
    // this.getStaffData()
  },
  methods: {
    getStaffData () {
      console.log('获取员工数据')
      axios.get(getDataUrl)
        .then((res) => {
          console.log(res)
          if (res.data.errno === 0) {
            for (let i in res.data.data) {
              this.staff_Info.push({
                value: String(res.data.data[i].staff_id), // 这里必须是 value 
                name: res.data.data[i].name,
                photo_name: res.data.data[i].photo_name
              })
            }
            console.log(this.staff_Info)
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
    querySearchAsync(queryString, cb) {
			var staff_Info = this.staff_Info;
			var results = queryString ? staff_Info.filter(this.createStateFilter(queryString)) : staff_Info;
			console.log('results:', results)
			cb(results);
    },
    createStateFilter(queryString) {
			return (state) => {
				console.log('state:', state)
				return (state.value.indexOf(queryString) !== -1);
			};
		},
		handleSelect(item) {
			console.log(item);
			this.imgInfo.name = item.name
		},
    handleAvatarSuccess (res, file) {
      console.log('返回', res, file)
      this.uploadCount += 1
      if (res.data.code === 2000) {
        this.$notify({
          title: '上传成功',
          type: 'success'
        })
      }
      if (this.uploadCount === 3) {
        this.updateStaffInfo.push(this.imgInfo)
        setTimeout(()=>{
          console.log('清空列表')
          this.$refs.upload.clearFiles()
          this.imgInfo.count = 0
          this.checkInfo = []
          this.uploadCount = 0
          this.isUpdate = true
        }, 2000)
      }
    },
    handlePreview (file) {
      console.log(file)
    },
    change (file, fileList) {
      // this.fileList2.push(file)
      this.checkInfo = file.name.split('_')
      console.log(this.checkInfo)
      this.imgInfo.count += 1
      console.log(file.name, this.fileList2)
    },
    remove (file, fileList) {
      this.imgInfo.count -= 1
      let index = this.fileList2.indexOf(file)
      console.log('index:', index)
      this.fileList2.splice(index, 1)
      console.log('remove: ', file, this.fileList2)
    },
    submitUpload () {
      console.log(this.imgInfo.count, this.fileList2)
      if (this.imgInfo.count === 5) {
        if (this.imgInfo.staff_id !== '' && this.imgInfo.name !== '') {
          if(this.imgInfo.staff_id === this.checkInfo[0] && this.imgInfo.name === this.checkInfo[1]){
            this.$refs.upload.submit()
          }else{
            this.$message.error('输入的工号和姓名和上传的图片不一致')
          }
        } else {
          this.$message.error('请输入完整的用户工号和姓名')
        }
      } else {
        this.$message.error('请选择5张照片')
      }
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
      if (this.isUpdate) {
        this.loading = true
        setTimeout(() => {
          if (this.loading) {
            this.loading = false
            this.$alert('更新失败, 请再次点击更新人脸库', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        }, 25000)
        console.log('imgInfo:', this.updateStaffInfo)
        axios.post(updateFaceUrl, {
          updateStaffInfo: this.updateStaffInfo
        })
          .then((res) => {
            console.log(res)
            if (res.data.data.code === 2000) {
              this.isUpdate = false
							this.loading = false
							this.updateStaffInfo = []
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
      } else {
        this.$alert('请先拍摄照片上传到服务器后再更新人脸库！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    beforeAvatarUpload (file) {
      // console.log('上传之前：', file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
