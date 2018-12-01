<template>
  <d2-container-frame :filename="filename" src="http://localhost:9000/"/>
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
