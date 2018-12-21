<template>
  <d2-container class="page">
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="height:120px;">
          <el-row type="flex" align="middle" justify="center" style="height:120px;" >
            <el-col :span="8" style="height:120px;padding:0px;background-color:red;margin:auto;text-align:center;line-height:120px;">
              <d2-icon name="user-o" style="font-size:60px;margin:auto;text-align:center;"/>
            </el-col>
            <el-col :span="16">
              <span style="font-size:50px;">800</span><br/>
              <el-button type="text" class="button">操作按钮</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      currentDate: new Date()
    }
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
