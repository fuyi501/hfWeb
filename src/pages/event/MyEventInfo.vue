<template>
  <div style="cursor: pointer; font-size: 20px; font-weight: bold">
    <p>事件ID：{{ value.id }}</p>
    <p>事件类型：{{ value.category }}</p>
    <p>摄像头位置：{{ value.channel_name }}</p>
    <p>事件信息：{{  value.text }}</p>
    <p>发生时间：{{ value.datetime }}</p>
    <p>状态：{{ value.status }}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      require: true
    }
  },
  mounted () {
    // console.log(this.value)
  }
}
</script>
