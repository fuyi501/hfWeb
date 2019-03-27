<template>
	<d2-container>
		<el-header style="padding-top:10px; height: 80px;">
			<!-- <el-steps :active="0" :space="500">
				<el-step title="步骤 1:拍摄照片" description="这是一段很长很长很长的描述性文字"></el-step>
				<el-step title="步骤 2:裁剪照片" description="这是一段很长很长很长的描述性文字"></el-step>
				<el-step title="步骤 3:上传服务器" description="这是一段很长很长很长的描述性文字"></el-step>
				<el-step title="步骤 4:更新人脸库" description="这段就没那么长了"></el-step>
			</el-steps> -->
			<span style="font-size: 16px;">（1）请将脸部置于照片中间，眼睛看向摄像头，勿用手、墨镜、口罩等遮挡脸部。 </span><br/>
      <span style="font-size: 16px;">（2）第一张请按照证件照要求拍摄，用于显示；后四张请尽量做出不同的面部表情。 </span><br/>
      <span style="font-size: 16px;">（3）若有佩戴眼镜，请拍摄佩戴和摘下眼镜的照片各至少一张。 </span>
		</el-header>
		<el-main>
			<el-row type="flex" justify="start" :gutter="40">
				<el-col :span="10" style="">
					<video id="videoElement" style="background-color:#fff; height:371px; width:660px;"></video>
					<!-- <div id="wrapper" style="background-color:#fff;"></div> -->

					<el-form :inline="true" :model="imgInfo" :rules="rules" ref="imgInfo" class="demo-form-inline" style="margin-top: 20px;">
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
						<el-form-item label="张数">
							<el-select v-model="imgInfo.count" placeholder="请选择" style="width:150px;">
								<el-option label="第 1 张" :value=1></el-option>
								<el-option label="第 2 张" :value="2"></el-option>
								<el-option label="第 3 张" :value="3"></el-option>
								<el-option label="第 4 张" :value="4"></el-option>
								<el-option label="第 5 张" :value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item><el-button type="primary" @click="takePhoto" :disabled="isTakeImg">拍照</el-button></el-breadcrumb-item>
						<el-breadcrumb-item><el-button type="success" @click="confirmPhoto" :disabled="!isCropImg">裁剪照片</el-button></el-breadcrumb-item>
						<!-- <el-breadcrumb-item><el-button type="success" @click="saveSmallPicUpload" :disabled="!isUpdateImg">上传到服务器</el-button></el-breadcrumb-item> -->
						<!-- <el-breadcrumb-item>
							<el-button type="danger" @click="updateFace" v-loading.fullscreen.lock="loading" :disabled="!isUpdate">
								更新人脸库
							</el-button>
						</el-breadcrumb-item> -->
					</el-breadcrumb>
					<p>录入所有员工的人脸数据后，再点击<strong> 更新人脸库按钮 </strong>进行更新，更新大概需要<strong> 20秒 </strong>时间，请耐心等待！</p>
					<el-button type="danger" @click="updateFace2" v-loading.fullscreen.lock="loading">
						更新人脸库
					</el-button>
				</el-col>
				<el-col :span="14" style="">
					<div style="width:0px;height: 0px;overflow:hidden;">
						<canvas id="canvas" width="600" height="337"></canvas>
					</div>
					<div :model="imgList">
						<el-row :gutter="20" style="margin-bottom:10px">
							<el-col :span="8" v-if=" imgList[0] ">
								<img :src="imgList[0].url" style="height:165px;width:300px;">
								<p>{{imgList[0].name}}</p>
							</el-col>
							<el-col :span="8" v-if=" imgList[1] ">
								<img :src="imgList[1].url" style="height:165px;width:300px;">
								<p>{{imgList[1].name}}</p>
							</el-col>
							<el-col :span="8" v-if=" imgList[2] ">
								<img :src="imgList[2].url" style="height:165px;width:300px;">
								<p>{{imgList[2].name}}</p>
							</el-col>
						</el-row>
						<el-row :gutter="20" style="margin-bottom:10px">
							<el-col :span="8" v-if=" imgList[3] ">
								<img :src="imgList[3].url" style="height:165px;width:300px;">
								<p>{{imgList[3].name}}</p>
							</el-col>
							<el-col :span="8" v-if=" imgList[4] ">
								<img :src="imgList[4].url" style="height:165px;width:300px;">
								<p>{{imgList[4].name}}</p>
							</el-col>
							<el-col :span="8"></el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<el-dialog
				title="裁剪之后的人脸照片"
				:visible.sync="dialogVisible"
				width="768px"
				>
				<el-row>
					<el-col :span="4"><img :src="smallPath + '0.jpg?t=' + Math.random()" style="height:120px;width:120px;"></el-col>
					<el-col :span="4" :offset="1"><img :src="smallPath + '1.jpg?t=' + Math.random()" style="height:120px;width:120px;"></el-col>
					<el-col :span="4" :offset="1"><img :src="smallPath + '2.jpg?t=' + Math.random()" style="height:120px;width:120px;"></el-col>
					<el-col :span="4" :offset="1"><img :src="smallPath + '3.jpg?t=' + Math.random()" style="height:120px;width:120px;"></el-col>
					<el-col :span="4" :offset="1"><img :src="smallPath + '4.jpg?t=' + Math.random()" style="height:120px;width:120px;"></el-col>
				</el-row>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelUpdate">返回重拍</el-button>
					<el-button type="primary" @click="saveSmallPicUpload" :disabled="!isUpdateImg">上传到服务器</el-button>
				</span>
			</el-dialog>
		</el-main>
	</d2-container>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import flvjs from 'flv.js'

