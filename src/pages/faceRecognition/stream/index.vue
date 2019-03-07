<template>
  <d2-container-frame :filename="filename" src="http://192.168.2.254:8082/"/>
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
