<template>
  <d2-container-frame :filename="filename" src="http://192.168.9.94:9000/"/>
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