// 大图转小图
const bigToSmallUrl = 'http://192.168.2.254:8360/img/bigtosmall'
// 将小图保存到指定目录下
const saveSmallPicUrl = 'http://192.168.2.254:8360/img/savesmallpic'
const updateFaceUrl = 'http://192.168.2.254:8360/img/updateface'
const getDataUrl = 'http://192.168.2.254:8360/img/getstaffinfo'

const getStreamUrl = 'http://192.168.2.254:9000/index/getstream'

export default {
  data () {
		return {
			videoTag: '',
      canvas: '',
			context: '',
			staff_Info: [], // 员工信息
      imgList: ['','','','',''], // 图片列表，存放拍摄的大图
      imgInfo: { // 图片信息，生成小图的名称
        staff_id: '',
        name: '',
        count: 1 // 默认是第一张
			},
			updateStaffInfo: [],
      rules: {
        staff_id: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请选择第几张', trigger: 'change' }
        ]
			},
			dialogVisible: false,
			smallRootPath: 'http://192.168.2.254:8360/static/tempimg/',
			smallPath: '',
			isTakeImg: false, // 是否可以拍照
			isCoverUpdate: false, // 是否更新覆盖
			isCropImg: false, // 是否裁剪图片
			isUpdateImg: false, // 是否上传裁剪后的小图
      isUpdate: false, // 是否更新人脸库
      loading: false
		}
	},
	mounted () {

		console.log('获取员工数据')
		axios.get(getStreamUrl)
			.then((res) => {
				console.log(res)
				if (res.data.errno === 1000) {
					this.$alert('视频流接入错误，请检查是否已接入摄像头', '提示', {
						confirmButtonText: '确定',
						type: 'warning'
					})
				} else {
					if (flvjs.isSupported()) {
						var videoElement = document.getElementById('videoElement');
						var flvPlayer = flvjs.createPlayer({
								type: 'flv',
								url: 'http://192.168.9.12:8080/live?app=live&stream=stream'
						});
						flvPlayer.attachMediaElement(videoElement);
						flvPlayer.load();
						flvPlayer.play();
					}

					this.getStaffData()
					this.videoTag = document.getElementsByTagName('video')
					console.log(this.videoTag)
					this.canvas = document.getElementById('canvas')
					console.log('this.canvas:', this.canvas)
					this.context = this.canvas.getContext('2d')
				}
			})
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
		takePhoto() {
			console.log('拍照')
			if (this.imgInfo.staff_id === '') {
        this.$alert('请输入用户工号', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.imgInfo.name === '') {
        this.$alert('请输入用户姓名', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.imgInfo.count === '') {
        this.$alert('请选择这是第几张照片', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {

				let ishaveInfo = this.staff_Info.find(e => e.value === this.imgInfo.staff_id )

				if(!ishaveInfo){
					this.$alert('该员工信息未在员工信息表中登记，请先到员工管理页面添加该员工信息！', '提示', {
						confirmButtonText: '我知道了',
						type: 'warning'
					})
					this.imgList = ['','','','',''] // 图片列表，存放拍摄的大图
					this.imgInfo = { // 图片信息，生成小图的名称
						staff_id: '',
						name: '',
						count: 1 // 默认是第一张
					}
					return
				}

				console.log('ishaveInfo', ishaveInfo, 'this.isCoverUpdate:', this.isCoverUpdate)

				let ishavePhoto = this.staff_Info.find(e => e.value === this.imgInfo.staff_id && e.photo_name !== '')

				if(ishavePhoto&&!this.isCoverUpdate){
					this.$confirm('该员工人脸数据已存在，是否要更新！', '提示', {
						confirmButtonText: '确定更新',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.isCoverUpdate = true
						this.takePhoto2()
					}).catch(() => {
						this.imgList = ['','','','',''] // 图片列表，存放拍摄的大图
						this.imgInfo = { // 图片信息，生成小图的名称
							staff_id: '',
							name: '',
							count: 1 // 默认是第一张
						}
					})
				}
				let ishavePicture = this.staff_Info.find(e => e.value === this.imgInfo.staff_id && e.photo_name === '')

				if(ishavePicture&&!this.isCoverUpdate){
					this.takePhoto2()
				}
			}
		},
		takePhoto2 () {
			console.log('第', this.imgInfo.count, typeof(this.imgInfo.count))
			if (this.imgList[this.imgInfo.count-1] === '') {
				this.context.drawImage(this.videoTag[0], 0, 0, 600, 337)
				console.log('this.context:', this.context)
				let base64 = this.canvas.toDataURL('image/jpeg')
				// console.log('base64', base64)
				let imgTempName = this.imgInfo.staff_id + '_' + this.imgInfo.name + '_' + this.imgInfo.count + '.jpg'
				Vue.set( // 这样就能被vue监控到，更新视图
				this.imgList,
				Number(this.imgInfo.count)-1,
				{
					name: imgTempName,
					url: base64
				})
				// 使 张数 自动加一
				this.imgInfo.count += 1
				if(this.imgInfo.count > 5) {
					this.imgInfo.count = 5 // 拍摄了五张后，默认为 第五张
					this.isCropImg = true // 裁剪按钮变成可用状态
				}
			} else {
				this.$confirm('第 ' + this.imgInfo.count + ' 张图片已存在，是否覆盖？', '提示', {
					confirmButtonText: '确定覆盖',
					cancelButtonText: '取消覆盖',
					type: 'warning'
				}).then(() => {
					// this.videoTag = document.getElementsByTagName('video')
					// this.canvas = document.getElementById('canvas')
					// console.log('this.canvas:', this.canvas)
					// this.context = this.canvas.getContext('2d')
					this.context.drawImage(this.videoTag[0], 0, 0, 600, 337)
					console.log('this.context:', this.context)
					let base64 = this.canvas.toDataURL('image/jpeg')
					// console.log('base64', base64)
					let imgTempName = this.imgInfo.staff_id + '_' + this.imgInfo.name + '_' + this.imgInfo.count + '.jpg'

					Vue.set( // 这样就能被vue监控到，更新视图
						this.imgList,
						Number(this.imgInfo.count)-1,
						{
							name: imgTempName,
							url: base64
						})
					// 使 张数 自动加一
					this.imgInfo.count += 1
					if(this.imgInfo.count > 5) {
						this.imgInfo.count = 5 // 拍摄了五张后，默认为 第五张
						this.isCropImg = true // 裁剪按钮变成可用状态
					}

					this.$message({
						type: 'success',
						message: '覆盖成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消覆盖'
					})
				})
			}
		},
		confirmPhoto() {
			console.log('确认裁剪照片')
			let imgName = this.imgInfo.staff_id + this.imgInfo.name
			let flag = 0 // 用来判断是否是 五张 照片
			this.imgList.forEach(element => {
				console.log(element.name)
				if (element === '') {
					this.$alert('拍摄需要五张照片，请检查是否拍摄完整', '提示', {
						confirmButtonText: '确定',
						type: 'warning'
					})
				} else if (element.name.split('_')[0] + element.name.split('_')[1] !== imgName) {
					console.log(element.name.split('_')[0] + element.name.split('_')[1])
					this.$alert('上传的照片必须是同一人的五张照片，请检查是否正确', '提示', {
						confirmButtonText: '确定',
						type: 'warning'
					})
				} else {
					console.log('拍摄完成，上传大图变成小图')
					flag += 1
				}
			})
			console.log('flag:', flag)
			if(flag === 5) {
				this.bigImgToSmallUpload()
			}
		},
		// 裁剪图片，将大图变成只有人脸的小图
    bigImgToSmallUpload () {
			console.log('开始上传')
			axios.post(bigToSmallUrl, {
				staffInfo: this.imgInfo,
				bigImgInfo: this.imgList
			})
				.then((res) => {
					console.log(res)
					if (res.data.data.code === 2000) {
						this.dialogVisible = true // 成功后打开显示小图的 dialog
						this.isUpdateImg = true // 成功后上传图片按钮可用
						this.smallPath = this.smallRootPath + this.imgInfo.staff_id + '/'
					} else if (res.data.data.code === 2002) {
						let errList = res.data.data.errList.map(ele => { return Number(ele) + 1})
						console.log(errList)
						this.isUpdateImg = false
						this.$alert('第 ' + errList.join('，') + ' 张图片裁剪出现异常，请重新拍照上传！', '提示', {
							confirmButtonText: '确定',
							type: 'warning'
						})
					} else {
						this.$alert(res.data.data.desc + '，请重新拍照上传', '提示', {
							confirmButtonText: '确定',
							type: 'warning'
						})
					}
				})
				.catch(function (err) {
					console.log(err)
				})
		},
		// 将裁剪后的图片保存到指定路径下, 即上传图片到服务器
    saveSmallPicUpload () {
			console.log('将裁剪后的图片保存到指定路径下')
			axios.post(saveSmallPicUrl, {
				staffInfo: this.imgInfo,
				isCover: false
			})
				.then((res) => {
					console.log(res)
					if (res.data.data.code === 2000) {
						this.$alert('上传成功，请点击<strong>更新人脸库按钮</strong>更新人脸，如果是批量上传，可以上传完所有员工的照片再更新人脸库！', '提示', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: '确定',
							type: 'success',
							callback: action => {
								this.updateStaffInfo.push(this.imgInfo)
								this.dialogVisible = false // 关闭dialog
								this.isUpdate = true // 上传成功后可以更新人脸库
								this.isCoverUpdate = false
								this.isCropImg = false
								this.isUpdateImg = false
								this.imgList = ['','','','',''] // 图片列表，存放拍摄的大图
								this.imgInfo = { // 图片信息，生成小图的名称
									staff_id: '',
									name: '',
									count: 1 // 默认是第一张
								}
							}
						})
					} else if (res.data.data.code === 2002) {
						this.$confirm(res.data.data.desc + '?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$alert('覆盖成功，请点击更新人脸库按钮更新人脸', '提示', {
								confirmButtonText: '确定',
								type: 'success',
								callback: action => {
									this.updateStaffInfo.push(this.imgInfo)
									this.dialogVisible = false // 关闭dialog
									this.isUpdate = true // 上传成功后可以更新人脸库
									this.isCoverUpdate = false
									this.isCropImg = false
									this.isUpdateImg = false
									this.imgList = ['','','','',''] // 图片列表，存放拍摄的大图
									this.imgInfo = { // 图片信息，生成小图的名称
										staff_id: '',
										name: '',
										count: 1 // 默认是第一张
									}
								}
							})
						})
					} 
				})
				.catch(function (err) {
					console.log(err)
				})
		},
		cancelUpdate () {
			this.dialogVisible = false
			this.isUpdateImg = false // 撤销之后，上传图片到服务器按钮不可用
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
							this.isCoverUpdate = false
							this.isCropImg = false
							this.isUpdateImg = false
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
    }
	}
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
container {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
video {
  width: 100%;
  height: 100%;
  display: block;
  background-color: #000;
}
video:focus,
video:active {
  outline: none;
}
</style>
