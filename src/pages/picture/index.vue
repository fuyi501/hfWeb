<template>
  <d2-container >
    <template slot="header">用户照片上传</template>
    <div class="d2-mb">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadUrl"
        :show-file-list="true"
        :data="userInfo"
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
        <div slot="tip" class="el-upload__tip">只能上传 jpg/png 文件</div>
      </el-upload>
    </div>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      uploadUrl: 'http://192.168.9.15:8360/index/saveimg',
      imageUrl: '',
      fileList2: [],
      userInfo: { uid: 12345 }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log('返回', res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
      if (res.code === 2000) {
        this.$notify({
          title: '上传成功',
          type: 'success'
        })
      } else if (res.code === 2001) {
        this.$alert('图片名称已存在，请重新上传', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          let index = this.fileList2.indexOf(file)
          console.log('index:', index)
          this.fileList2.splice(index, 1)
        }).catch(() => {
          console.log('错误')
        })
      } else if (res.code === 2002) {
        this.$confirm('文件格式错误', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          let index = this.fileList2.indexOf(file)
          console.log('index:', index)
          this.fileList2.splice(index, 1)
        }).catch(() => {
          console.log('错误')
        })
      }
    },
    handlePreview (file) {
      console.log(file)
    },
    change (file, fileList) {
      // this.fileList2.push(file)
      console.log(file.name, this.fileList2)
    },
    remove (file, fileList) {
      let index = this.fileList2.indexOf(file)
      console.log('index:', index)
      this.fileList2.splice(index, 1)
      console.log('remove: ', file, this.fileList2)
    },
    submitUpload () {
      this.$refs.upload.submit()
      // if (this.fileList2.length > 0) {
      //   this.$refs.upload.submit()
      // } else {
      //   this.$message.error('请先选择照片')
      // }
    },
    beforeAvatarUpload (file) {
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
