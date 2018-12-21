<template>
  <d2-container class="page">
    <d2-page-cover
      title="宜昌汇富人事后台管理系统"
      sub-title=""
    >
      <!-- <d2-icon-svg style="width: 120px;" name="d2-admin"/> -->
      <img :src="`${$baseUrl}image/index2.jpg`" style="width: 380px; height: 51px;">

      <template slot="footer">
        <div class="page__btn-group">
          <span @click="$open('http://www.hifull.com/nav/14.html')">公司简介</span> |
          <span @click="$open('http://www.hifull.com/intro/2.html')">领导致辞</span> |
          <span @click="$open('http://www.hifull.com/rongyu.html?atlasCateId=3')">荣誉资质</span> |
          <span @click="$open('http://www.hifull.com/nav/9.html')">产品展示</span> |
          <span @click="$open('http://www.hifull.com/nav/28.html')">专利技术</span> |
          <span @click="$open('http://www.hifull.com/intro/17.html')">联系我们</span>
          <!-- <el-popover
            :width="172"
            trigger="hover">
            <p class="d2-mt-0 d2-mb-10">D2Projects</p>
            <img src="./image/qr@2x.png" style="width: 172px;">
            <span slot="reference">微信公众号</span>
            <p
              style="
                font-size: 12px;
                margin-top: 0px;
                margin-bottom: 0px;
              ">
              官方公众号，主要推送前端技术类文章、框架资源、学习教程，以及 D2 系列项目更新信息
            </p>
          </el-popover> -->
        </div>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
