<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      // type: Boolean,
      require: true
    }
  },
  computed: {
    type () {
      return this.value !== '' ? 'blue' : 'danger'
    },
    text () {
      return this.value !== '' ? this.value : '未录入人脸'
    }
  },
  methods: {
    handleClick () {
      // this.$emit('input', !this.value)
      // this.$emit('input', this.value === 1 ? 0 : 1)
      console.log(this.value)
    }
  }
}
</script>
