<template>
  <div style="cursor: pointer">
    <img :src="value" style="width:533px;height:300px;" class="image">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      // type: Boolean,
      require: true
    }
  }
}
</script>
