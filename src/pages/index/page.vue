<template>
  <d2-container class="page">
    <d2-page-cover
      title="我是首页"
      sub-title="XXXX管理系统">
    </d2-page-cover>
  </d2-container>
</template>

<script>
import D2HelpBtn from './components/d2-help-btn'
export default {
  components: {
    D2HelpBtn
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
