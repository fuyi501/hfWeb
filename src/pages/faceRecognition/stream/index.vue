<template>
  <d2-container-frame :filename="filename" src="http://192.168.17.15:8081/"/>
</template>

<script>
export default {
  data () {
    return {
      filename: __filename
    }
  }
}
</script>
